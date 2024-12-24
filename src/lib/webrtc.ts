import type { FileTransfer } from '$lib';
import Peer from 'peerjs';
import type { DataConnection } from 'peerjs';
import download from 'js-file-download';
import { readFileContent } from './helpers';


interface WebRTCCallbacks {
    onInitialized?: (localPeerId: string) => void;
    onNewPeerConnection?: (remotePeerId: string) => void;
    onPeerDisconnected?: (remotePeerId: string) => void;

    onDataChannelReady?: (remotePeerId: string) => void;
    onDataChannelClosed?: (remotePeerId: string) => void;
    onDataChannelError?: (remotePeerId: string, error: any) => void;

    onFileTransferComplete?: (file: File, senderId: string) => void;
    onFileTransferProgress?: (senderId: string, percentComplete: number) => void;
}


export default class WebRTC {
    private peer: Peer | undefined;
    private connections: Map<string, DataConnection> = new Map();
    private callbacks: WebRTCCallbacks;

    constructor(id: string, callbacks: WebRTCCallbacks) {
        this.callbacks = callbacks;
        this.peer = new Peer(id);

        this.peer.on('open', (id: string) => {
            this.callbacks.onInitialized?.(id);
        });

        this.peer.on('connection', (conn: DataConnection) => {
            this.setupConnection(conn);
            this.callbacks.onNewPeerConnection?.(conn.peer);
            this.connections.set(conn.peer, conn);
        });

        this.peer.on('error', (err: any) => {
            this.callbacks.onDataChannelError?.('', err);
        });
    }

    connectToPeer(peerId: string) {
        if (this.connections.has(peerId)) {
            return;
        }
        const conn = this.peer?.connect(peerId, {
            reliable: true,
        });

        if (!conn) {
            return;
        }

        conn.on('open', () => {
            this.callbacks.onDataChannelReady?.(peerId);
        });

        conn.on('data', (data: any) => {
            this.handleIncomingData(peerId, data);
        });

        conn.on('close', () => {
            this.connections.delete(peerId);
            this.callbacks.onDataChannelClosed?.(peerId);
        });

        conn.on('error', (err: any) => {
            this.callbacks.onDataChannelError?.(peerId, err);
        });

        this.setupConnection(conn);
        this.connections.set(peerId, conn);
    }


    private setupConnection(conn: DataConnection) {
        conn.on('data', (data: any) => {
            this.handleIncomingData(conn.peer, data);
        });

        conn.on('close', () => {
            this.connections.delete(conn.peer);
            this.callbacks.onPeerDisconnected?.(conn.peer);
        });

        conn.on('error', (err: any) => {
            this.callbacks.onDataChannelError?.(conn.peer, err);
        });
    }

    private handleIncomingData(peerId: string, data: any) {
        this.saveFile(data);
    }

    private saveFile(ft: FileTransfer) {
        download(ft.data || '', ft.fileName || "fileName", ft.fileType);
    }

    async sendFile(peerId: string, file: File) {
        const conn = this.connections.get(peerId);
        if (!conn || conn.open === false) {
            return;
        }
        const fileData = await readFileContent(file);
        conn.send(fileData);
    }

    disconnect(peerId: string) {
        const conn = this.connections.get(peerId);
        if (conn) {
            conn.close();
            this.connections.delete(peerId);
        }
    }

    destroy() {
        this.peer?.destroy();
        this.connections.forEach((conn) => conn.close());
        this.connections.clear();
    }
}
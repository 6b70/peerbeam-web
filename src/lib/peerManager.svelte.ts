import WebRTC from "./webrtc";
import { toast } from "svoast";
import { generatePeerID } from "./helpers";
import type { Peer } from "$lib";

export const peerId: { value: string | undefined } = $state({ value: undefined });
export const connectedPeers: { value: Peer[] } = $state({ value: [] });
export const loading: { value: boolean } = $state({ value: false });

let webRTC: WebRTC;

const callbacks = {
    onInitialized: (localPeerId: string) => {
        if (localPeerId !== peerId.value) {
            toast.error('Peer ID mismatch');
            throw new Error('Peer ID mismatch');
        }
        loading.value = false;
    },

    onNewPeerConnection: (remotePeerId: string) => {
        addNewPeer(remotePeerId);
    },
    onPeerDisconnected: (remotePeerId: string) => {
        connectedPeers.value = connectedPeers.value.filter((peer) => peer.id !== remotePeerId);
        toast.info(`Peer disconnected: ${remotePeerId}`);
    },
    // onDataChannelReady: (remotePeerId: string) => {
    //     toast.success(`Data channel opened with ${remotePeerId}`);
    // },
    // onDataChannelClosed: (remotePeerId: string) => {
    //     toast.info(`Data ch closed with ${remotePeerId}`);
    // },
    // onDataChannelError: (remotePeerId: string, error: any) => {
    //     toast.error(`Data ch error with ${remotePeerId}: ${error.message}`);
    // },
    onFileTransferComplete: (file: File, senderId: string) => {
        toast.success(`Received file ${file.name} from ${senderId}`);
    },
    // onFileTransferProgress: (senderId: string, percentComplete: number) => {
    //     toast.info(`File transfer progress from ${senderId}: ${percentComplete}%`);
    // },
};

export function setupWebRTC() {
    loading.value = true;
    peerId.value = generatePeerID();

    webRTC = new WebRTC(peerId.value, callbacks);
}

export function closeWebRTC() {
    webRTC?.destroy();
}

function addNewPeer(peerId: string) {
    if (connectedPeers.value.find(peer => peer.id === peerId)) {
        return;
    }
    connectedPeers.value.push({ id: peerId, isTransferring: false });
    toast.info(`Connected to peer: ${peerId}`);
}

export async function sendFile(peerIdToSend: string, file: File) {
    const peer = connectedPeers.value.find(peer => peer.id === peerIdToSend);
    if (peer) {
        peer.isTransferring = true;
    } else {
        toast.error(`Peer ${peerIdToSend} not found`);
        return;
    }
    await webRTC.sendFile(peerIdToSend, file);
    toast.info(`Sent file ${file.name} to ${peerIdToSend}`);
    peer.isTransferring = false;
}

export function connectToPeer(id: string) {
    webRTC.connectToPeer(id);
    addNewPeer(id);
}
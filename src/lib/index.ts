// place files you want to import through the `$lib` alias in this folder.
export interface Peer {
    id: string;
    isTransferring: boolean;
}

export interface FileTransfer {
    fileName: string;
    fileType: string;
    data: Blob;
}
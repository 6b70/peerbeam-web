// place files you want to import through the `$lib` alias in this folder.
export interface Peer {
    id: string;
    name: string;
    state: "connected" | "disconnected" | "transferring";
}
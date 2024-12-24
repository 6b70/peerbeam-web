<script lang="ts">
    import type { Peer } from "$lib";
    import { Monitor } from "lucide-svelte";

    interface Props {
        connectedPeers: { value: Peer[] };
        onPeerClick: (peer: Peer) => void;
        selectedPeer: string | null;
    }
    let { connectedPeers, onPeerClick, selectedPeer }: Props = $props();

    let peerPositions = $derived(
        connectedPeers.value.map((_, index) => {
            const angle = (2 * Math.PI * index) / connectedPeers.value.length;
            return angle;
        }),
    );
</script>

<div class="peers-container">
    {#each connectedPeers.value as peer, i}
        <div
            class="peer-wrapper"
            style="transform: rotate({peerPositions[i]}rad) translateY(-200px);"
        >
            <button
                onclick={() => onPeerClick(peer)}
                class:selected-peer={selectedPeer === peer.id}
                class="peer"
                style="transform: rotate(-{peerPositions[i]}rad);"
            >
                <Monitor size={58} color="#4285F4" />
                <div class="peer-info">
                    <div
                        class="peer-status"
                        class:connected={!peer.isTransferring}
                        class:transferring={peer.isTransferring}
                    ></div>
                    <span class="peer-name">{peer.id}</span>
                </div>
            </button>
        </div>
    {/each}
</div>

<style>
    .peers-container {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
    }

    .peer-wrapper {
        position: absolute;
        transform-origin: center center;
    }

    .peer-info {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .peer-name {
        color: #666;
        font-size: 1rem;
    }

    .peer-status {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #ccc;
    }

    .peer-status.connected {
        background: #28a745;
    }

    .peer-status.transferring {
        background: #007bff;
    }

    .peer {
        all: unset;
        cursor: pointer;
        padding: 12px;
        border-radius: 12px;
        transition: background-color 0.2s ease;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .selected-peer {
        background-color: rgba(66, 133, 244, 0.15);
        border-color: #4285f4;
    }

    .peer:hover {
        background-color: rgba(66, 133, 244, 0.1);
    }

    .selected-peer:hover {
        background-color: rgba(66, 133, 244, 0.2);
    }
</style>

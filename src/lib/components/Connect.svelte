<script lang="ts">
    import { X, Users, Link, Copy, Check } from "lucide-svelte";
    import SvgQR from "@svelte-put/qr/svg/QR.svelte";
    import logo from "$lib/assets/logo.svg";
    import { peerId } from "$lib/peerManager.svelte";

    interface Props {
        onClose: () => void;
    }
    let { onClose }: Props = $props();

    let copiedCode = $state(false);
    let copiedLink = $state(false);

    function copyPeerID() {
        if (!peerId.value) return;
        copiedCode = true;
        navigator.clipboard.writeText(peerId.value);
        setInterval(() => {
            copiedCode = false;
        }, 1500);
    }

    function createShareLink(): string {
        if (!peerId.value) return "";
        return `${window.location.origin}?code=${peerId.value}`;
    }

    function copyShareLink() {
        copiedLink = true;
        navigator.clipboard.writeText(createShareLink());
        setInterval(() => {
            copiedLink = false;
        }, 1500);
    }
</script>

<div class="connect-container">
    <div class="share-options">
        <button class="close-button" onclick={onClose}>
            <X size={26} />
        </button>
        <Users size={26} />
        <span>Peer Discovery</span>

        <div class="share-method link">
            <p>Copy this URL and send it to the other device.</p>
            <button onclick={copyShareLink} class="link-button">
                {#if copiedLink}
                    <Check size={20} />
                {:else}
                    <Link size={20} />
                {/if}
                <span>Copy share link</span>
            </button>
        </div>

        <div class="share-method">
            <p>Or scan the QR code from the other device.</p>
            <div class="qr-code">
                <SvgQR data={createShareLink()} {logo} />
            </div>
        </div>

        <div class="share-method">
            <p>Or share your peer name to connect.</p>
            <div class="peer-id">
                <span>{peerId.value}</span>
                <button onclick={copyPeerID} title="Copy code">
                    {#if copiedCode}
                        <Check size={20} />
                    {:else}
                        <Copy size={20} />
                    {/if}
                </button>
            </div>
        </div>
    </div>
</div>

<style>
    .connect-container {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        margin-top: -23vh;
    }

    .close-button {
        padding: 2px;
        margin: 0;
    }

    .share-options {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255, 255, 255, 0.9);
        padding: 17px;
        border-radius: 13px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-width: 35vw;
    }

    .share-method {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        text-align: center;
        padding-bottom: 18px;
    }

    .share-method p {
        color: #666;
        font-size: 0.9rem;
    }

    .peer-id {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #f5f5f5;
        padding: 8px 16px;
        border-radius: 20px;
        font-family: monospace;
        font-size: 1.2rem;
    }

    .link-button {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #4285f4;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s;
    }

    .link-button:hover {
        background: #3367d6;
    }

    button {
        border: none;
        background: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .close-button {
        align-self: flex-end;
    }

    .qr-code {
        width: 180px;
    }

    .link {
        margin-top: 10px;
    }
</style>

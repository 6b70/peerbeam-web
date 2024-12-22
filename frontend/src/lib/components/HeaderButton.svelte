<script lang="ts">
    import { Info, Plus, X, QrCode } from "lucide-svelte";
    interface Props {
        icon: "Info" | "QrCode" | "X" | "Plus";
        onClick: () => void;
        size?: number;
        color?: string;
    }

    let { icon, onClick, size = 23, color = "#333333" }: Props = $props();

    const icons = {
        Info,
        QrCode,
        X,
        Plus,
    };
    const options = {
        Info: "About PeerBeam",
        QrCode: "Sharing options",
        X: "Close",
        Plus: "Join a room",
    };
    const selectedTitle = options[icon];
    const SelectedIcon = icons[icon];
</script>

<button
    class="header-button"
    title={selectedTitle}
    aria-label={selectedTitle}
    onclick={onClick}
>
    <SelectedIcon {size} {color} />
</button>

<style>
    .header-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: background-color 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .header-button:hover {
        background-color: #e8e8e8;
    }
</style>

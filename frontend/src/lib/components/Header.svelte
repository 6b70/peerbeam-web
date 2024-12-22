<script lang="ts">
    import { goto } from "$app/navigation";
    import HeaderButton from "./HeaderButton.svelte";
    import { Radar } from "lucide-svelte";

    interface Props {
        onShareClick: () => void;
        onJoinClick: () => void;
    }

    let { onShareClick, onJoinClick }: Props = $props();

    function onInfoClick() {
        goto("/about");
    }
</script>

<header>
    <div class="logo-container">
        <div class="pulse">
            <Radar size={55} color="#4285f4" />
        </div>
        <div class="logo-text">
            <span class="brand-name">PeerBeam</span>
            <span class="tagline">P2P File Transfer</span>
        </div>
    </div>
    <div class="header-buttons">
        <HeaderButton icon={"Plus"} onClick={onJoinClick} />
        <HeaderButton icon={"QrCode"} onClick={onShareClick} />
        <HeaderButton icon={"Info"} onClick={onInfoClick} />
    </div>
</header>

<style>
    .header-buttons {
        position: fixed;
        display: flex;
        top: 9px;
        right: 12px;
        gap: 5px;
        z-index: 20;
    }

    .logo-container {
        display: flex;
        gap: 12px;
        align-items: center;
        transition: transform 0.3s ease;
        padding: 15px;
    }

    .logo-container:hover {
        transform: scale(1.01);
    }

    .logo-text {
        display: flex;
        flex-direction: column;
        gap: -1px;
    }

    .brand-name {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #4285f4, #34a853);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: -0.5px;
    }

    .tagline {
        font-size: 0.9rem;
        color: #5f6368;
    }

    .pulse {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>

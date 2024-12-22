<script lang="ts">
    import { toast } from "svoast";
    import { X } from "lucide-svelte";

    interface Props {
        onClose: () => void;
        onJoin: (shareCode: string) => void;
    }
    let { onClose, onJoin }: Props = $props();

    let shareCode = $state("");

    function handleJoin() {
        if (!shareCode) {
            toast.error("Please enter a valid share code");
        } else {
            toast.success("Joining room...", { duration: 1500 });
            onJoin(shareCode);
        }
    }
</script>

<div class="connect-container">
    <div class="share-options">
        <button class="close-button" onclick={onClose}>
            <X size={26} />
        </button>

        <div class="join-content">
            <h2>Join Room</h2>
            <p>Enter the share code to connect</p>

            <div class="code-input">
                <input
                    type="text"
                    placeholder="Enter share code"
                    bind:value={shareCode}
                    onkeydown={(e) => e.key === "Enter" && handleJoin()}
                />
            </div>

            <button class="join-button" onclick={handleJoin}>
                Join Room
            </button>
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

    .close-button {
        align-self: flex-end;
        border: none;
        background: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-button:hover {
        background: rgba(0, 0, 0, 0.1);
    }

    .join-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 24px;
        text-align: center;
    }

    h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #333;
    }

    p {
        color: #666;
        font-size: 0.9rem;
        margin: 0;
    }

    .code-input {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
    }

    input {
        padding: 12px 16px;
        border-radius: 20px;
        border: 2px solid #e0e0e0;
        font-size: 1.2rem;
        font-family: monospace;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #4285f4;
    }

    .join-button {
        background: #4285f4;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s;
    }

    .join-button:hover {
        background: #3367d6;
    }
</style>

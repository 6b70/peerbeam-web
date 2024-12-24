<script lang="ts">
    import { onMount } from "svelte";
    import { v4 as uuidv4 } from "uuid";

    let circles: { id: string }[] = [];
    let interval: number;
    const MAX_CIRCLES = 10;
    let ctx: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;

    let x0: number;
    let y0: number;
    let innerWidth = $state(0);
    let innerHeight = $state(0);
    let dw: number;
    let step: number = 0;

    function addCircle() {
        if (circles.length < MAX_CIRCLES) {
            circles = [
                ...circles,
                {
                    id: uuidv4(),
                },
            ];
        }
    }

    function init() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        let offset = innerHeight > 380 ? 100 : 65;
        offset = innerHeight > 800 ? 116 : offset;
        x0 = innerWidth / 2;
        y0 = innerHeight - offset;
        dw = Math.max(innerWidth, innerHeight, 1000) / 13;
        drawCircles();
    }

    function drawCircle(radius: number) {
        ctx.beginPath();
        let color = Math.round(
            197 * (1 - radius / Math.max(innerWidth, innerHeight)),
        );
        ctx.strokeStyle = `rgba(${color}, ${color}, ${color}, 0.1)`;
        ctx.arc(x0, y0, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 2;
    }

    function drawCircles() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < 8; i++) {
            drawCircle(dw * i + (step % dw));
        }
        step += 1;
    }

    function animate() {
        requestAnimationFrame(() => {
            drawCircles();
            animate();
        });
    }

    onMount(() => {
        let canvasCtx = canvas.getContext("2d") ?? null;
        if (!canvasCtx) return;
        ctx = canvasCtx;
        init();
        window.addEventListener("resize", init);
        interval = setInterval(addCircle, 1500); // Adjust interval as needed
        animate();

        return () => {
            window.removeEventListener("resize", init);
            clearInterval(interval);
        };
    });
</script>

<svelte:window on:resize={init} bind:innerWidth bind:innerHeight />
<canvas bind:this={canvas} class="ripple-canvas"></canvas>

<style>
    .ripple-canvas {
        position: fixed;
        top: 0;
        z-index: -1;
    }
</style>

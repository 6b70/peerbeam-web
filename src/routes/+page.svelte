<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import FloatingCircles from "$lib/components/FloatingCircles.svelte";
	import { CircleUserRound } from "lucide-svelte";
	import Connect from "$lib/components/Connect.svelte";
	import Join from "$lib/components/Join.svelte";
	import { fade } from "svelte/transition";
	import { sineInOut } from "svelte/easing";
	import Peers from "$lib/components/Peers.svelte";
	import type { Peer } from "$lib";
	import { page } from "$app/state";

	import { onMount } from "svelte";
	import {
		setupWebRTC,
		closeWebRTC,
		peerId,
		sendFile,
		connectedPeers,
		connectToPeer,
	} from "$lib/peerManager.svelte";

	let showConnect = $state(false);
	let showJoin = $state(false);

	function onShareClick() {
		showJoin = false;
		showConnect = !showConnect;
	}

	function onJoinClick() {
		showConnect = false;
		showJoin = !showJoin;
	}

	function onJoin(shareCode: string) {
		connectToPeer(shareCode);
	}

	let selectedPeer: string | null = $state(null);

	function onPeerClick(peer: Peer) {
		selectedPeer = peer.id;
		fileSelection();
	}

	function fileSelection() {
		const input = document.createElement("input");
		input.type = "file";
		input.multiple = true;
		input.onchange = (event: Event) => {
			const target = event.target as HTMLInputElement;
			const files = target.files;
			if (files) {
				beginTransfer(Array.from(files));
			}
		};
		input.click();
	}

	async function beginTransfer(files: File[]) {
		if (!selectedPeer) return;
		const recipient = selectedPeer;

		for (const file of files) {
			await sendFile(recipient, file);
		}
		selectedPeer = null;
	}

	onMount(() => {
		setupWebRTC();
		const code = page.url.searchParams.get("code");
		if (code) {
			setInterval(() => {
				onJoin(code);
			}, 1000);
		}
		return closeWebRTC;
	});
</script>

<Header {onShareClick} {onJoinClick} />
<Peers {connectedPeers} {onPeerClick} {selectedPeer} />

{#if showConnect}
	<div transition:fade={{ duration: 300, easing: sineInOut }}>
		<Connect onClose={onShareClick} />
	</div>
{/if}

{#if showJoin}
	<div transition:fade={{ duration: 300, easing: sineInOut }}>
		<Join onClose={onJoinClick} {onJoin} />
	</div>
{/if}

<div class="user-container">
	<div class="user-info">
		<CircleUserRound size={70} color="#4285F4" />
		<div>
			You are known as <span id="user-name">{peerId.value}</span>
		</div>
	</div>
</div>

<FloatingCircles />

<style>
	.user-container {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		width: 100%;
		height: 90%;
		z-index: -1;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		color: #333;
		font-size: 1.2rem;
	}

	#user-name {
		font-weight: bold;
		color: #34a853;
	}
</style>

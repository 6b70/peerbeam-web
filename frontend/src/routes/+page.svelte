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
		console.log(shareCode);
	}

	let selectedPeers = $state(new Set<string>());

	const peers: Peer[] = $state([
		{ id: "1", name: "Alice", state: "connected" },
		{ id: "2", name: "Bob", state: "disconnected" },
		{ id: "3", name: "Charlie", state: "connected" },
		{ id: "4", name: "David", state: "connected" },
		{ id: "5", name: "Eve", state: "connected" },
	]);

	function onPeerClick(peer: Peer) {
		if (selectedPeers.has(peer.id)) {
			selectedPeers.delete(peer.id);
		} else {
			selectedPeers.add(peer.id);
		}
		// Triggers svelte reactivity
		selectedPeers = new Set(selectedPeers);
	}
</script>

<Header {onShareClick} {onJoinClick} />

<Peers {peers} {onPeerClick} {selectedPeers} />

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
			You are known as <span id="user-name">User</span>
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

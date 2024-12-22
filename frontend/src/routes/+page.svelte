<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import FloatingCircles from "$lib/components/FloatingCircles.svelte";
	import { CircleUserRound } from "lucide-svelte";
	import Connect from "$lib/components/Connect.svelte";
	import Join from "$lib/components/Join.svelte";
	import { fade } from "svelte/transition";
	import { sineInOut } from "svelte/easing";

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
</script>

<Header {onShareClick} {onJoinClick} />

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

<script lang="ts">
    import { goto } from "$app/navigation";
    import HeaderButton from "./HeaderButton.svelte";

    function handleCloseClicked() {
        goto("/");
    }
</script>

<header>
    <HeaderButton icon={"X"} onClick={handleCloseClicked} />
</header>

<style>
    header {
        display: flex;
        justify-content: flex-end;
        padding: 9px;
        padding-right: 15px;
        gap: 5px;
    }
</style>

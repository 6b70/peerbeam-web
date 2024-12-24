<script lang="ts">
    import "../css/styles.css";
    import { Toasts } from "svoast";

    let { children } = $props();
</script>

<Toasts position="bottom-center" />

{@render children()}

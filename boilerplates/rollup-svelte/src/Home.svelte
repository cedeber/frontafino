<script>
    import { Button } from "../web_modules/carbon-components-svelte";

    export let params;
</script>

<main>
    <h1>Hello {params && params.name || "test"}!</h1>
    <Button>Primary</Button>
</main>

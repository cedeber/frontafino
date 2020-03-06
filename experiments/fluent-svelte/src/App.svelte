<script>
    import "@fluent/web";
    import { onMount } from "svelte";

    let h1;
    let p;

    onMount(() => {
        document.l10n.setAttributes(h1, 'welcome', { name: 'Anna' });
        document.l10n.setAttributes(p, 'shared-photos', {
            "userName": "Anne",
            "userGender": "female",
            "photoCount": 3
        });
    });
</script>

<h1 bind:this={h1}>&nbsp;</h1>
<p bind:this={p}></p>

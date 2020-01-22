<script>
    import router from "./web_modules/page.js";

    import Home from "./routes/Home.svelte";

    let page;
    let params;

    router("/", () => page = Home);
    router("/:name", (ctx, next) => {
        params = ctx.params;
        next()
    }, () => page = Home);

    router.start();
</script>

<svelte:component this={page} params={params}/>

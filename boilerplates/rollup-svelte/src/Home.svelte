<script>
    export let params;
</script>

<main>
    <h1 class="text-6xl font-thin text-center">Hello {params && params.name || "world"}!</h1>
    <div class="flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Button
        </button>
    </div>
</main>

<style type="text/scss">
    @import "variables";

    h1 {
        color: $brand;
    }
</style>

<script>
    export let params;
</script>

<main>
    <h1 class="text-6xl">Hello {params && params.name || "test"}!</h1>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
    </button>
</main>

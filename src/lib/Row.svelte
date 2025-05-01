<script>
    let { children } = $props();
</script>


<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
    {@render children()}
</div>
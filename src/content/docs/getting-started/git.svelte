<script lang="ts">
    let {
        branches
    }: {
        branches: { commitCount: number }[]
    } = $props();


    const pallete = [
        { fill: "hsl(22, 80%, 20%)", stroke: "hsl(22, 80%, 50%)" },
        { fill: "hsl(120, 80%, 20%)", stroke: "hsl(120, 80%, 50%)" },
        { fill: "hsl(240, 80%, 20%)", stroke: "hsl(240, 80%, 50%)" },
        { fill: "hsl(180, 80%, 20%)", stroke: "hsl(180, 80%, 50%)" },
        { fill: "hsl(40, 80%, 20%)", stroke: "hsl(40, 80%, 50%)" },
        { fill: "hsl(30, 80%, 20%)", stroke: "hsl(30, 80%, 50%)" },
        { fill: "hsl(210, 80%, 20%)", stroke: "hsl(210, 80%, 50%)" },
    ]

    const yMax = (branches.reduce((a, b) => a.commitCount > b.commitCount ? a : b).commitCount+1) * 15 + 10
</script>

<svg style:margin-top="0" viewBox="5 5 {15 + 10 + branches.length * 15} {yMax + 30}" xmlns="http://www.w3.org/2000/svg" style="width: 100%;">
    <style>
        circle {
            fill: var(--fill, none);
            stroke: var(--stroke, none);
        }
        path, line {
            fill: none;
            stroke: var(--stroke, lime);
        }

        .base {
            --fill: rgb(15,15,45);
            --stroke: rgb(51,51,153);
        }
    </style>
    <!-- Base Branch -->
     <g style="--fill: hsl(50, 80%, 10%); --stroke: hsl(50, 80%, 50%);">
         <circle cx="10" cy="10" r="4" />
         <line x1="10" y1="14" x2="10" y2="{yMax + 15}" style="stroke-dasharray: 2, 2;" />
         {#each branches as branch, i}
            <path       d=" M14 10 
                            L{15 + 5 + i * 15} 10 
                            L{15 + 10 + i * 15} 15 
                            L{15 + 10 + i * 15} 21" />
            <!-- Merge Commit -->
            {@const branchPallete = pallete[i%pallete.length]}
            <circle cx="10" cy="{yMax + 15 * i}" r="4" style="--stroke: none; fill: {branchPallete.fill}; stroke-dasharray: 2, 2; stroke-dashoffset: 2;"/>
            <circle cx="10" cy="{yMax + 15 * i}" r="4" style="fill: none;" />
            {@const bottomOfLastCommit = branch.commitCount * 15 + 10}
            <!-- <path d="   M14 {yMax + 15 * i} 
                        L{10 + 10 + i * 15} {yMax + 15 * i}
                        L{15 + 10 + i * 15} {yMax - 5 + 15 * i}
                        L{15 + 10 + i * 15} {bottomOfLastCommit}" style="stroke-dasharray: 2, 2;" /> -->
            <path d="   M14 {yMax + 15 * i} 
                        L{10 + 10 + i * 15} {yMax + 15 * i}
                        L{15 + 10 + i * 15} {yMax - 5 + 15 * i}
                        L{15 + 10 + i * 15} {bottomOfLastCommit}" style="stroke-dasharray: 2, 2; stroke-dashoffset: 2; --stroke: {branchPallete.stroke};" />
            {#if i !== branches.length - 1}
                <line x1="10" y1="{yMax + 4 + 15 * i}" x2="10" y2="{yMax + 15 + 15 * i }" 
                    style="stroke-dasharray: 2, 2;"
                />
            {/if}
         {/each}
    </g>

    {#each branches as branch, i}
        <g style="--fill: {pallete[i%pallete.length].fill}; --stroke: {pallete[i%pallete.length].stroke};">
            {#each new Array(branch.commitCount).fill(0) as _, j}
                <circle cx="{15 + 10 + i * 15}" cy="{25 + j * 15}" r="4" />
                {#if j !== branch.commitCount - 1}
                    <line x1="{15 + 10 + i * 15}" y1="{29 + j * 15}" x2="{15 + 10 + i * 15}" y2="{25 + (j + 1) * 15}" />
                {/if}
            {/each}
        </g>
    {/each}

</svg>


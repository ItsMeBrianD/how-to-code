<script lang="ts">
	import Block from './Block.svelte';
	import { diffTrimmedLines } from 'diff';
    import fastDiff from 'fast-diff';

    
	let { stages, lang = 'typescript' } = $props();


    /*
        Write a utility function for diffs that:

            - Splits the lines out
            - Lines up the lines with the diffs
            - Puts the lines back together

            - Ensure that we cover lines that appear more than once?
            - Is there a library other than `diff` that may provide this already?

    */
</script>

{#each stages as stage, i}
	{@const prev = stages[i - 1]}
	<Block
		{lang}
		diff={prev ? fastDiff(prev.content, stage.content) : []}
	>
		{stage.content}
	</Block>
{/each}

<script>
	import Block from '$lib/CodeSeries/Block.svelte';
	import CodeSeries from '$lib/CodeSeries/CodeSeries.svelte';

	import d from 'fast-diff';

	console.log(d(
		`import { useCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';
import { createCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';`,
		`import { useCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';
import { createCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';

const context = createCodeSeriesContext();`
	, 1));
</script>

<CodeSeries
	stages={[
		{
			content: `import { useCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';
import { createCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';`
		},
		{
			content: `import { useCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';
import { createCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';

const context = createCodeSeriesContext();`
		},
		{
			content: `import { createCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';

const context = createCodeSeriesContext();`
		},
		{
			content: `import { createCodeSeriesContext } from '$lib/CodeSeries/shared.svelte';

const myContext = createCodeSeriesContext();`
		}
	]}
/>

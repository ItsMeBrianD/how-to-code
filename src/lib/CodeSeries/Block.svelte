<script lang="ts">
	import { type Snippet } from 'svelte';
	import { highlight, type LineHighlight } from './highlight';
	import type { ChangeObject } from 'diff';

	let {
		children,
		lang = 'typescript',
		lineHighlights,
        diff
	}: {
		children: Snippet;
		lang?: string;
		lineHighlights?: LineHighlight[];
        diff?: ChangeObject<string>[]
	} = $props();
</script>

<pre><code use:highlight={{ lang, lineHighlights, diff }}>{@render children()}</code></pre>

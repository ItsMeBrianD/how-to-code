import type { Action } from 'svelte/action';
import prism from 'prismjs';

import 'prismjs/themes/prism-tomorrow.css';

import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css';

import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.min.css';

import 'prismjs/plugins/diff-highlight/prism-diff-highlight.js';
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.min.css';

import 'prismjs/components/prism-typescript.js';
import 'prismjs/plugins/autoloader/prism-autoloader.js';
import type { ChangeObject } from 'diff';

import fastDiff from 'fast-diff';

type BaseLineHighlight = number | { from: number; to: number };

export type LineHighlight = BaseLineHighlight | Array<BaseLineHighlight>;

export const highlight: Action<
	HTMLElement,
	{ lang: string; lineHighlights?: LineHighlight[]; diff?: fastDiff.Diff[] }
> = (el, { lang, lineHighlights, diff }) => {
	if (!(lang in prism.languages)) {
		console.warn(`Unknown language "${lang}" passed to highlight`);
	} else {
		el.classList.add('language-' + lang);
	}
	if (el.tagName.toLowerCase() !== 'code' || el.parentElement?.tagName.toLowerCase() !== 'pre') {
		console.warn(
			`Invalid DOM structure found - expected <pre><code> found <${el.parentElement?.tagName}><${el.tagName}>`
		);
	}
	const pre = el.parentElement;
	if (el.children[0]?.tagName === 'pre') {
		el.textContent = el.children[0]?.textContent!.trim();
	}
	if (pre && lineHighlights) {
		const hl = lineHighlights.map((lineHighlight) => {
			if (typeof lineHighlight === 'object' && 'from' in lineHighlight) {
				return `${lineHighlight.from}-${lineHighlight.to}`;
			} else if (Array.isArray(lineHighlight)) {
				return lineHighlight.join(',');
			} else {
				return lineHighlight;
			}
		});
		pre.dataset.line = hl.join(',');
	}

	if (diff?.length) {
		const lines = (el.textContent ?? '').split('\n');
        const codeLines = el.querySelectorAll('code.language-typescript > span.token');
        codeLines.forEach((line, index) => {
          const part = diff.find((part) => part[0] === fastDiff.EQUAL && part[1].split('\n').includes(line.textContent));
          if (part) {
            line.classList.add('unchanged');
          }
  
          const insertedPart = diff.find((part) => part[0] === fastDiff.INSERT && part[1].split('\n').includes(line.textContent));
          if (insertedPart) {
            line.classList.add('inserted');
          }
  
          const deletedPart = diff.find((part) => part[0] === fastDiff.DELETE && part[1].split('\n').includes(line.textContent));
          if (deletedPart) {
            line.classList.add('deleted');
          }
        });

		// const highlightedLines = lines.map((line, index) => {
		// 	const part = diff.find(
		// 		(part) => part[0] === fastDiff.EQUAL && part[1].split('\n').includes(line)
		// 	);
		// 	if (part) {
		// 		return `<span class="unchanged">${line}</span>`;
		// 	}

		// 	const insertedPart = diff.find(
		// 		(part) => part[0] === fastDiff.INSERT && part[1].split('\n').includes(line)
		// 	);
		// 	if (insertedPart) {
		// 		return `<span class="inserted">${line}</span>`;
		// 	}

		// 	const deletedPart = diff.find(
		// 		(part) => part[0] === fastDiff.DELETE && part[1].split('\n').includes(line)
		// 	);
		// 	if (deletedPart) {
		// 		return `<span class="deleted">${line}</span>`;
		// 	}

		// 	return `<span>${line}</span>`;
		// });

		// el.innerHTML = highlightedLines.join('\n');

		// Run Prism highlighting again to preserve syntax coloring
		prism.highlightElement(el);

		prism.highlightElement(el);

		// if (diff) {
		// 	const diffContainer = document.createElement('div');
		// 	diffContainer.classList.add('absolute', 'top-0', 'left-0', 'pointer-events-none');
		// 	el.appendChild(diffContainer);

		// 	const diffedLines = diff.reduce<{ line: string; status: 'added' | 'removed' | 'unchanged' }[]>(
		// 		(acc, d) => {
		//             const lines = d.value.trimEnd().split('\n')
		//             for (let i = 0; i < lines.length; i++) {
		//                 const line = lines[i];

		//                 acc.push({
		//                     line,
		//                     status: d.added ? 'added' : d.removed ? 'removed' : 'unchanged'
		//                 });
		//             }
		// 			return acc;
		// 		},
		// 		[]
		// 	);

		// console.table(diffedLines);
		// }
	}
};

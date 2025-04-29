import { getContext, setContext } from 'svelte';
import type { LineHighlight } from './highlight';

const CodeSeriesContextKey = Symbol('CodeSeriesContextKey');

export type CodeSeriesContext = {
	addBlock: (content: string, lang?: string) => () => void;
};

export type Block = {
	uid: string;
	content: string;
	lang: string;
	highlights?: LineHighlight[];
};

export const createCodeSeriesContext = (): { ctx: CodeSeriesContext; blocks: Block[] } => {
	const blocks: Block[] = $state([]);
	const addBlock = (content: string, lang?: string) => {
		const uid = (Date.now() + Math.floor(Math.random() * 100)).toString();
		blocks.push({
			uid,
			content: content,
			lang: lang ?? 'typescript'
		});
		return () => {
			blocks.pop();
		};
	};
	const ctx = {
		addBlock
	};
	setContext(CodeSeriesContextKey, ctx);
	return {
		ctx,
		blocks
	};
};

export const useCodeSeriesContext = (): CodeSeriesContext => {
	if (!getContext(CodeSeriesContextKey)) {
		throw new Error('CodeSeriesContext not found');
	}
	return getContext(CodeSeriesContextKey);
};

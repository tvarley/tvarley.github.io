import type { CollectionEntry } from 'astro:content';

export type WritingEntry = CollectionEntry<'writings'>;

export function getSeriesPosts(
	allPosts: WritingEntry[],
	series: string | undefined
): WritingEntry[] {
	if (!series) return [];
	return allPosts
		.filter((post) => post.data.series === series && !post.data.draft)
		.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
}

export function getSeriesNavigation(
	allPosts: WritingEntry[],
	currentPost: WritingEntry | undefined | null
) {
	const series = currentPost?.data?.series;
	if (!currentPost || !series) {
		return {
			seriesPosts: [] as WritingEntry[],
			prevPost: null as WritingEntry | null,
			nextPost: null as WritingEntry | null,
			currentIndex: -1,
			seriesTitle: undefined as string | undefined,
		};
	}

	const seriesPosts = getSeriesPosts(allPosts, series);
	const currentIndex = seriesPosts.findIndex((post) => post.id === currentPost.id);
	const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
	const nextPost =
		currentIndex >= 0 && currentIndex < seriesPosts.length - 1
			? seriesPosts[currentIndex + 1]
			: null;

	return {
		seriesPosts,
		prevPost,
		nextPost,
		currentIndex,
		seriesTitle:
			currentPost.data.seriesTitle ||
			seriesPosts[0]?.data.seriesTitle ||
			series,
	};
}

export function writingHref(post: WritingEntry): string {
	return `/writings/${post.id}/`;
}

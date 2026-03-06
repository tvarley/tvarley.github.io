import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const euler = defineCollection({
	// Load Markdown files in the `src/content/euler/` directory.
	loader: glob({ base: './src/content/euler', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		problemNumber: z.number(),
		title: z.string(),
		description: z.string(),
		difficulty: z.enum(['easy', 'medium', 'hard']),
		date: z.coerce.date(),
		technologies: z.array(z.string()),
		implementations: z.array(z.object({
			language: z.string(),
			code: z.string(),
			githubLink: z.string(),
			performance: z.string().optional(),
			notes: z.string().optional(),
		})),
		tags: z.array(z.string()),
		featured: z.boolean(),
		showcase: z.boolean(),
	}),
});

const writings = defineCollection({
	// Load Markdown and MDX files in the `src/content/writings/` directory.
	loader: glob({ base: './src/content/writings', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.coerce.date(),
		category: z.enum(['blog', 'article', 'reflection']),
		tags: z.array(z.string()),
		draft: z.boolean(),
	}),
});

export const collections = { euler, writings };

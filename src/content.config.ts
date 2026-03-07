import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const euler = defineCollection({
	loader: glob({ base: './src/content/euler', pattern: '**/*.{md,mdx}' }),
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
		tags: z.array(z.string()).optional(),
		featured: z.boolean().optional(),
		showcase: z.boolean().optional(),
	}),
});

const writings = defineCollection({
	loader: glob({ base: './src/content/writings', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.coerce.date(),
		category: z.enum(['blog', 'article', 'reflection']).optional(),
		tags: z.array(z.string()).optional(),
		draft: z.boolean().optional(),
    heroImage: z.string().optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		summary: z.string().optional(),
		description: z.string().optional(),
		date: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
    draft: z.boolean().optional(),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		period: z.string(),
		role: z.string(),
		tags: z.array(z.string()),
		priority: z.number().default(99),
		thumbnail: z.string().optional(),
		links: z.object({
			demo: z.string().optional(),
			repo: z.string().optional(),
			patent: z.string().optional()
		}).optional()
	}),
});

export const collections = { euler, writings, blog, projects };

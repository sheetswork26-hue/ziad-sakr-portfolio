import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every project = one Markdown file in src/content/projects/.
// Add a new file, push to git, and the site rebuilds with a new case-study page.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    industry: z.string(),
    duration: z.string().optional(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    accent: z.string().default('#ea4b71'),
    stack: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(4),
    // Simplified flow shown as a diagram: trigger -> steps -> output
    flow: z.array(
      z.object({
        label: z.string(),
        kind: z.enum(['trigger', 'ai', 'logic', 'action', 'data']),
      })
    ),
    // Optional: path under /public to a sanitized n8n workflow export (no credentials!)
    workflow: z.string().optional(),
    // Optional: link to the project's source on GitHub
    repo: z.string().url().optional(),
    // Optional: Loom / YouTube embed URL
    video: z.string().optional(),
  }),
});

export const collections = { projects };

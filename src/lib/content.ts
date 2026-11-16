import data from '../data/pages.json';
export type PageType = 'home' | 'hub' | 'subvertical' | 'informativa';
export interface Page { id: string; slug: string; parentId: string | null; type: PageType; title: string; description: string; seoTitle: string; order: number; status: 'draft' | 'published'; sections: { heading: string; paragraphs: string[] }[] }
export const pages = data as Page[];
export const href = (page: Page) => page.slug ? `/${page.slug}/` : '/';
export const children = (id: string) => pages.filter(p => p.parentId === id).sort((a,b) => a.order-b.order);
export function ancestors(page: Page): Page[] {
  const result: Page[] = []; let current = page;
  while (current.parentId) { const parent = pages.find(p => p.id === current.parentId); if (!parent) break; result.unshift(parent); current = parent; }
  return result;
}
// Fail the build before generating inconsistent URLs or navigation.
const ids = new Set<string>(); const slugs = new Set<string>();
for (const page of pages) {
  if (ids.has(page.id) || slugs.has(page.slug)) throw new Error(`Duplicate page: ${page.id}`);
  ids.add(page.id); slugs.add(page.slug);
  if (page.slug && !/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(page.slug)) throw new Error(`Invalid slug: ${page.slug}`);
  if (!page.title || !page.description || !page.seoTitle) throw new Error(`Missing metadata: ${page.id}`);
  if (!['home','hub','subvertical','informativa'].includes(page.type)) throw new Error(`Invalid type: ${page.id}`);
  const seen = new Set([page.id]); let current = page;
  while (current.parentId) {
    const parent = pages.find(p => p.id === current.parentId);
    if (!parent || seen.has(parent.id)) throw new Error(`Invalid hierarchy: ${page.id}`);
    if (parent.slug && !current.slug.startsWith(parent.slug + '/')) throw new Error(`Parent URL mismatch: ${page.id}`);
    seen.add(parent.id); current = parent;
  }
}
if (pages.filter(p => p.type === 'home' && p.slug === '' && p.parentId === null).length !== 1) throw new Error('Exactly one home is required');

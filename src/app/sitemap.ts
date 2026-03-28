import {MetadataRoute} from 'next'
import {Sitemaps} from '@prisma/client'
import {db} from '@/lib/prisma'


export const revalidate = 3600 // 1 hour
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allEntries: Sitemaps[] = await db.sitemaps.findMany()

    return allEntries.map((entry) => ({
        url: entry.url,
        lastModified: entry.lastMod,
        changeFrequency: 'hourly' as const,
        priority: 0.7,
    }))
}
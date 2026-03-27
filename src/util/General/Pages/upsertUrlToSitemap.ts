import db from "@/lib/prisma";

const upsertUrlToSitemap = async (url: string) => {
    await db.sitemaps.upsert({
        where: {
            url: url,
        },
        update: {
            lastMod: new Date(),
        },
        create: {
            url: url,
            lastMod: new Date(),
        },
    });
};

export default upsertUrlToSitemap;

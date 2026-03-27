import 'server-only';
import {PrismaClient} from '@prisma/client'
import {PrismaBetterSqlite3} from '@prisma/adapter-better-sqlite3'
import {EnvGuard} from "@/util/EnvGuard";
import path from "node:path";

const prismaClientSingleton = () => {

    const dbPath = path.resolve(process.cwd(), EnvGuard.DatabasePath)


    const adapter = new PrismaBetterSqlite3({
        url: dbPath
    })

    return new PrismaClient({ adapter })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (!EnvGuard.isProduction) {
    globalThis.prismaGlobal = db
}
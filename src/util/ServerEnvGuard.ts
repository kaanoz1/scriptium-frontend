import path from "node:path";
import * as fs from "node:fs";
import {logger} from "@/lib/Logger";
import {execSync} from "node:child_process";

export class ServerEnvGuard {
    public static ensureDatabaseExists(): void {
        const rawUrl = process.env.DATABASE_URL;
        if (!rawUrl) return;
        const dbPath = rawUrl.replace('file:', '');

        const absoluteDbPath = path.isAbsolute(dbPath)
            ? dbPath
            : path.resolve(process.cwd(), dbPath);

        const dir = path.dirname(absoluteDbPath);
        const schemaPath = path.resolve(process.cwd(), "prisma/schema.prisma");

        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                logger.info(`Created database directory: ${dir}`);
            }

            if (!fs.existsSync(absoluteDbPath)) {
                logger.warn(`Database file missing. Creating...`);
                fs.writeFileSync(absoluteDbPath, "");
                fs.chmodSync(absoluteDbPath, 0o666);
            }

            if (fs.existsSync(schemaPath)) {
                logger.info("Syncing database schema...");
                execSync("npx prisma db push", { stdio: 'inherit' });
            }
        } catch (error) {
            logger.error(`Failed to ensure prisma files: ${error}`);
        }
    }
}
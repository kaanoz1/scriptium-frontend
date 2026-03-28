import 'server-only';
import { logger } from "@/lib/Logger";

export class ServerEnvGuard {
    public static async ensureDatabaseExists(): Promise<void> {
        if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.NEXT_PHASE === 'phase-production-build')
            return;

        const path = await import('node:path');
        const fs = await import('node:fs');
        const { execSync } = await import('node:child_process');

        const rawUrl = process.env.DATABASE_URL;
        if (!rawUrl) return;
        
        const dbPath = rawUrl.replace('file:', '');
        
        const absoluteDbPath = path.isAbsolute(dbPath)
            ? dbPath
            : path.join( process.cwd(), dbPath);

        const dir = path.dirname(absoluteDbPath);
        
        const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");

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

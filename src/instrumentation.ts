import {EnvGuard} from "@/util/EnvGuard";

// noinspection JSUnusedGlobalSymbols
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const {logger} = await import('./lib/Logger');

        logger.info({
            event: 'server_init',
            message: 'Server-side instrumentation initialized',
            node_version: process.version
        });
    }


    EnvGuard.checkEnv();
    EnvGuard.printValuesMasked();
}
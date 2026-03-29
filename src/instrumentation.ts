export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PHASE !== 'phase-production-build') {
        const { ServerEnvGuard } = await import('./util/ServerEnvGuard');
        const { EnvGuard } = await import('./util/EnvGuard');

        EnvGuard.checkEnv();
        await ServerEnvGuard.ensureDatabaseExists();
        EnvGuard.printValuesMasked();
    }
}

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NEXT_PHASE !== 'phase-production-build') {
        const { EnvGuard } = await import('./util/EnvGuard');

        EnvGuard.checkEnv();
        EnvGuard.printValuesMasked();
    }
}

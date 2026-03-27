export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { ServerEnvGuard } = await import('./util/ServerEnvGuard');
        const { EnvGuard } = await import('./util/EnvGuard');

        EnvGuard.checkEnv();

        ServerEnvGuard.ensureDatabaseExists();

        EnvGuard.printValuesMasked();
    }
}
import { logger } from "@/lib/Logger";

export class EnvGuard {
    private static _isProduction: boolean | undefined;
    private static _isDevelopment: boolean | undefined;
    private static _isChecked: boolean = false;

    private static readonly envMap: Record<string, string | undefined> = {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        DATABASE_URL: process.env.DATABASE_URL,
    };

    private static readonly publicKeys = ["NEXT_PUBLIC_API_URL"];
    private static readonly privateKeys = ["DATABASE_URL"];

    public static checkEnv(): void {
        if (this._isChecked) return;

        this.publicKeys.forEach(key => {
            if (!this.envMap[key])
                throw new Error(`Public Environment variable ${key} is not set`);
        });

        const isServer = typeof window === 'undefined';
        if (isServer) {
            this.privateKeys.forEach(key => {
                if (!this.envMap[key])
                    throw new Error(`Server Environment variable ${key} is not set`);
            });
        }

        this._isChecked = true;
    }

    public static printValuesMasked(): void {
        this.ensureChecked();

        const allKeys = [...this.publicKeys, ...this.privateKeys];
        allKeys.forEach(key => {
            const value = this.envMap[key] || "";
            const masked = value.length > 10 ? value.slice(0, 10) + "***" : "***";
            logger.info(`Environment variable ${key}: ${masked}`);
        });
    }

    private static ensureChecked(): void {
        if (!this._isChecked)
            this.checkEnv();
    }

    private static getValue(key: string): string {
        this.ensureChecked();

        const value = this.envMap[key];
        if (!value) {
            const isBrowser = typeof window !== 'undefined';
            const context = isBrowser ? " (Note: Server secrets are hidden in the browser)" : "";
            throw new Error(`Environment variable ${key} is missing during runtime access${context}`);
        }

        return value;
    }

    public static get ApiUrl(): string {
        return this.getValue("NEXT_PUBLIC_API_URL");
    }

    public static get DatabaseUrl(): string {
        return this.getValue("DATABASE_URL");
    }

    public static get isProduction(): boolean {
        if (this._isProduction === undefined)
            this._isProduction = process.env.NODE_ENV === 'production';
        return this._isProduction;
    }

    public static get isDevelopment(): boolean {
        if (this._isDevelopment === undefined)
            this._isDevelopment = process.env.NODE_ENV === 'development';
        return this._isDevelopment;
    }
}
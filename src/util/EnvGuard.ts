import {logger} from "@/lib/Logger";

export class EnvGuard {
    private static _isProduction: boolean | undefined;
    private static _isDevelopment: boolean | undefined;

    private static requiredKeys: string[] = ["NEXT_PUBLIC_API_URL", "DATABASE_URL"];
    private static _isChecked: boolean = false;

    public static checkEnv(): void {
        if (this._isChecked) return;

        this.requiredKeys.forEach(key => {
            if (!process.env[key])
                throw new Error(`Environment variable ${key} is not set`);

        });

        this._isChecked = true;
    }

    public static printValuesMasked(): void {
        this.ensureChecked();

        this.requiredKeys.forEach(key => {
            const value = process.env[key] || "";
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

        const value = process.env[key];
        if (!value)
            throw new Error(`Environment variable ${key} is missing during runtime access`);


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
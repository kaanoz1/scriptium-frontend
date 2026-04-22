export class QuickNavigationResult {
    public title: string;
    public url: string;
    public description: string;

    protected constructor(title: string, url: string, description: string) {
        this.title = title;
        this.url = url;
        this.description = description;
    }

    static produce(query: string): QuickNavigationResult | null {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return null;

        const parts = trimmedQuery.split(/[.:,;/"\s]+/).filter(p => p !== "");

        const isNumeric = (val: string) => /^\?*\d+$/.test(val);

        if (parts.length >= 2 && isNumeric(parts[0]) && isNumeric(parts[1])) {
            const chapter = parts[0];
            const verse = parts[1];

            return new QuickNavigationResult(
                `Chapter ${chapter}, Verse ${verse}`,
                `/i/q/${chapter}/${verse}`,
                `Go to chapter: ${chapter} for verse: ${verse}`
            );
        }

        if (parts.length === 1 && isNumeric(parts[0])) {
            const chapter = parts[0];

            return new QuickNavigationResult(
                `Chapter ${chapter}`,
                `/i/q/${chapter}`,
                `Go to chapter: ${chapter}`
            );
        }

        return null;
    }
}
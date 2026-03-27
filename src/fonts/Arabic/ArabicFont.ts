export class ArabicFont {
    public readonly name: string;
    public readonly className: string;
    public readonly sampleText: string;
    public readonly description: string;

    constructor(name: string, className: string, description: string = "") {
        this.name = name;
        this.className = className;
        this.description = description;
        this.sampleText = "نص تجريبي للخط العربي";
    }
}

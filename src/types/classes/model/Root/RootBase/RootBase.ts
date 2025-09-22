export type T_RootBaseConstructorParameters = { latin: string; own: string };
export type T_RootBaseConstructorParametersJSON =
  T_RootBaseConstructorParameters;

export abstract class RootBase {
  protected readonly latin: string;
  protected readonly own: string;

  constructor(data: T_RootBaseConstructorParameters) {
    this.own = data.own;
    this.latin = data.latin;
  }

  getLatin(): string {
    return this.latin;
  }

  getOwn(): string {
    return this.own;
  }
}

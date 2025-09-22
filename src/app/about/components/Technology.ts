"use client";

export class Technology {
  private readonly name: string;
  private readonly url: string;
  private readonly path: string;
  private readonly mono: boolean = false;

  constructor(name: string, url: string, path: string, mono: boolean) {
    this.name = name;
    this.url = url;
    this.path = path;
    this.mono = mono;
  }
  getUrl() {
    return this.url;
  }

  getName() {
    return this.name;
  }

  getPath() {
    return this.path;
  }

  isMono() {
    return this.mono;
  }
}

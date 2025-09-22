"use client";

import { Technology } from "./Technology";

export class TechnologyBuilder {
  private name: string = "";
  private url: string = "";
  private path: string = "";
  private mono = false;
  setName(name: string): this {
    this.name = name;
    return this;
  }

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  setPath(path: string): this {
    this.path = path;
    return this;
  }

  setMono(mono: boolean) {
    this.mono = mono;
    return this;
  }

  build(): Technology {
    if (!this.name.trim())
      throw new Error("Technology name must not be empty.");

    if (!this.url.trim()) throw new Error("Technology URL must not be empty.");

    if (!this.path.trim())
      throw new Error("Technology path must not be empty.");

    return new Technology(this.name, this.url, this.path, this.mono);
  }
}

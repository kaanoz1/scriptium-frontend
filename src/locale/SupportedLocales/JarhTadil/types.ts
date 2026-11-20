import { enJarhTadil } from "@/locale/SupportedLocales/JarhTadil/en";

/** Same keys as the English strings, any string values. */
type Stringify<T> = { readonly [K in keyof T]: T[K] extends string ? string : Stringify<T[K]> };

export type JarhTadilMessages = Stringify<typeof enJarhTadil>;

"use client";

import React from "react";
import { TNarratorPlain, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import Main from "@/app/[locale]/i/jt/ao/narrator/main";

type Props = { page: TPaged<TNarratorPlain>; query: string; rank: number | null };

const Client: React.FC<Props> = (props) => <Main {...props} />;

export default Client;

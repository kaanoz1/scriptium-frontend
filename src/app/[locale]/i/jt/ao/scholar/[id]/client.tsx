"use client";

import React from "react";
import { TPaged, TScholarComplete, TStatementWithNarrator } from "@/dto/Islam/Hadith/ArabicOnly";
import Main from "@/app/[locale]/i/jt/ao/scholar/[id]/main";

type Props = { scholar: TScholarComplete; statements: TPaged<TStatementWithNarrator> };

const Client: React.FC<Props> = (props) => <Main {...props} />;

export default Client;

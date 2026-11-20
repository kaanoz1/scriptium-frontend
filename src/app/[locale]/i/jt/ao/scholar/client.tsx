"use client";

import React from "react";
import { TScholarPlain } from "@/dto/Islam/Hadith/ArabicOnly";
import Main from "@/app/[locale]/i/jt/ao/scholar/main";

const Client: React.FC<{ scholars: TScholarPlain[] }> = ({ scholars }) => <Main scholars={scholars} />;

export default Client;

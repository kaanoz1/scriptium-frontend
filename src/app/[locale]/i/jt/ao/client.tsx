"use client";

import React from "react";
import { TJarhTadilOverview } from "@/dto/Islam/JarhTadil/ArabicOnly";
import Main from "@/app/[locale]/i/jt/ao/main";

type Props = { overview: TJarhTadilOverview };

const Client: React.FC<Props> = (props) => <Main {...props} />;

export default Client;

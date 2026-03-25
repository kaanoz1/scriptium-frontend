"use client";

import React from "react";
import Image from "next/image";
import {useTheme} from "@/hooks/useTheme";
import {Utils} from "@/util";
import {usePathname} from "next/navigation";
import ScriptiumText from "@/components/Navbar/ScriptiumText";
import Link from "next/link";


type Props = {
    showText?: boolean;
};

const ScriptiumBrand: React.FC<Props> = ({showText = true}) => {

    const [theme] = useTheme();

    const logoSrc = theme === "light" ? Utils.AssetManager.ScriptiumIconLight : Utils.AssetManager.ScriptiumIconDark;

    const isHomePage = usePathname() == "/" && showText;

    return (

        <Link href={"/"} className="flex items-center gap-3">
            <Image src={logoSrc} alt={"Scriptium Logo"} width={64} height={64}/>
            {isHomePage &&
                <ScriptiumText/>}
        </Link>

    )

}

export default ScriptiumBrand;
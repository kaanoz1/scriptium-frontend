"use client";

import React from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import ScriptiumText from "@/components/Navbar/ScriptiumText";
import Link from "next/link";
import {ClientUtils} from "@/util/ClientUtils";

type Props = {
    showText?: boolean;
};

const ScriptiumBrand: React.FC<Props> = ({showText = true}) => {
    const pathname = usePathname();

    const isHomePage = (pathname === "/" || pathname === "/en" || pathname === "/tr") && showText;

    return (
        <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 shrink-0">

                <Image
                    src={ClientUtils.AssetManager.ScriptiumIconLight}
                    alt="Scriptium Logo"
                    width={48}
                    height={48}
                    className="dark:hidden"
                />

                <Image
                    src={ClientUtils.AssetManager.ScriptiumIconDark}
                    alt="Scriptium Logo"
                    width={48}
                    height={48}
                    className="hidden dark:block"
                />
            </div>

            {isHomePage && (
                <ScriptiumText/>
            )}
        </Link>
    );
};

export default ScriptiumBrand;
import {syne} from "@/fonts";
import React from "react";
type Props ={
    className?: string;
}
const ScriptiumText: React.FC<Props> = ({className}) => {

    return <h1 className={`${syne.className} text-xl sm:text-2xl transition-opacity group-hover:opacity-80 ${className}`}>
        Scriptium
    </h1>
}

export default ScriptiumText;
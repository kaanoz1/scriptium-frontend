"use client";

import React, {useState} from "react";
import {Search} from "lucide-react";
import {RootWithWordCount} from "@/classes/Islam/Quran/Root/WithWordCount";
import Breadcrumbs from "@/app/[locale]/i/q/root/components/Breadcrumbs";
import Header from "@/app/[locale]/i/q/root/components/Header";
import RootContainer from "@/app/[locale]/i/q/root/components/RootContainer";
import {Input} from "@/components/ui/input";

type Props = {
    roots: RootWithWordCount[]
}

const Main: React.FC<Props> = ({roots}) => {
    const [val, setVal] = useState("");

    return (
        <main className="flex flex-col items-center w-full max-w-480 mx-auto pb-24">

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 pt-10 pb-6">
                <Breadcrumbs/>
            </div>

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 py-8 flex justify-center">
                <Header/>
            </div>

            <div className="w-full max-w-2xl px-4 sm:px-8 relative mb-16 mt-4">
                <Search className="absolute left-12 top-1/2 -translate-y-1/2 text-muted-foreground/70" size={20}/>
                <Input
                    className="pl-14 h-14 text-lg rounded-full shadow-sm bg-card border-border/50 focus-visible:ring-primary transition-all focus-visible:shadow-md"
                    placeholder="Search roots..."
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                />
            </div>

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48">
                <RootContainer filterQuery={val} roots={roots}/>
            </div>

        </main>
    );
}

export default Main;
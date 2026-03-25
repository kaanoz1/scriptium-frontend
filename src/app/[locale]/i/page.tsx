"use client";

import {NextPage} from "next";
import {useRouter} from "next/navigation";

const Page: NextPage = () => {
    const router = useRouter();

    router.push("./i/q");
    return null;
}
export default Page;
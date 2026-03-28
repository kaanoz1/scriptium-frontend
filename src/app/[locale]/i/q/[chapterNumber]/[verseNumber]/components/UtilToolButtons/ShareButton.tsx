"use client";

import React from "react";
import {useTranslations} from "next-intl";
import {LuCopy} from "react-icons/lu";
import {FaThreads, FaXTwitter} from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {GoShareAndroid} from "react-icons/go";
import {toast} from "sonner";

type Props = { shareText: string; }

const ShareButton: React.FC<Props> = ({shareText}) => {
    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.UtilToolButtons.ShareButton");

    const copyToClipboard = () => {
        const successfulMessage = t("CopySuccessful");
        const failMessage = t("CopyFailed");

        navigator.clipboard.writeText(shareText).then(() => toast.success(successfulMessage, {
            position: "bottom-right",
        }), () => toast.error(failMessage, {
            position: "bottom-right",
        }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><GoShareAndroid size={18}/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{t("Title")}</DialogTitle>
                    <DialogDescription>{t("Description")}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <Textarea
                        readOnly
                        value={shareText}
                        className="resize-none h-24 bg-muted/50 focus-visible:ring-0"
                    />

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="flex-1 gap-2"
                                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')}>
                            <FaXTwitter size={16}/> X
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2"
                                onClick={() => window.open(`https://threads.net/intent/post?text=${encodeURIComponent(shareText)}`, '_blank')}>
                            <FaThreads size={16}/> Threads
                        </Button>
                        <Button variant="default" className="flex-1 gap-2" onClick={copyToClipboard}>
                            <LuCopy size={16}/> {t("Copy")}
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">{t("Close")}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ShareButton;
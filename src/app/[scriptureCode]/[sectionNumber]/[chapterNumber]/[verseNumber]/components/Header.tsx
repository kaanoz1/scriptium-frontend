"use client";

import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import { FC } from "react";
import HeaderButtons from "./HeaderButtons";
import BreadCrumbs from "./BreadCrumbs";
import { VerseBoth } from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";

type Props = {
  verse: VerseBoth;
  isSaved: boolean;
  scriptureHelper: Readonly<ScriptureHelper>;
  functionThatMakesIsCollectionModelOpenStateTrue: () => void;
  functionThatMakesIsTranslationModelOpenStateTrue: () => void;
  functionThatMakesIsSettingsModelOpenStateTrue: () => void;
  functionThatMakesIsShareModelOpenStateTrueAndSetsShareText: () => void;
  setShareText: (text: string) => void;
};

const Header: FC<Props> = ({
  verse,
  isSaved,
  scriptureHelper,
  functionThatMakesIsCollectionModelOpenStateTrue,
  functionThatMakesIsSettingsModelOpenStateTrue,
  functionThatMakesIsShareModelOpenStateTrueAndSetsShareText,
  functionThatMakesIsTranslationModelOpenStateTrue,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
      <div className="w-full sm:w-auto flex justify-center sm:block">
        <BreadCrumbs verse={verse} />
      </div>

      <div className="w-full sm:w-auto flex sm:justify-end px-4 sm:px-0">
        <HeaderButtons
          verse={verse}
          isSaved={isSaved}
          scriptureHelper={scriptureHelper}
          functionThatMakesIsCollectionModelOpenStateTrue={
            functionThatMakesIsCollectionModelOpenStateTrue
          }
          functionThatMakesIsTranslationModelOpenStateTrue={
            functionThatMakesIsTranslationModelOpenStateTrue
          }
          functionThatMakesIsSettingsModelOpenStateTrue={
            functionThatMakesIsSettingsModelOpenStateTrue
          }
          functionThatMakesIsShareModelOpenStateTrueAndSetsShareText={
            functionThatMakesIsShareModelOpenStateTrueAndSetsShareText
          }
        />
      </div>
    </div>
  );
};

export default Header;

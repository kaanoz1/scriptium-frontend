import { InformationalTranslatorsDTO } from "@/types/types";
import { PROJECT_NAME } from "@/util/utils";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { FC } from "react";

interface Props {
  translation: InformationalTranslatorsDTO;
}

const AboutPageTranslatorExplanation: FC<Props> = ({ translation }) => {
  return (
    <section className="border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
        <strong>{translation.name}</strong>
      </h3>
      <div className="mb-2">
        <Tooltip
          content={`Suggestions is a feature of ${PROJECT_NAME} that allows users to make suggestions to the translations without revealing their identity. This helps translators improve their work based on community feedback.`}
        >
          <span className="text-sm text-gray-600 dark:text-gray-100 mr-1">
            Open to suggestions?
          </span>
        </Tooltip>
        <span
          className={`px-2 py-1 rounded text-sm text-white ${
            translation.isEager ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <em>{translation.isEager ? "Yes" : "No"}</em>
        </span>
      </div>
      <div className="mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
          Language:
        </span>{" "}
        <span className="text-gray-800 dark:text-gray-100">
          {translation.language.langOwn} ({translation.language.langEnglish})
        </span>
      </div>
      <div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-100">
          Translators:
        </span>
        <ul className="list-disc list-inside ml-4 mt-1">
          {translation.translators.map((t, i) => (
            <li
              key={`translator-${t.name}-${i}`}
              className="text-gray-800 dark:text-gray-100"
            >
              {t.url ? (
                <Link href={t.url} isExternal showAnchorIcon>
                  <strong>{t.name}</strong>
                </Link>
              ) : (
                <span>{t.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPageTranslatorExplanation;

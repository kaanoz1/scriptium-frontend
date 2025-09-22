import { Link } from "@heroui/link";
import { FC } from "react";

type T_BookBoxParams = {
  href: string;
  heading: string;
  informationHref: string;
  headingDescription: string;
  informationTitle: string;
  headingOwnLanguage: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const BookBox: FC<T_BookBoxParams> = ({
  href,
  heading,
  headingDescription,
  headingOwnLanguage,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <section
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative z-10"
    >
      <Link
        href={href}
        className="w-64 border border-gray-300 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-[1.01] bg-white dark:bg-neutral-900 text-center"
      >
        <div className="space-y-2">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
            {heading}
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {headingOwnLanguage}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {headingDescription}
          </p>
          <div className="pt-2">
            {/* <Link href={informationHref} isExternal showAnchorIcon>
              <span className="text-sm text-blue-500 hover:underline">
                {informationTitle}
              </span>
            </Link> */}
          </div>
        </div>
      </Link>
    </section>
  );
};

export default BookBox;

import { motion } from "framer-motion";
import { FC } from "react";
import { LuBookX } from "react-icons/lu";

interface Props {
  scriptureCode: string;
  sectionNumber: string;
}

const SectionPageNotFoundComponent: FC<Props> = ({
  scriptureCode,
  sectionNumber,
}) => {
  return (
    <div className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 2.4 }}
        >
          <LuBookX size={96} className="text-gray-500 dark:text-white" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-white">
          <em className="font-bold text-red-500">404.</em> We couldn&apos;t find
          any section with scripture code:{" "}
          <em className="font-bold dark:text-white">{scriptureCode}</em>
          {", "}
          and section number:{" "}
          <em className="font-bold dark:text-white">{sectionNumber}</em>
        </div>
      </div>
    </div>
  );
};

export default SectionPageNotFoundComponent;

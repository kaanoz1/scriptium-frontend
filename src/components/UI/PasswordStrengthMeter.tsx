import { TPasswordStrength } from "../SignUpForm";
import { motion } from "framer-motion";
import { FC } from "react";

interface Props {
  strength?: TPasswordStrength;
}

const PasswordStrengthMeter: FC<Props> = ({ strength }) => {
  let color: string;
  let index: number;

  switch (strength) {
    case "Strong":
      color = "bg-green-500 text-green-500";
      index = 3;
      break;
    case "Medium":
      color = "bg-yellow-500 text-yellow-500";
      index = 2;
      break;
    case "Weak":
      color = "bg-orange-500 text-orange-500";
      index = 1;
      break;
    default:
      color = "bg-red-500 text-red-500";
      index = 0;
      break;
  }

  return (
    <motion.section
      className="flex flex-col items-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: i <= index ? 1 : 0.2 }}
            exit={{ opacity: 0 }}
            className={`h-2 w-16 rounded-md ${
              i <= index ? color.split(" ")[0] : "bg-gray-300"
            }`}
          ></motion.div>
        ))}
      </div>

      <div className="relative w-full mt-2">
        <motion.div
          animate={{ x: `calc(${index * (64 + 8)}px + 32px - 50%)` }}
          className={`absolute text-md ${color.split(" ")[1]}`}
          style={{ transform: "translateX(-50%)" }}
        >
          {strength}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PasswordStrengthMeter;

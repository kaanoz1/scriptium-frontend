"use client";
import { FC, useState } from "react";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { UserOwnDTO } from "@/types/classes/User";
import { motion } from "framer-motion";
import { FaSave, FaTimes } from "react-icons/fa";

interface Props {
  user: UserOwnDTO;
  defaultTitle?: string;
  defaultText?: string;
  onSubmitNote: (text: string) => Promise<void>;
  onCancel?: () => void;
  submitting?: boolean;
  placeholder?: string;
}

const NoteForm: FC<Props> = ({
  defaultText = "",
  onSubmitNote,
  onCancel,
  submitting = false,
  placeholder = "Write your note here...",
}) => {
  const [text, setText] = useState(defaultText);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setIsSubmitting(true);
    await onSubmitNote(text.trim());
    setIsSubmitting(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Textarea
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        maxLength={1000}
        required
      />

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="bordered"
            onPress={onCancel}
            disabled={isSubmitting || submitting}
            endContent={<FaTimes />}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="solid"
          isLoading={isSubmitting || submitting}
          endContent={<FaSave />}
        >
          Save Note
        </Button>
      </div>
    </motion.form>
  );
};

export default NoteForm;

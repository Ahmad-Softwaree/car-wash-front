import { cn } from "@/lib/utils";
import { DialogProps } from "@/types/global";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useEffect } from "react";

const Dialog: React.FC<DialogProps> = ({
  width = "95%",
  height = "fit",
  maxHeight = "900px",
  maxWidth = "1400px",
  isOpen,
  onClose,
  children,
  ...props
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      {...props}
      ref={dialogRef}
      style={{
        width,
        height,
        maxHeight,
        maxWidth,
      }}
      className={cn(
        props.className,
        "p-2 bg-white border-none overflow-y-auto no-scrollbar"
      )}
      onClick={onClose}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn("", "rounded-md bg-white w-full")}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-full">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
};

export default Dialog;

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  open: boolean;
  onClose: () => void;
};

export default function ProjectCarousel({ images, open, onClose }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) setIndex(0);
  }, [open]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white/80 p-2"
          >
            <X className="h-5 w-5 text-black" />
          </button>

          {/* Image */}
          <motion.img
            key={index}
            src={images[index]}
            className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-6 rounded-full bg-white/80 p-2"
              >
                <ChevronLeft className="h-6 w-6 text-black" />
              </button>
              <button
                onClick={next}
                className="absolute right-6 rounded-full bg-white/80 p-2"
              >
                <ChevronRight className="h-6 w-6 text-black" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

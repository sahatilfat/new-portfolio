import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

type ITextSpan = {
  children: React.ReactNode;
};

const TextSpan: React.FC<ITextSpan> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const controls = useAnimationControls();
  const rubberBand = () => {
    controls.start({
      transform: [
        "scale3d(1,1,1)",
        "scale3d(1.4, .55, 1)",
        "scale3d(.75, 1.25, 1)",
        "scale3d(1.25, 0.85, 1)",
        "scale3d(0.9, 1.05, 1)",
        "scale3d(1, 1, 1)",
      ],
    });
    setIsPlaying(true);
  };

  return (
    <motion.span
      animate={controls}
      onMouseOver={() => {
        if (!isPlaying) {
          rubberBand();
        }
      }}
      onAnimationComplete={() => setIsPlaying(false)}
    >
      {children}
    </motion.span>
  );
};

export default TextSpan;

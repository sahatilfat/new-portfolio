import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import styles from "./TiltCard.module.scss";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

type ITiltCard = {
  imgUrl?: string;
};

const TiltCard: React.FC<ITiltCard> = ({ imgUrl }) => {
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        setIsMouseEnter(true);
        handleMouseMove(e);
      }}
      onMouseLeave={() => {
        setIsMouseEnter(false);
        handleMouseLeave();
      }}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={`${styles["container"]} ${isMouseEnter && styles["hover"]}`}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
          backgroundImage: `url(${imgUrl})`,
        }}
        className={styles["wrapper"]}
      >
        {/* <img src={imgUrl} alt="project" /> */}
        {/* {isMouseEnter && (
          <motion.div
            initial={{ scale: 0, borderRadius: "50%" }}
            animate={{ scale: 1, borderRadius: "0px" }}
            transition={{ duration: 0.3 }}
            className={styles["layer-shadow"]}
          ></motion.div>
        )} */}
      </div>
    </motion.div>
  );
};

export default TiltCard;

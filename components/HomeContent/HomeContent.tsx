import React, { useState } from "react";
import styles from "./HomeContent.module.scss";
import ButtonDefault from "../ButtonDefault/ButtonDefault";

import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import BounceText from "../BounceText/BounceText";

const HomeContent = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const [isHovered, setIsHovered] = useState(false);
  const [{ xys }, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 10;
    const y = (clientY - window.innerHeight / 2) / 10;
    set({ xys: [x, y, 1] });
  };

  return (
    <motion.div
      className={styles["container"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove} // Tambahkan event handler onMouseMove
    >
      <div className={styles["content-wrapper"]}>
        <animated.div
          style={{
            transform: xys.interpolate(
              (x, y, s) => `perspective(600px) rotateX(${y}deg)  scale(${s})`
            ),
          }}
          onMouseEnter={() => setIsHovered(true)} // Ubah event handler onMouseEnter
          onMouseLeave={() => setIsHovered(false)} // Ubah event handler onMouseLeave
        >
          <BounceText text="hey, i am tafli" />
        </animated.div>
        <p className={styles["text2"]}>I am a front-end web developer</p>
        <div className={styles["button-wrapper"]}>
          <ButtonDefault
            onClick={() => {
              window.location.href = "/activities-involved";
            }}
            btnText="activities involved"
          />
          <ButtonDefault
            onClick={() => {
              window.location.href = "/about";
            }}
            btnText="more about me"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HomeContent;

import React, { useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import styles from "./AboutMe.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CursorCustom from "../CursorCustom/CursorCustom";
import MultiLayerParallax from "../MultiLayerParallax/MultiLayerParallax";

const showFromLeftVariant = {
  visible: { opacity: 1, scale: 1, x: 0 },
  hidden: { opacity: 1, scale: 1, x: "-100%" },
};
const showFromRightVariant = {
  visible: { opacity: 1, scale: 1, x: 0 },
  hidden: { opacity: 1, scale: 1, x: "100%" },
};

const AboutMe = () => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  const handleMouseMove = (e: any) => {
    const { clientX } = e;
    set({ x: (clientX - window.innerWidth / 2) / 50 });
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["first-content"]}>
          <motion.div
            className={styles["hero-wrapper"]}
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <p className={styles["hero-text"]}>Innovate</p>
            <animated.img
              src="/assets/img/my-photo.PNG"
              alt="photo"
              className={styles["my-photo"]}
              style={{
                transform: x.interpolate(
                  (x) => `translateX(${x}px) translate(-50%, -51%)`
                ),
              }}
            />
            <img
              src="/assets/img/scribbles1.png"
              alt="decoration"
              className={styles["scribbles1"]}
            />
            <img
              src="/assets/img/scribbles2.png"
              alt="decoration"
              className={styles["scribbles2"]}
            />
            <img
              src="/assets/img/scribbles3.png"
              alt="decoration"
              className={styles["scribbles3"]}
            />
            <img
              src="/assets/img/scribbles4.png"
              alt="decoration"
              className={styles["scribbles4"]}
            />
            <img
              src="/assets/img/scribbles5.png"
              alt="decoration"
              className={styles["scribbles5"]}
            />
          </motion.div>
        </div>
        <MultiLayerParallax />
        <div className={styles["third-content"]}>
          <div className={styles["text-wrapper"]}>
            <motion.p
              className={styles["title"]}
              ref={ref}
              variants={showFromLeftVariant}
              initial="hidden"
              animate={control}
              transition={{ duration: 0.5 }}
            >
              Why yield to the ordinary?
            </motion.p>
            <div className={styles["paragraph-wrapper"]}>
              <motion.p
                className={styles["paragraph1"]}
                ref={ref}
                variants={showFromLeftVariant}
                initial="hidden"
                animate={control}
                transition={{ duration: 0.5 }}
              >
                Effort? Mediocrity? Never heard of them. The mission here is to
                bend, twist, and warp your reality, presenting you with a
                mind-boggling digital playground. Lets call it -- The Web on
                Steroids.
              </motion.p>
              <motion.p
                className={styles["paragraph2"]}
                ref={ref}
                variants={showFromRightVariant}
                initial="hidden"
                animate={control}
                transition={{ duration: 0.5 }}
              >
                Lets be honest, who isnt tired of clichéd web designs? Your
                users are craving for something different, something unique,
                something immersive. Be Ready! They wont settle for less.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <CursorCustom />
    </>
  );
};

export default AboutMe;

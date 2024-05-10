import React, { useState, useEffect } from "react";
import styles from "./ActivitiesInvolved.module.scss";
import CardProject from "../CardProject/CardProject";
import TiltCard from "../TiltCard/TiltCard";
import CardWithDescription from "../CardWithDescription/CardWithDescription";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const showFromBottomVariant = {
  visible: { y: 0, opacity: 1, transition: { duration: 1 } },
  hidden: { y: 100, opacity: 0, transition: { duration: 1 } },
};
const ActivitiesInvolved = () => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);
  return (
    <div className={styles["container"]}>
      <div className={styles["content-wrapper"]}>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles["title"]}
        >
          Activities Involved
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles["project-description-wrapper"]}
        >
          <p className={styles["description-title"]}>description</p>
          <p className={styles["description-paragraph"]}>
            Welcome to my showcase of a modern, responsive website design
            project. As a frontend developer, I crafted this website from
            scratch using HTML5, CSS3, and JavaScript. The goal was to create a
            seamless user experience across devices, focusing on intuitive
            navigation and visually appealing design elements.
          </p>
        </motion.div>
        <motion.div
          className={styles["key-features-wrapper"]}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className={styles["description-title"]}>Key Features:</p>
          <ol>
            <li>
              <span>Responsive Design</span>: Ensuring the website looks great
              on desktops, tablets, and smartphones, providing a consistent
              experience.
            </li>
            <li>
              <span>Interactive Elements</span>: Implementing JavaScript for
              interactive features such as sliders, modal pop-ups, and smooth
              scrolling.
            </li>
            <li>
              <span>Performance Optimization</span>: Optimizing code and assets
              for fast loading times and a snappy user experience.
            </li>
            <li>
              <span>Cross-Browser Compatibility</span>: Testing and ensuring
              compatibility with major browsers like Chrome, Firefox, Safari,
              and Edge.
            </li>
            <li>
              <span>Accessibility</span>: Incorporating accessibility best
              practices to make the website usable for all users, including
              those with disabilities.
            </li>
            <li>
              <span>SEO-Friendly</span>: Structuring the site with SEO in mind,
              using semantic HTML and optimizing meta tags for better search
              engine visibility.
            </li>
          </ol>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles["technologies-used-wrapper"]}
        >
          <p className={styles["technologies-used-title"]}>
            Technologies Used:
          </p>
          <ul>
            <li>React JS + Next JS</li>
            <li>Redux, Redux Toolkit, Mobx</li>
            <li>SASS, Antd, Styled Component</li>
            <li>Responsive Design Principles</li>
            <li>Browser Developer Tools for Testing and Debugging</li>
          </ul>
        </motion.div>
        <div className={styles["list-project-wrapper"]}>
          <motion.p
            ref={ref}
            variants={showFromBottomVariant}
            initial="hidden"
            animate={control}
            className={styles["list-project-wrapper-title"]}
          >
            Work Lists
          </motion.p>
          <div className={styles["card-list-project-wrapper"]}>
            <div className={styles["project"]}>
              <CardWithDescription imgUrl="/assets/img/projects/riftstorm.png" />
            </div>
            <div className={styles["project"]}>
              <CardWithDescription
                type="secondary"
                imgUrl="/assets/img/projects/pum.png"
                title="PUM Project"
                description="Creating a website for a company that is useful for monitoring peatlands by utilizing data from weather stations installed in the field. Data from the field is used to calibrate a model system to produce more accurate estimates or predictions"
              />
            </div>
            <div className={styles["project"]}>
              <CardWithDescription
                imgUrl="/assets/img/projects/smile.png"
                title="System of Monitoring  Land
                and Environment"
                description="creating a website using the Progressive Web App methodology in implementing a land and environmental monitoring system in peat areas"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesInvolved;

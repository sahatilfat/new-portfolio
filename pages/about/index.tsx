import React from "react";
import AboutMe from "../../components/AboutMe/AboutMe";
import styles from "./AboutPage.module.scss";

function index() {
  return (
    <div className={styles["container"]}>
      <div className={styles["content-wrapper"]}>
        <AboutMe />
      </div>
    </div>
  );
}

export default index;

import React from "react";
import styles from "../styles/Home.module.scss";
import Canvas from "../components/Canvas";
import HomeContent from "../components/HomeContent/HomeContent";

function index() {
  return (
    <div className={styles["container"]}>
      <Canvas />
      <div className={styles["home-content-wrapper"]}>
        <HomeContent />
      </div>
    </div>
  );
}

export default index;

import React from "react";
import Styles from "@/styles/pageLoader.module.css";

const PageLoader = ({ message }: { message: string }) => {
  return (
    <div className={Styles.pageLoaderContainer}>
      <div className={Styles.pageLoader}>
        <p>{message}</p>
        <div className={Styles.spinner} />
      </div>
    </div>
  );
};

export default PageLoader;

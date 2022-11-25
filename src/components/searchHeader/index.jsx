import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.less";

export default function searchHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["search-box"]}>
        <div className={styles.search}>
          <div
            className={styles.location}
            onClick={() => navigate("/citylist")}>
            <span>北京</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          <div className={styles.form} onClick={() => navigate("house")}>
            <i className="iconfont icon-seach" />
            <span>请输入小区内容</span>
          </div>
        </div>
        <i className="iconfont icon-map" onClick={() => navigate(`/map`)}></i>
      </div>
    </>
  );
}

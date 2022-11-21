import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, Toast, Grid } from "antd-mobile";

import nav1 from "../../assets/images/nav-1.png";
import nav2 from "../../assets/images/nav-2.png";
import nav3 from "../../assets/images/nav-3.png";
import nav4 from "../../assets/images/nav-4.png";

import styles from "./index.module.less";

export default function Index() {
  React.useEffect(() => {
    getSwipers();
    getGroups();
    getNews();
  }, []);

  const navigate = useNavigate();
  const [swipers, setSwipers] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [isSwipersLoaded, setIsSwipersLoaded] = React.useState(false);

  const getSwipers = async () => {
    const res = await axios.get("http://127.0.0.1:8080/home/swiper");
    setSwipers(res.data.body);
    setIsSwipersLoaded(true);
  };
  const getGroups = async () => {
    const res = await axios.get("http://127.0.0.1:8080/home/groups", {
      params: {
        area: "AREA%7C88cff55c-aaa4-e2e0",
      },
    });
    setGroups(res.data.body);
  };
  const getNews = async () => {
    const res = await axios.get("http://127.0.0.1:8080/home/news", {
      params: {
        area: "AREA%7C88cff55c-aaa4-e2e0",
      },
    });
    setNews(res.data.body);
  };

  const items = swipers.map((swiper, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.content}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`);
        }}
      >
        <img
          src={`http://localhost:8080${swiper.imgSrc}`}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
        />
      </div>
    </Swiper.Item>
  ));

  const navs = [
    {
      id: 1,
      img: nav1,
      title: "整租",
      path: "house",
    },

    {
      id: 2,
      img: nav2,
      title: "合租",
      path: "/path/list",
    },
    {
      id: 3,
      img: nav3,
      title: "地图找房",
      path: "/path/list",
    },
    {
      id: 4,
      img: nav4,
      title: "出租",
      path: "/path/list",
    },
  ];

  return (
    <div>
      {isSwipersLoaded ? (
        <Swiper autoplay loop autoplayInterval={5000}>
          {items}
        </Swiper>
      ) : (
        ""
      )}
      <Grid columns={4} gap={3}>
        {navs.map((nav) => {
          return (
            <Fragment key={nav.id}>
              <Grid.Item onClick={() => navigate(nav.path)}>
                <div className={styles["iconBars"]}>
                  <img src={nav1} />
                  <h2>{nav.title}</h2>
                </div>
              </Grid.Item>
            </Fragment>
          );
        })}
      </Grid>
      <div className={styles["groups"]}>
        <div className={styles["head"]}>
          <h2>租房小组</h2>
          <p>更多</p>
        </div>
        <div className={styles["groupItems"]}>
          <Grid columns={2} gap={10}>
            {groups.map((group) => {
              return (
                <Fragment key={group.id}>
                  <Grid.Item>
                    <div className={styles["groupItem"]}>
                      <h2>{group.title}</h2>
                      <p>{group.desc}</p>
                      <img src={`http://localhost:8080${group.imgSrc}`} />
                    </div>
                  </Grid.Item>
                </Fragment>
              );
            })}
          </Grid>
        </div>
      </div>
      <div className={styles.latestNews}>
        <div className={styles.head}>
          <h2>最新资讯</h2>
        </div>
        {news.map((item) => {
          return (
            <div className={styles.newsItem}>
              <img src={`http://localhost:8080${item.imgSrc}`} />
              <div className={styles.contents}>
                <h2>{item.title}</h2>
                <p className={styles.source}>{item.from}</p>
                <p className={styles.time}>{item.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

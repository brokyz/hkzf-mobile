import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, Toast, Grid } from "antd-mobile";
import { getCurrentCity } from "../../utils";

import SearchHeader from "../../components/searchHeader";

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
    getCurrentCity().then((res) => setCity(res));
  }, []);

  const navigate = useNavigate();
  const [city, setCity] = React.useState();
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
  function getCity() {
    let myCity = new BMapGL.LocalCity();
    myCity.get(async (res) => {
      const result = await axios.get(
        `http://127.0.0.1:8080/area/info?name=${res.name}`
      );
      setCity(result.data.body);
    });
  }

  // 获取地理位置信息
  // const [position, setPosition] = React.useState({ status: false });
  // const getPosition = () => {
  //   navigator.geolocation.getCurrentPosition((p) => {
  //     console.log("当前位置信息：", p);
  //     setPosition({
  //       longitude: p.coords.longitude,
  //       latitude: p.coords.latitude,
  //       status: true,
  //     });
  //   });
  // };

  // 封装 Swiper Item
  const items = swipers.map((swiper, index) => (
    <Swiper.Item key={index}>
      <div
        className={styles.swiper}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`);
        }}>
        <img
          src={`http://localhost:8080${swiper.imgSrc}`}
          alt=""
          style={{ width: "100%", verticalAlign: "top" }}
        />
      </div>
    </Swiper.Item>
  ));

  // nav 标签数据
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
      path: "/map",
    },
    {
      id: 4,
      img: nav4,
      title: "出租",
      path: "/test",
    },
  ];

  return (
    <div>
      <div className={styles.searchHeader}>
        <SearchHeader city={city} />
      </div>
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
                  <img src={nav.img} />
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
            <div className={styles.newsItem} key={item.id}>
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

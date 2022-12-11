import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar, Toast } from "antd-mobile";
import { AutoSizer, List } from "react-virtualized";
import { useUpdateEffect } from "ahooks";
import { getCurrentCity } from "../../utils";

import styles from "./index.module.less";

export default function CityList() {
  const [citys, setCitys] = React.useState({ cityIndex: [], cityList: [] });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigate = useNavigate();
  React.useEffect(() => {
    getCityData().then((res) => {
      setCitys(res);
    });
  }, []);

  useUpdateEffect(() => {
    cityListRef.current.measureAllRows();
  }, [citys]);

  function back() {
    navigate(-1);
  }

  // 格式化处理获取的城市数据
  async function formatCityData(cityData, hot) {
    const cityList = {};

    // 按首字母分类城市信息
    cityData.filter((city) => {
      const first = city.short.substr(0, 1);
      if (cityList[first]) {
        cityList[first].push(city);
      } else {
        cityList[first] = [city];
      }
    });

    // 获取排序后的城市首字母表
    const cityIndex = Object.keys(cityList).sort();

    // 添加热门城市数据
    cityList.hot = hot;
    cityIndex.unshift("hot");

    // 添加当前城市
    const curCity = await getCurrentCity();
    cityList["#"] = [curCity];
    cityIndex.unshift("#");

    return {
      cityList,
      cityIndex,
    };
  }

  // 获取城市数据
  async function getCityData() {
    const {
      data: { body: cityData },
    } = await axios.get("http://127.0.0.1:8080/area/city?level=1");

    const {
      data: { body: hot },
    } = await axios.get("http://127.0.0.1:8080/area/hot");
    const formatData = await formatCityData(cityData, hot);
    return formatData;
  }

  // 过滤器
  function formatCityIndex(letter) {
    switch (letter) {
      case "#":
        return "当前城市";
      case "hot":
        return "热门城市";
      default:
        return letter;
    }
  }

  function clickCity({ label, value }) {
    if (["北京", "上海", "广州", "深圳"].indexOf(label) > -1) {
      localStorage.setItem("hkzf_city", JSON.stringify({ label, value }));
      navigate(-1);
    } else {
      Toast.show({
        content: "当前城市暂无房源信息",
        duration: 1000,
      });
    }
  }

  function rowRenderer({
    key, // 唯一值
    index, // 索引号
    isScrolling, // 是否在滚动中
    isVisible, // 当前行在list中是否可见
    style, // 每行的样式对象
  }) {
    const cityIndex = citys.cityIndex;
    const cityItems = citys.cityList[cityIndex[index]];

    return (
      <div key={key} style={style}>
        <h3>{formatCityIndex(cityIndex[index])}</h3>
        {cityItems.map((item) => {
          return (
            <p
              key={item.value}
              onClick={() => {
                clickCity(item);
              }}>
              {item.label}
            </p>
          );
        })}
      </div>
    );
  }

  function onRowsRendered({ startIndex }) {
    if (startIndex !== activeIndex) {
      setActiveIndex(startIndex);
    }
  }

  function getRowHeight({ index }) {
    const hei = 30 + citys.cityList[citys.cityIndex[index]].length * 32.5;
    return hei;
  }

  const cityListRef = React.useRef();
  function clickIndex(index) {
    cityListRef.current.scrollToRow(index);
  }

  function renderCityIndex() {
    return citys.cityIndex.map((item, index) => (
      <li
        key={item}
        className={activeIndex === index ? styles["index-active"] : ""}
        onClick={() => {
          clickIndex(index);
        }}>
        <span>{item === "hot" ? "热" : item}</span>
      </li>
    ));
  }

  return (
    <>
      <NavBar
        style={{
          "--height": "36px",
          "--border-bottom": "1px #eee solid",
        }}
        onBack={back}>
        城市列表
      </NavBar>
      <div className={styles.list}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={cityListRef}
              width={width}
              height={height}
              rowCount={citys.cityIndex.length}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
              onRowsRendered={onRowsRendered}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
      </div>
      <ul className={styles["city-index"]}>{citys ? renderCityIndex() : ""}</ul>
    </>
  );
}

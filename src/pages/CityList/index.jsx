import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "antd-mobile";
import { AutoSizer, List } from "react-virtualized";
import { getCurrentCity } from "../../utils";

export default function CityList() {
  React.useEffect(() => {
    getCityData();
  }, []);

  const navigate = useNavigate();

  function back() {
    navigate(-1);
  }

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

  const [citys, setCitys] = React.useState();
  async function getCityData() {
    const {
      data: { body: cityData },
    } = await axios.get("http://127.0.0.1:8080/area/city?level=1");

    const {
      data: { body: hot },
    } = await axios.get("http://127.0.0.1:8080/area/hot");
    setCitys(await formatCityData(cityData, hot));
  }

  const list = Array(100).fill("testData");

  function rowRenderer({
    key, // 唯一值
    index, // 索引号
    isScrolling, // 是否在滚动中
    isVisible, // 当前行在list中是否可见
    style, // 每行的样式对象
  }) {
    const cityIndex = citys.cityIndex;
    const cityItems = citys.cityList[cityIndex[index]];
    // console.log(cityItems);
    return (
      <div key={key} style={style}>
        <h3>{cityIndex[index]}</h3>
        {cityItems.map((item) => {
          return <p>{item.label}</p>;
        })}
      </div>
    );
  }

  function getRowHeight({ index }) {
    const hei = 20 + citys.cityList[citys.cityIndex[index]].length * 20;
    console.log(citys.cityIndex[index], " ", hei);
    return hei;
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
      <div style={{ height: "calc(100vh - 36px)" }}>
        {citys ? (
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowCount={citys.cityIndex.length}
                rowHeight={getRowHeight}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        ) : (
          ""
        )}
        {/* {console.log(citys)} */}
      </div>
    </>
  );
}

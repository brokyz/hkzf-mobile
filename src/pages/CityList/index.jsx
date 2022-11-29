import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar, IndexBar, List } from "antd-mobile";
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
      <div className="cityList" style={{ height: "calc(100vh - 36px)" }}>
        {citys ? (
          <IndexBar>
            {citys.cityIndex.map((item) => {
              return (
                <IndexBar.Panel
                  index={item}
                  title={`${item}`}
                  key={`标题${item}`}>
                  <List>
                    {citys.cityList[item].map((item, index) => (
                      <List.Item
                        key={index}
                        onClick={() => console.log(item.label, index)}
                        arrow="">
                        {item.label}
                      </List.Item>
                    ))}
                  </List>
                </IndexBar.Panel>
              );
            })}
          </IndexBar>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

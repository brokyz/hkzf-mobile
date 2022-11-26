import axios from "axios";

// 获取当前城市
export function getCurrentCity() {
  // 从 localStore 中拿到当前城市信息的历史记录
  const localCity = JSON.parse(localStorage.getItem("hkzf_city"));
  // 如果 localStorage 中没有城市信息，那么我们再使用百度地图Api获取
  if (!localCity) {
    // 由于我们获取城市信息是异步操作，如果想向外暴露数据，我们需要使用回调函数或Promise处理
    return new Promise((resolve, reject) => {
      const currentCity = new BMapGL.LocalCity();
      currentCity.get(async (res) => {
        // 对可能出错的代码使用 try catch 捕获
        try {
          const result = await axios.get(
            `http://127.0.0.1:8080/area/info?name=${res.name}`
          );
          localStorage.setItem("hkzf_city", JSON.stringify(result.data.body));
          resolve(result.data.body);
        } catch (error) {
          // 失败时返回一个失败的 Promise
          reject(error);
        }
      });
    });
  }
  // 由于我们在 localStorage 没有当前城市信息时，返回了 Promise，为了保证返回值一致，当有信息时，我们也用 Promise 封装一下
  return Promise.resolve(localCity);
}

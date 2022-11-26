import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "antd-mobile";

import "./index.less";

function Map() {
  React.useEffect(() => {
    var map = new BMapGL.Map("container");

    function myFun(result) {
      console.log(result.center);
      var point = new BMapGL.Point(result.center.lng, result.center.lat);
      map.centerAndZoom(point, 12);
    }
    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun);
  }, []);

  const navigate = useNavigate();

  function back() {
    navigate(-1);
  }

  return (
    <div className="map">
      <NavBar
        style={{
          "--height": "36px",
          "--border-bottom": "1px #eee solid",
        }}
        onBack={back}>
        地图找房
      </NavBar>
      <div id="container"></div>
    </div>
  );
}

export default React.memo(Map);

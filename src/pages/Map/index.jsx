import React from "react";
import { useParams } from "react-router-dom";

import "./index.less";

function Map(props) {
  React.useEffect(() => {
    // const position = useParams();
    // const map = new BMapGL.Map("container");
    // var point = new BMapGL.Point(position.longitude, position.latitude);
    // map.centerAndZoom(point, 15);
    // console.log(props);
  }, []);

  return (
    <div className="map">
      <div id="container"></div>
    </div>
  );
}

export default React.memo(Map);

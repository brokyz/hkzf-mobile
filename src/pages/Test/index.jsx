import React from "react";
import "react-virtualized/styles.css"; //导入样式
import { AutoSizer, List } from "react-virtualized"; //导入list组件

// List data as an array of strings
const list = Array(100).fill("testData");

function rowRenderer({
  key, // 唯一值
  index, // 索引号
  isScrolling, // 是否在滚动中
  isVisible, // 当前行在list中是否可见
  style, // 每行的样式对象
}) {
  return (
    <div key={key} style={style}>
      {index}---{list[index]}---isScrolling:{isScrolling + ""}---isVisible:
      {isVisible + ""}
    </div>
  );
}

export default function Test() {
  return (
    <div id="test" style={{ width: "100%", height: "100%" }}>
      <h1>test</h1>
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            rowCount={list.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  );
}

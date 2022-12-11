import React, { Component } from "react";
import { useUpdateEffect } from "ahooks";

class index0 extends Component {
  state = {
    test: 0,
  };

  componentDidMount() {
    console.log("before setState:", this.state.test);
    this.setState({ test: 1 });
    console.log("after setState:", this.state.test);
  }

  render() {
    console.log("render:", this.state.test);
    return (
      <div>
        <h1>类式组件</h1>
        <h2>test:{this.state.test}</h2>
      </div>
    );
  }
}

class index1 extends Component {
  state = {
    test: 0,
  };

  componentDidMount() {
    console.log("before setState:", this.state.test);
    this.setState({ test: 1 });
  }

  componentDidUpdate() {
    console.log("after didUpdate:", this.state.test);
  }

  render() {
    // console.log(this.state.test);
    return (
      <div>
        <h1>类式组件</h1>
        <h2>{this.state.test}</h2>
      </div>
    );
  }
}

function index2() {
  const [test, setTest] = React.useState(0);
  React.useEffect(() => {
    console.log("before change:", test);
    setTest(1);
  }, []);

  // React.useEffect(() => {
  //   if (test !== 0) {
  //     console.log("after change:", test);
  //   }
  // }, [test]);

  useUpdateEffect(() => {
    console.log("after change:", test);
  });

  return (
    <div>
      <h1>函数式组件</h1>
      <h2>{test}</h2>
    </div>
  );
}

export default index2;

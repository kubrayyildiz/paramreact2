import * as ROSLIB from "roslib";
import React, { Component } from "react";
import App from "./App";
import Config from "./Config";
import ParamScreen from "./Components/ParamScreen";
import ParamRow from "./Components/ParamRow";
class Home extends Component {
  state = { ros: null };

  constructor() {
    super();
    this.init_connection();
  }
  connect() {
    try {
      this.state.ros.connect(
        "ws://" +
          Config.ROSBRIDGE_SERVER_IP +
          ":" +
          Config.ROSBRIDGE_SERVER_PORT +
          ""
      );
    } catch (error) {
      console.log(error);
    }
  }
  init_connection() {
    this.state.ros = new ROSLIB.Ros();

    this.state.ros.on("connection", () => {
      this.setState({ connected: true });
    });

    this.state.ros.on("close", () => {
      this.setState({ connected: false });
      setTimeout(() => {
        this.connect();
      }, Config.RECONNECTION_TIMEOUT * 1000);
    });
    this.connect();
  }

  render() {
    return (
      <div>
        {/* <App ros={this.state.ros}></App> */}
        <ParamScreen ros={this.state.ros}/>
      </div>
    );
  }
}

export default Home;

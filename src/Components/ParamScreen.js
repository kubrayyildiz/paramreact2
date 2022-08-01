import Home from "../Home";
import ParamRow from "./ParamRow";
import * as ROSLIB from "roslib";
import React, { useEffect, useState } from "react";
function ParamScreen(props) {
  const ros = props.ros;
  const params = props.param;
  const [charge_params, setcharge_params] = useState(0);

  let content = []; //birden fazla sayfayı for döngüsü içinde yazıldı.
  for (let i = 0; i < charge_params.length; i++) {
    const item = charge_params[i];
    content.push(
      <tr>
        <ParamRow ros={ros} paramName={charge_params[i]}>
          {" "}
        </ParamRow>
      </tr>
    );
  }
  // return content;
  // };

  // return <ParamRow>{getChargeParams(params)}</ParamRow>;
  useEffect(() => {
    var paramCharge = new ROSLIB.Param({
      ros: ros,
      name: "charge_params",
    });
    paramCharge.get((charge_params) => {
      console.log(charge_params);
      setcharge_params(charge_params);
     
    });
  }, []);

  if (charge_params[0] == undefined) {
    return <div></div>;
  } else {
    return (
      <div>
        <table border="3">
          <tr>
            <th>Charge Params</th>
            <th>Description</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </table>
        {content}
        {/* <tr>
          {<ParamRow ros={ros} paramName={charge_params[0]}>
            {" "}
          </ParamRow>}
        </tr>
        <tr>
          {" "}
          <ParamRow ros={ros} paramName={charge_params[1]}>
            {" "}
          </ParamRow>
        </tr>
        <tr>
          {" "}
          <ParamRow ros={ros} paramName={charge_params[2]}>
            {" "}
          </ParamRow>
        </tr> */}
      </div>
    );
  }
}

export default ParamScreen;

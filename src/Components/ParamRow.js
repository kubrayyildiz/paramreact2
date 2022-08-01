import * as ROSLIB from "roslib";
import React, { Component, useEffect, useState, useRef } from "react";
import {IconButton } from "rsuite";
import './table.css';
import {Edit}from '@rsuite/icons';
import {CheckOutline} from '@rsuite/icons';
import {CloseOutline} from '@rsuite/icons';
const ParamRow = (props) => {
  const ros = props.ros;
  var paramName = props.paramName;
  console.log(paramName);
  const [value, setvalue] = useState(0);
  const [description, setdescription] = useState(0);
  const [isEdit, setisEdit] = useState(false);
  const input = useRef(null);
  useEffect(() => {
    var paramDesc = new ROSLIB.Param({
      ros: ros,
      name: paramName + "/description",
    });
    console.log(paramDesc.name);
    paramDesc.get((value) => {
      setdescription(value);
    });
    var paramValue = new ROSLIB.Param({
      ros: ros,
      name: paramName + "/value",
    });
    console.log(paramValue.name);
    paramValue.get((value) => {
      console.log(value);
      setvalue(value);
    });
    
  }, []);
  function edit() {
    setisEdit(true);
    input.current.value = value;
  }
  function save() {
    setisEdit(false);
    setvalue(Number(input.current.value));
    var paramValue = new ROSLIB.Param({
      ros: ros,
      name: paramName + "/value",
    });
    paramValue.set(Number(input.current.value));
  }
  function cancel(){
    setisEdit(false);
    paramName.set(Number(input.current.value));

  }

  return (
    <div>
      <table className="table2" border="3">
        <tr>
          <td><p>{paramName}</p></td>
          <td><p>{description}</p></td>
          {!isEdit && <td><p>{value}</p></td>}
            {isEdit && (
              <td>
                {" "}
                <input ref={input} type="text" name={value} placeholder={value} />
              </td>
            )}

            {!isEdit && (
              <td >
                <IconButton id="a" icon={<Edit/>} onClick={edit} ></IconButton>
              </td>
            )}
            {isEdit && (
              <td >
                <IconButton id="a" icon={<CheckOutline/>} onClick={save}></IconButton>
                <IconButton id="a" icon={<CloseOutline/>} onClick={cancel}></IconButton>

              </td>
              
            )}
        </tr>
      </table>
    </div>
  );
};

export default ParamRow;

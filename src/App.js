import React, { useEffect, useState } from "react";
import WebSocketClient from "./js/ws/WebSocketClient"; //websoket
import { observer } from "mobx-react"; //observer
import { toJS } from "mobx"; //observer tojs
import RangeSlider from "react-bootstrap-range-slider"; //slider
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css"; //slider
import Form from "react-bootstrap/Form"; //slider
import "./App.css";

const wsc = new WebSocketClient(null, 8700, "/ws", 100);
const sender_id = 460;

function App() {
  const [graphData, setGraphData] = useState();
  const [onbDataArr, setOnbDataArr] = useState([]);
  const [gfcDataArr, setgfcDataArr] = useState([]);

  // send_cmd
  const send_cmd = (target, cmd, group, check) => {
    let obj = {};
    obj["target"] = target; // bw0.1
    obj["cmd"] = cmd; // f1
    obj["group"] = group;
    obj["sender"] = sender_id;
    obj["data"] = check;

    wsc.sendMsg(JSON.stringify(obj));
  };

  // swich init data
  const DataObserver = observer(({ store }) => {
    let d = store.getLastMsg; //2021 7 8
    //console.log('data: ', toJS(d)); //proxy tojs

    if (d && d["vehicle_type"] && d["vehicle_type"] == "bw0.1") {
      //console.log('data: ', toJS(d));
      if (d["sol_status"]) {
        if (d["sol_status"]["onb"]) {
          setOnbDataArr(d["sol_status"]["onb"]);
        }
        if (d["sol_status"]["gfc"]) {
          setgfcDataArr(d["sol_status"]["gfc"]);
        }
        // if (d["graph"]) {
        //   setGraphData(d);
        // }
      }
    }

    return <></>; //옵저버 리턴 필요
  });

  //slider
  const [fin, setfin] = useState({
    finA: 50,
    finB: 50,
    finC: 50,
    finD: 50,
    finE: 50,
    finF: 50,
    finG: 50,
    finH: 50,
    finI: 50,
    finJ: 50,
    finK: 50,
    finL: 50,
    finO: 50,
    finP: 50,
    finQ: 50,
    finR: 50,
  });

  useEffect(() => {
    if (fin.finA !== 50) {
      send_cmd("bw0.1", "fina", "onb", fin.finA);
    } else if (fin.finB !== 50) {
      send_cmd("bw0.1", "finb", "onb", fin.finB);
    } else if (fin.finC !== 50) {
      send_cmd("bw0.1", "finc", "onb", fin.finC);
    } else if (fin.finD !== 50) {
      send_cmd("bw0.1", "find", "onb", fin.finD);
    } else if (fin.finE !== 50) {
      send_cmd("bw0.1", "fine", "onb", fin.finE);
    } else if (fin.finF !== 50) {
      send_cmd("bw0.1", "finf", "onb", fin.finF);
    } else if (fin.finG !== 50) {
      send_cmd("bw0.1", "fing", "onb", fin.finG);
    } else if (fin.finH !== 50) {
      send_cmd("bw0.1", "finh", "onb", fin.finH);
    } else if (fin.finI !== 50) {
      send_cmd("bw0.1", "fini", "onb", fin.finI);
    } else if (fin.finJ !== 50) {
      send_cmd("bw0.1", "finj", "onb", fin.finJ);
    } else if (fin.finK !== 50) {
      send_cmd("bw0.1", "fink", "onb", fin.finK);
    } else if (fin.finL !== 50) {
      send_cmd("bw0.1", "finl", "onb", fin.finL);
    } else if (fin.finO !== 50) {
      send_cmd("bw0.1", "fino", "onb", fin.finO);
    } else if (fin.finP !== 50) {
      send_cmd("bw0.1", "finp", "onb", fin.finP);
    } else if (fin.finQ !== 50) {
      send_cmd("bw0.1", "finq", "onb", fin.finQ);
    } else if (fin.finR !== 50) {
      send_cmd("bw0.1", "finr", "onb", fin.finR);
    }
  }, [
    fin.finA,
    fin.finB,
    fin.finC,
    fin.finD,
    fin.finE,
    fin.finF,
    fin.finG,
    fin.finH,
    fin.finI,
    fin.finJ,
    fin.finK,
    fin.finL,
    fin.finO,
    fin.finP,
    fin.finQ,
    fin.finR,
  ]);

  //ad observer1
  const ADObserver1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad5"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad_1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad_2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="20%" className="title1">
              1
            </th>
            <th width="20%" className="title1">
              2
            </th>
            <th width="20%" className="title1">
              3
            </th>
            <th width="20%" className="title1">
              4
            </th>
            <th width="20%" className="title1">
              5
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ext observer1
  const EXTObserver1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ext1"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //input observer1
  const InputObserver1 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["i1"].toFixed(1)} %</td>
              <td width="12.5%">{m[idx][group][0]["i2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ad observer2
  const ADObserver2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad5"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad_1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad_2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="20%" className="title1">
              1
            </th>
            <th width="20%" className="title1">
              2
            </th>
            <th width="20%" className="title1">
              3
            </th>
            <th width="20%" className="title1">
              4
            </th>
            <th width="20%" className="title1">
              5
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ext observer2
  const EXTObserver2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ext1"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //input observer2
  const InputObserver2 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["i1"].toFixed(1)} %</td>
              <td width="12.5%">{m[idx][group][0]["i2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ad observer3
  const ADObserver3 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad5"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad_1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad_2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="20%" className="title1">
              1
            </th>
            <th width="20%" className="title1">
              2
            </th>
            <th width="20%" className="title1">
              3
            </th>
            <th width="20%" className="title1">
              4
            </th>
            <th width="20%" className="title1">
              5
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ext observer3
  const EXTObserver3 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ext1"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //input observer3
  const InputObserver3 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["i1"].toFixed(1)} %</td>
              <td width="12.5%">{m[idx][group][0]["i2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ad observer4
  const ADObserver4 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad5"].toFixed(1)} </td>
            </tr>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ad_1"].toFixed(1)} %</td>
              <td width="20%">{m[idx][group][0]["ad_2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ad_5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="20%" className="title1">
              1
            </th>
            <th width="20%" className="title1">
              2
            </th>
            <th width="20%" className="title1">
              3
            </th>
            <th width="20%" className="title1">
              4
            </th>
            <th width="20%" className="title1">
              5
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //ext observer4
  const EXTObserver4 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="20%">{m[idx][group][0]["ext1"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext2"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext3"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext4"].toFixed(1)} </td>
              <td width="20%">{m[idx][group][0]["ext5"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead></thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //input observer4
  const InputObserver4 = observer(({ store, group }) => {
    let msg = Array();
    let m = store.getAllMsg;
    let len = store.getBuffLen;

    const da = toJS(m[0]);
    console.log("-----1 1 1---------", len);
    console.log("-----1 1 2---------", group);
    console.log(da);
    if (!(group in m)) {
      console.log(">>>>>>>>>>> TOP EM >>>>>>>>>>>>>");
    }

    for (let i = 0; i < 1; i++) {
      let idx = len - 1 + i * -1;
      if (idx < 0) {
        msg.push(
          <>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </>
        );
      } else {
        msg.push(
          <>
            <tr width="100%">
              <td width="12.5%">{m[idx][group][0]["i1"].toFixed(1)} %</td>
              <td width="12.5%">{m[idx][group][0]["i2"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
              <td width="12.5%">{m[idx][group][0]["d4"].toFixed(1)} </td>
            </tr>
          </>
        );
      }
    }
    return (
      <table>
        <thead>
          <tr width="100%">
            <th width="12.5%" className="title1">
              1
            </th>
            <th width="12.5%" className="title1">
              2
            </th>
            <th width="12.5%" className="title1">
              3
            </th>
            <th width="12.5%" className="title1">
              4
            </th>
            <th width="12.5%" className="title1">
              5
            </th>
            <th width="12.5%" className="title1">
              6
            </th>
            <th width="12.5%" className="title1">
              7
            </th>
            <th width="12.5%" className="title1">
              8
            </th>
          </tr>
        </thead>
        <tbody width="100%">{msg}</tbody>
        <tfoot></tfoot>
      </table>
    );
  });

  //time
  const now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  setInterval(updateTime, 1000);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="inner_wrapper1">
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "1", //group
                            "S1", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "2",
                            "S2",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "3",
                            "S3",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "4",
                            "S4",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "5",
                            "S5",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "6",
                            "S6",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "7",
                            "S7",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "8",
                            "S8",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 slider_wrap">
              <div className="box_title">pwm</div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    //step={10}
                    value={fin.finA}
                    onChange={(e) => setfin({ ...fin, finA: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finA} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finB}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finB: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finB} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finC}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finC: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finC} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finD}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finD: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finD} readOnly />
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver1 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">ext</div>
              <EXTObserver1 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">input</div>
              <InputObserver1 store={wsc.store} group="1" />
            </div>
          </div>
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "1", //group
                            "S1", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "2",
                            "S2",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "3",
                            "S3",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "4",
                            "S4",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "5",
                            "S5",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "6",
                            "S6",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "7",
                            "S7",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "8",
                            "S8",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 slider_wrap">
              <div className="box_title">pwm</div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    //step={10}
                    value={fin.finE}
                    onChange={(e) => setfin({ ...fin, finE: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finE} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finF}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finF: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finF} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finG}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finG: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finG} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finH}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finH: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finH} readOnly />
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver2 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">ext</div>
              <EXTObserver2 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">input</div>
              <InputObserver2 store={wsc.store} group="1" />
            </div>
          </div>
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "1", //group
                            "S1", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "2",
                            "S2",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "3",
                            "S3",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "4",
                            "S4",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "5",
                            "S5",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "6",
                            "S6",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "7",
                            "S7",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "8",
                            "S8",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 slider_wrap">
              <div className="box_title">pwm</div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    //step={10}
                    value={fin.finI}
                    onChange={(e) => setfin({ ...fin, finI: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finI} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finJ}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finJ: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finJ} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finK}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finK: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finK} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finL}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finL: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finL} readOnly />
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver3 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">ext</div>
              <EXTObserver3 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">input</div>
              <InputObserver3 store={wsc.store} group="1" />
            </div>
          </div>
          <div className="col">
            <div className="col1 swich_wrap">
              <div className="box_title">sol i/o</div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target", //target
                            "1", //group
                            "S1", //cmd
                            e.target.checked == true ? 0 : 1 //data
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S1</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S1</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "2",
                            "S2",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S2</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S2</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "3",
                            "S3",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S3</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S3</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "4",
                            "S4",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S4</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S4</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[0] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "5",
                            "S5",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S5</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S5</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "6",
                            "S6",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S6</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S6</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap margin_right">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[1] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "7",
                            "S7",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S7</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S7</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="btn_wrap">
                  <div className="swich_btn">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="default"
                        defaultChecked={onbDataArr[2] === 1 ? false : true}
                        onChange={(e) =>
                          send_cmd(
                            "target",
                            "8",
                            "S8",
                            e.target.checked == true ? 0 : 1
                          )
                        }
                      />
                      <span className="swich_text">
                        <div className="text_wrap">
                          <p className="text_on">S8</p>
                        </div>
                        <div className="text_wrap">
                          <p className="text_off">S8</p>
                        </div>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col1 slider_wrap">
              <div className="box_title">pwm</div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    //step={10}
                    value={fin.finO}
                    onChange={(e) => setfin({ ...fin, finO: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finO} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finP}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finP: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finP} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finQ}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finQ: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finQ} readOnly />
                </div>
              </div>
              <div className="slider_box">
                <div className="slider_bar">
                  <RangeSlider
                    value={fin.finR}
                    //step={10}
                    onChange={(e) => setfin({ ...fin, finR: e.target.value })}
                    variant="secondary"
                    readOnly
                  />
                </div>
                <div className="slider_num">
                  <Form.Control value={fin.finR} readOnly />
                </div>
              </div>
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">a/d</div>
              <ADObserver4 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">ext</div>
              <EXTObserver4 store={wsc.store} group="1" />
            </div>
            <div className="col1 ad_table_wrap">
              <div className="box_title">input</div>
              <InputObserver4 store={wsc.store} group="1" />
            </div>
          </div>
        </div>
        <div className="inner_wrapper2">
          <div className="status-bar-name">
            <label>title</label>
          </div>
          <div className="status-bar-timer">{time}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

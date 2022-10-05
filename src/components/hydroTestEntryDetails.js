import React, { useState, useEffect } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { saveHydroTestMaster } from "../network/server";

export const HydroTestEntryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pressureReq, setPressureReq] = useState("");
  const [pressureActual, setPressureActual] = useState("");
  const [holdingTime, setHoldingTime] = useState("");
  const [pressureGaugeId, setPressureGaugeId] = useState("");
  const [PCalibrationDate, setPCalibrationDate] = useState("");
  const [PCalibrationDueDate, setPCalibrationDueDate] = useState("");
  const [chartRecorderId, setChartRecorderId] = useState("");
  const [CCalibrationDate, setCCalibrationDate] = useState("");
  const [CCalibrationDueDate, setCCalibrationDueDate] = useState("");
  const [pipeId, setPipeId] = useState("");
  const [heatNo, setHeatNo] = useState("");
  const [result, setResult] = useState("");
  const [tableData, setTableData] = useState([]);

  const columns = [
    {
      headerAlign: "center",
      dataField: "pipeId",
      text: "PIPE ID",
      headerStyle: (colum, colIndex) => {
        return { width: "10%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
        fontWeight: "bold",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "heatNumber",
      text: "HEAT #",
      headerStyle: (colum, colIndex) => {
        return { width: "9%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "result",
      text: "RESULT",
      headerStyle: (colum, colIndex) => {
        return { width: "7%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
  ];

  function addArrayelements(data) {
    setTableData((tableData) => [data, ...tableData]);
    setPipeId("");
    setHeatNo("");
    setResult("Select");
  }

  const saveProductionDetails = async (data) => {
    let res = await saveHydroTestMaster(data);
    if (res.code === 404) {
      alert(
        "Someting went wrong while uploading data, Please contact your Application Developer"
      );
    } else if (res.code === 414) {
      alert(
        "Cannot enter duplicate Pipe ID, Please check the data you already entered!!"
      );
    } else if (res.code === 200) {
      alert("Data Save Successfully!!");
      navigate(-1);
    } else {
      alert("Something went wrong, Please contact your IT TEAM");
    }
  };

  return (
    <div>
      <div style={{ marginLeft: "20px" }}>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "red",
            textDecoration: "underline",
          }}
        >
          ORDER DETAILS:
        </label>
      </div>
      <div
        style={{
          marginLeft: "20px",
          marginBottom: "5px",
        }}
      >
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "red",
          }}
        >
          SO#:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {location.state.soNum}
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "20PX",
            color: "red",
          }}
        >
          CUSTOMER:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {location.state.customer}
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "20PX",
            color: "red",
          }}
        >
          PO#:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {location.state.poNum}
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "20px",
            color: "red",
          }}
        >
          PO DATE:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {moment(location.state.poDate).format("MM-DD-YYYY")}
        </label>
      </div>

      <div style={{ marginLeft: "20px" }}>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "red",
            textDecoration: "underline",
          }}
        >
          ITEM DETAILS:
        </label>
      </div>
      <div
        style={{
          marginLeft: "20px",
          marginBottom: "5px",
        }}
      >
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "red",
          }}
        >
          OD DIA:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {location.state.odDia} inch
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "20PX",
            color: "red",
          }}
        >
          THICKNESS:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {location.state.thickness} inch
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "20PX",
            color: "red",
          }}
        >
          POUND/FT:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {location.state.ppf}
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "20px",
            color: "red",
          }}
        >
          THREAD CONNECTION:
        </label>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "",
          }}
        >
          {location.state.tcType}
        </label>
      </div>

      <div style={{ marginLeft: "1.5%", marginBottom: "0.5%" }}>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Pressure Req(psi):
        </label>
        <input
          type={"number"}
          onChange={(e) => {
            setPressureReq(e.target.value);
          }}
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "5%",
            marginRight: "1%",
            paddingLeft: "0.5%",
          }}
        ></input>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Pressure Actual(psi):
        </label>
        <input
          type={"number"}
          onChange={(e) => {
            setPressureActual(e.target.value);
          }}
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "5%",
            marginRight: "1%",
            paddingLeft: "0.5%",
          }}
        ></input>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Holding Time:
        </label>
        <input
          type={"number"}
          onChange={(e) => {
            setHoldingTime(e.target.value);
          }}
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "5%",
            paddingLeft: "0.5%",
          }}
        ></input>
      </div>

      <div style={{ marginLeft: "1.5%", marginBottom: "0.5%" }}>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Pressure Gauge ID:
        </label>
        <input
          onChange={(e) => {
            setPressureGaugeId(e.target.value);
          }}
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "10%",
            marginRight: "1%",
            paddingLeft: "0.5%",
          }}
        ></input>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Calibration Date:
        </label>
        <input
          onChange={(e) => {
            setPCalibrationDate(e.target.value);
          }}
          type="date"
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "10%",
            marginRight: "1%",
          }}
        ></input>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Calibration Due Date:
        </label>
        <input
          onChange={(e) => {
            setPCalibrationDueDate(e.target.value);
          }}
          type="date"
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "10%",
          }}
        ></input>
      </div>
      <div style={{ marginLeft: "1.5%" }}>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Chart Recorder ID:
        </label>
        <input
          onChange={(e) => {
            setChartRecorderId(e.target.value);
          }}
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "10%",
            marginRight: "1%",
            paddingLeft: "0.5%",
          }}
        ></input>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Calibration Date:
        </label>
        <input
          onChange={(e) => {
            setCCalibrationDate(e.target.value);
          }}
          type="date"
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "10%",
            marginRight: "1%",
          }}
        ></input>
        <label
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Calibration Due Date:
        </label>
        <input
          onChange={(e) => {
            setCCalibrationDueDate(e.target.value);
          }}
          type="date"
          style={{
            fontFamily: "monospace",
            color: "black",
            fontWeight: "bold",
            borderRadius: "7px",
            width: "10%",
          }}
        ></input>
      </div>
      <label
        style={{
          fontFamily: "monospace",
          fontWeight: "bold",
          fontColor: "black",
          marginLeft: "20px",
          marginTop: "15px",
          textDecoration: "underline",
        }}
      >
        INPUT TEST RESULTS:
      </label>
      <div
        style={{
          marginLeft: "1%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "7%",
          }}
        >
          <label
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "black",
              marginRight: "1%",
              textAlign: "center",
            }}
          >
            PIPE#
          </label>
          <input
            onChange={(e) => {
              setPipeId(e.target.value);
            }}
            type={"number"}
            value={pipeId}
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "black",
              marginRight: "1%",
              borderRadius: "10px",
              paddingLeft: "15px",
              width: "100%",
            }}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "10%",
            marginLeft: "1%",
          }}
        >
          <label
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "black",
              marginRight: "1%",
              textAlign: "center",
            }}
          >
            HEAT#
          </label>
          <input
            onChange={(e) => {
              setHeatNo(e.target.value);
            }}
            value={heatNo}
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "black",
              marginRight: "1%",
              borderRadius: "10px",
              paddingLeft: "15px",
              width: "100%",
            }}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "10%",
            marginLeft: "1%",
          }}
        >
          <label
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "black",
              marginRight: "1%",
              textAlign: "center",
            }}
          >
            RESULT
          </label>
          <select
            value={result}
            style={{
              height: "30px",
              borderRadius: "5px",
              width: "150px",
              borderWidth: "2px",
              borderColor: "black",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
            id="result"
            onChange={(e) => {
              setResult(e.target.value);
            }}
          >
            <option value="Select">SELECT</option>
            <option value="PASS">PASS</option>
            <option value="FAIL">FAIL</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "3%",
            width: "8%",
            marginTop: "1.7%",
          }}
        >
          <button
            onClick={() => {
              if (result === "Select" || pipeId === "" || heatNo === "") {
                alert("Please select PipeID, Heat, Result");
              } else {
                let data = {
                  pipeId: pipeId,
                  heatNumber: heatNo,
                  result: result,
                };
                var checker;
                for (let i = 0; i < tableData.length; i++) {
                  if (data.pipeId === tableData[i].pipeId) {
                    checker = true;
                    break;
                  }
                }
                if (checker) {
                  alert("Duplicate PipeId cannot be entered!!");
                } else {
                  addArrayelements(data);
                }
              }
            }}
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "white",
              borderRadius: "10px",
              width: "40%",
              backgroundColor: "darkslateblue",
              borderColor: "darkslateblue",
            }}
          >
            ADD
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            marginTop: "1.7%",
          }}
        >
          <button
            onClick={() => {
              let data = {
                soNumber: location.state.soNum,
                pressureRequired: pressureReq,
                pressureActual: pressureActual,
                holdingTime: holdingTime,
                pressureGaugeId: pressureGaugeId,
                PCalibrationDate: PCalibrationDate,
                PCalibrationDueDate: PCalibrationDueDate,
                chartRecorderId: chartRecorderId,
                CCalibrationDate: CCalibrationDate,
                CCalibrationDueDate: CCalibrationDueDate,
                UserEnt: "harshithv",
                tableData: tableData,
              };
              saveProductionDetails(data);
            }}
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              color: "white",
              width: "25%",
              borderRadius: "10px",
              backgroundColor: "red",
              borderColor: "red",
            }}
          >
            SAVE PRODUCTION
          </button>
        </div>
      </div>
      <div
        style={{
          width: "40%",
          marginLeft: "1%",
          marginTop: "1%",
        }}
      >
        <BootstrapTable
          keyField="pipeId"
          data={tableData}
          columns={columns}
          striped
          hover
          condensed
        />
      </div>
    </div>
  );
};

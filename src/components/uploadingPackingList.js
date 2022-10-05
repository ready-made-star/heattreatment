import React, { useState, useEffect } from "react";
import { Alert, Button, Modal, OffcanvasHeader } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { uploadPackingList } from "../network/server";
import * as XLSX from "xlsx";
export const UploadingPackingList = () => {
  const location = useLocation();
  const [poNum, setPoNum] = useState(location.state.poNum);
  const [soNum, setSoNum] = useState(location.state.soNum);
  const [customer, setCustomer] = useState(location.state.customer);
  const [poDate, setPoDate] = useState(location.state.poDate);
  const [odDia, setOdDia] = useState(location.state.odDia);
  const [thickness, setThickness] = useState(location.state.thickness);
  const [ppf, setPpf] = useState(location.state.ppf);
  const [tcType, setTcType] = useState(location.state.tcType);
  const [tableData, setTableData] = useState([]);
  const [reportModal, setReportModal] = useState(false);

  useEffect(() => {}, []);
  const columns = [
    {
      headerAlign: "center",
      dataField: "soNumber",
      text: "SO #",
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
      dataField: "pipeNumber",
      text: "PIPE#",
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
      text: "HEAT#",
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
      dataField: "length",
      text: "LENGTH",
      headerStyle: (colum, colIndex) => {
        return { width: "10%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",

        fontWeight: "bold",
      },
      align: "center",
    },
  ];

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const sheetname = wb.SheetNames[0];
        const ws = wb.Sheets[sheetname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setTableData(d);
      console.log(JSON.stringify(d, null, 3));
    });
  };
  var proceed = 0;
  const savePackingListToDatabase = async () => {
    let data = tableData;

    for (let i = 0; i < data.length; i++) {
      if (data[i].soNumber !== soNum) {
        proceed = 1;
        alert("Uploaded SO number is not matching, please check.");
      }
      break;
    }

    console.log("helloooo");
    if (proceed === 0) {
      console.log("helloooooooo");
      let res = await uploadPackingList(tableData);
      console.log(JSON.stringify(res, null, 2));
      if (res.code === 404 && res.recordSet.number === 2627) {
        alert(
          "Error, Duplicate Pipe ID not allowed, Please check the uploaded excel sheet"
        );
      } else if (res.code === 404) {
        alert(
          "Error, Something went wrong uploading data, Please contact administrator"
        );
      } else if (res.code === 200) {
        alert("Success, Data uploaded successfully!!!");
        window.location.reload(false);
      }
    }
  };

  return (
    <div style={{}}>
      <div style={{ marginLeft: "20px" }}>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "red",
          }}
        >
          ORDER DETAILS
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
          {soNum}
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
          {customer}
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
          {poNum}
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
          {moment(poDate).format("MM-DD-YYYY")}
        </label>
      </div>

      <div style={{ marginLeft: "20px" }}>
        <label
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            marginLeft: "",
            color: "red",
          }}
        >
          ITEM DETAILS
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
          {odDia} inch
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
          {thickness} inch
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
          {ppf}
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
          {tcType}
        </label>
      </div>
      <div
        style={{
          margin: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: "coral",
            borderColor: "coral",
            borderRadius: "5px",
            fontWeight: "bold",
            marginLeft: "1%",
            fontFamily: "monospace",
          }}
        >
          <input
            style={{
              color: "black",
              marginLeft: "1%",
            }}
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
        </button>

        <button
          style={{
            backgroundColor: "coral",
            borderColor: "coral",
            borderRadius: "5px",
            fontWeight: "bold",
            marginLeft: "1%",
            fontFamily: "monospace",
          }}
          onClick={() => {
            savePackingListToDatabase();
          }}
        >
          Validate & Upload
        </button>
      </div>
      <div
        style={{
          width: "60%",
          marginLeft: "1%",
          margin: "10px",
        }}
      >
        <BootstrapTable
          keyField="sno"
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

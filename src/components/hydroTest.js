import React, { useState, useEffect } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  getSummaryHydroTestDetails,
  getTestDetailsByActivityDate,
  getTestMasterByActivityDate,
} from "../network/server";
import { desktopPdf } from "./hydroTestPdf";

export const HydroTest = () => {
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
  const [selectedRow, setSelectedRow] = useState("");
  const [reportModal, setReportModal] = useState(false);
  useEffect(() => {
    getAllSummaryDetailsForSoNumber();
  }, []);

  const getAllSummaryDetailsForSoNumber = async () => {
    let res = await getSummaryHydroTestDetails(soNum);
    if (res.code === 200) {
      console.log(res);
      let data = res.recordSet.recordset;
      if (data.length < 1) {
        return "";
      } else {
        for (let i = 0; i < data.length; i++) {
          data[i].sno = i;
        }
        setTableData(data);
      }
    } else {
      alert("Something went wrong, Please contact IT Department");
    }
  };

  const getViewReportDetails = async () => {
    let activityDate = moment(selectedRow).add(1, "day").format("MM-DD-YYYY");
    let res = await getTestDetailsByActivityDate(soNum, activityDate);
    if (res.code === 200 && res.recordSet.length > 0) {
      console.log(JSON.stringify(location.state));
      let masterRes = await getTestMasterByActivityDate(soNum, activityDate);
      if (masterRes.code === 200 && masterRes.recordSet.length === 1) {
        desktopPdf(res.recordSet, masterRes.recordSet, location.state, "view");
      }
    } else {
      alert(
        "Something went wrong while downloading data, Please contact Network Administrator if problem persists. "
      );
    }
  };

  const getDownloadReportDetails = async () => {
    let activityDate = moment(selectedRow).add(1, "day").format("MM-DD-YYYY");
    let res = await getTestDetailsByActivityDate(soNum, activityDate);
    if (res.code === 200 && res.recordSet.length > 0) {
      console.log(JSON.stringify(location.state));
      let masterRes = await getTestMasterByActivityDate(soNum, activityDate);
      if (masterRes.code === 200 && masterRes.recordSet.length === 1) {
        desktopPdf(
          res.recordSet,
          masterRes.recordSet,
          location.state,
          "download"
        );
      }
    } else {
      alert(
        "Something went wrong while downloading data, Please contact Network Administrator if problem persists. "
      );
    }
  };

  const columns = [
    {
      headerAlign: "center",
      dataField: "activityDate",
      text: "ACTIVITY DATE",
      headerStyle: (colum, colIndex) => {
        return { width: "32%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",

        fontWeight: "bold",
      },
      align: "center",
      formatter: (e) => {
        return moment(e).add(1, "day").format("MM-DD-YYYY");
      },
    },
    {
      headerAlign: "center",
      dataField: "pcsTested",
      text: "PIECES TESTED",
      headerStyle: (colum, colIndex) => {
        return { width: "32%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "viewReport",
      text: "VIEW REPORT",
      headerStyle: (colum, colIndex) => {
        return {
          width: "32%",
          fontFamily: "monospace",
          color: "navy",
          alignItems: "center",
        };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
      formatter: () => {
        return (
          <Button
            style={{
              height: "30px",
              justifyContent: "center",
              display: "flex",
            }}
            onClick={() => {
              setReportModal(true);
            }}
          >
            VIEW REPORT
          </Button>
        );
      },
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => {
      setSelectedRow(row.activityDate);
    },
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
        VIEW TEST RESULTS:
      </label>
      <div
        style={{
          width: "50%",
          marginLeft: "1%",
        }}
      >
        <BootstrapTable
          keyField="sno"
          data={tableData}
          columns={columns}
          striped
          hover
          condensed
          selectRow={selectRow}
        />
      </div>
      <Modal
        show={reportModal}
        onHide={() => {
          setReportModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "monospace" }}>
            VIEW/DOWNLOAD REPORT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div style={{ justifyItems: "center", marginTop: "4%" }}>
              <Button
                style={{
                  marginLeft: "3%",
                  width: "40%",
                  backgroundColor: "lightgreen",
                  borderColor: "lightgreen",
                  color: "black",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
                variant="secondary"
                onClick={() => {
                  getViewReportDetails();
                }}
              >
                VIEW
              </Button>
              <Button
                style={{
                  marginLeft: "12%",
                  width: "40%",
                  backgroundColor: "lightgreen",
                  borderColor: "lightgreen",
                  color: "black",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                }}
                variant="secondary"
                onClick={() => {
                  getDownloadReportDetails();
                }}
              >
                DOWNLOAD
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "red",
              borderColor: "red",
              color: "white",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
            variant="secondary"
            onClick={() => {
              setReportModal(false);
            }}
          >
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

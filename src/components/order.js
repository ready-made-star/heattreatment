import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button } from "react-bootstrap";
import { useLocation, useHistory, Link } from "react-router-dom";
import { saveOrderDetails, getAllSalesOrderDetails } from "../network/server";
import ReactLoading from "react-loading";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import moment from "moment";

export const Order = () => {
  const [orderModal, setOrderModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [soNumber, setSoNumber] = useState("");
  const [grade, setGrade] = useState("");
  const [outsideDiameter, setOutsideDiameter] = useState("");
  const [thickness, setThickness] = useState("");
  const [poDate, setPoDate] = useState("");
  const [productComments, setProductComments] = useState("");
  const [threadConnection, setThreadConnection] = useState("");
  const [poundPerFt, setPoundPerFt] = useState("");
  const [nominalLength, setNominalLength] = useState(0);
  const [qtyInPcs, setQtyInPcs] = useState(0);
  const [qtyInFt, setQtyInFt] = useState(0);
  const [workOrderToggle, setWorkOrderToggle] = useState(false);
  const [orderArray, setOrderArray] = useState([]);
  const [selectedOrderRow, setSelectedOrderRow] = useState([]);
  const [testModal, setTestModal] = useState(false);
  // const [finishStatus, setfinishStatus] = useState(false);

  useEffect(() => {
    getAllOrderDetails();
  }, []);

  const columns = [
    {
      headerAlign: "center",
      dataField: "SO_number",
      text: "SO#",
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
      dataField: "CustomerName",
      text: "Customer",
      headerStyle: (colum, colIndex) => {
        return { width: "14%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "PO_number",
      text: "PO#",
      headerStyle: (colum, colIndex) => {
        return { width: "10%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "PO_date",
      text: "PO Date",
      headerStyle: (colum, colIndex) => {
        return { width: "6%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      formatter: (e) => {
        return moment(e).format("MM-DD-YYYY");
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "OdDia",
      text: "OD(In)",
      headerStyle: (colum, colIndex) => {
        return { fontFamily: "monospace", color: "navy", width: "4%" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "Thickness",
      text: "Thick(In)",
      headerStyle: (colum, colIndex) => {
        return { width: "5%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "PoundPerFt",
      text: "PPF",
      headerStyle: (colum, colIndex) => {
        return { width: "5%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "Grade",
      text: "Grade",
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
      dataField: "QtyInFt",
      text: "Total Footage",
      headerStyle: (colum, colIndex) => {
        return { width: "7%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "QtyInPcs",
      text: "Total pieces",
      headerStyle: (colum, colIndex) => {
        return { width: "7%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "NominalLength",
      text: "Nominal Length",
      headerStyle: (colum, colIndex) => {
        return { width: "7%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "DateEnt",
      text: "Date",
      headerStyle: (colum, colIndex) => {
        return { width: "7%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      formatter: (e) => {
        return moment(e).format("MM-DD-YYYY");
      },
      align: "center",
    },
    {
      headerAlign: "center",
      dataField: "UserEnt",
      text: "User Entered",
      headerStyle: (colum, colIndex) => {
        return { width: "7%", fontFamily: "monospace", color: "navy" };
      },
      style: {
        fontFamily: "monospace",
      },
      align: "center",
    },
  ];

  const getAllOrderDetails = async () => {
    try {
      let res = await getAllSalesOrderDetails();
      if (res.code === 200) {
        setOrderArray(res.recordSet);
      } else {
        alert(
          "Something went wrong while fetching data (getAllOrderDetails API), Please contact admin "
        );
      }
      console.log(res);
    } catch (error) {
      alert("Something went wrong with getAllOrderDetails function");
    }
  };

  const saveSOOrderDetails = async (data) => {
    setWorkOrderToggle(true);
    try {
      let res = await saveOrderDetails(data);
      if (res.code === 200) {
        setOrderModal(false);
        setCustomerName("");
        setPoNumber("");
        setSoNumber("");
        setGrade("");
        setOutsideDiameter("");
        setThickness("");
        setPoDate("");
        setProductComments("");
        setThreadConnection("");
        setPoundPerFt("");
        setNominalLength(0);
        setQtyInPcs(0);
        setQtyInFt(0);
        setWorkOrderToggle(false);
        alert("Word Order saved!!");
        getAllOrderDetails();
      } else {
        if (res.result.number === 2627) {
          alert(
            "There is an existing Work Order under this so number, Please verify. If problem still persists, please call IT."
          );
          setWorkOrderToggle(false);
        } else {
          alert("Something went wrong, Please contact IT Admin");
          setWorkOrderToggle(false);
        }
      }
    } catch (error) {
      alert("Something went wrong, Please contact Admin.");
      setWorkOrderToggle(false);
    }
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row) => {
      setSelectedOrderRow(row);
      console.table(selectedOrderRow);
    },
  };
  return (
    <>
      <div>
        <div
          style={{
            margin: "10px",
          }}
        >
          <button
            onClick={() => {
              setOrderModal(true);
            }}
            style={{
              backgroundColor: "coral",
              borderColor: "coral",
              borderRadius: "5px",
              fontWeight: "bold",
              marginLeft: "1%",
              fontFamily: "monospace",
            }}
          >
            CREATE ORDER
          </button>
          <button
            onClick={() => {
              // setTestModal(true);
              if (selectedOrderRow.length === 0) {
                alert("Please select an Order and click SELECT TEST");
              } else {
                setTestModal(true);
              }
            }}
            style={{
              backgroundColor: "coral",
              borderColor: "coral",
              borderRadius: "5px",
              fontWeight: "bold",
              fontFamily: "monospace",
              marginLeft: "1%",
            }}
          >
            SELECT TEST
          </button>
          <Link
            to={"/uploadPackingList"}
            state={{
              poNum: selectedOrderRow.PO_number,
              poDate: selectedOrderRow.PO_date,
              customer: selectedOrderRow.CustomerName,
              soNum: selectedOrderRow.SO_number,
              odDia: selectedOrderRow.OdDia,
              thickness: selectedOrderRow.Thickness,
              ppf: selectedOrderRow.PoundPerFt,
              tcType: selectedOrderRow.ThreadConnectionType,
            }}
            style={{
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "coral",
                borderColor: "coral",
                borderRadius: "5px",
                fontWeight: "bold",
                fontFamily: "monospace",
                marginLeft: "1%",
                height: "30px",
                color: "black",
              }}
              onClick={() => {}}
            >
              UPLOAD PACKINGLIST
            </Button>
          </Link>
        </div>
        <BootstrapTable
          keyField="SO_number"
          data={orderArray}
          columns={columns}
          striped
          hover
          condensed
          selectRow={selectRow}
        />

        <div>
          <Modal scrollable={true} size={"xl"} show={orderModal} onHide={false}>
            <Modal.Header
              closeButton
              onHide={() => {
                setOrderModal(false);
                setCustomerName("");
                setPoNumber("");
                setSoNumber("");
                setGrade("");
                setOutsideDiameter("");
                setThickness("");
                setPoDate("");
                setProductComments("");
                setThreadConnection("");
                setPoundPerFt("");
                setNominalLength(0);
                setQtyInPcs(0);
                setQtyInFt(0);
              }}
            >
              <Modal.Title>
                <label
                  style={{
                    color: "darkcyan",
                    fontFamily: "monospace",
                  }}
                >
                  CREATE ORDER
                </label>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  marginLeft: "2%",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "monospace",
                      color: "red",
                      labelDecoration: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    CUSTOMER INFORMATION:
                  </label>
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                    }}
                  >
                    CUSTOMER:
                  </label>
                  <input
                    onChange={(e) => {
                      setCustomerName(e.target.value.toUpperCase().trim());
                    }}
                    style={{
                      marginLeft: "10px",
                      height: "30px",
                      width: "250px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      fontSize: "17px",
                    }}
                  ></input>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      marginLeft: "20px",
                    }}
                  >
                    PO#
                  </label>
                  <input
                    onChange={(e) => {
                      setPoNumber(e.target.value.toUpperCase().trim());
                    }}
                    style={{
                      marginLeft: "10px",
                      height: "30px",
                      width: "150px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      fontSize: "17px",
                    }}
                  ></input>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      marginLeft: "20px",
                    }}
                  >
                    PO Date
                  </label>
                  <input
                    onChange={(e) => {
                      setPoDate(e.target.value);
                    }}
                    type="date"
                    style={{
                      marginLeft: "10px",
                      height: "30px",
                      width: "150px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                      paddingLeft: "5px",
                      fontFamily: "monospace",
                      fontSize: "17px",
                    }}
                  ></input>
                </div>
                <div
                  style={{
                    marginTop: "15px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      fontSize: "17px",

                      // marginLeft: "20px",
                    }}
                  >
                    SO#
                  </label>
                  <input
                    onChange={(e) => {
                      setSoNumber(e.target.value.toUpperCase().trim());
                    }}
                    style={{
                      marginLeft: "10px",
                      height: "30px",
                      width: "150px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                      paddingLeft: "5px",
                      fontFamily: "monospace",
                      fontSize: "17px",
                    }}
                  ></input>
                </div>
                <hr
                  style={{
                    borderTop: "3px dashed #bbb",
                    width: "750px",
                  }}
                ></hr>
                <div
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "red",
                      labelDecoration: "underline",
                    }}
                  >
                    PRODUCT INFORMATION:
                  </label>
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                    }}
                  >
                    GRADE:
                  </label>
                  <input
                    onChange={(e) => {
                      setGrade(e.target.value.toUpperCase().trim());
                    }}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "monospace",
                      paddingLeft: "10px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                    }}
                  ></input>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      marginLeft: "15px",
                    }}
                  >
                    TC TYPE:
                  </label>
                  <input
                    type={"label"}
                    onChange={(e) => {
                      setThreadConnection(e.target.value.toUpperCase().trim());
                    }}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "monospace",
                      paddingLeft: "10px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                    }}
                  ></input>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                    }}
                  >
                    OD DIA:
                  </label>
                  <input
                    type={"number"}
                    onChange={(e) => {
                      setOutsideDiameter(e.target.value);
                    }}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "monospace",
                      paddingLeft: "10px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                    }}
                  ></input>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      marginLeft: "15px",
                    }}
                  >
                    THICKNESS:
                  </label>
                  <input
                    type={"number"}
                    onChange={(e) => {
                      setThickness(e.target.value);
                    }}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "monospace",
                      paddingLeft: "10px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                    }}
                  ></input>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      marginLeft: "15px",
                    }}
                  >
                    PPF:
                  </label>
                  <label
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "darkcyan",
                      width: "100px",
                      color: "white",
                      borderRadius: "2.5px",
                      paddingLeft: "5px",
                      fontFamily: "monospace",
                    }}
                  >
                    {(outsideDiameter - thickness) * thickness * 10.69}
                  </label>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                    }}
                  >
                    QTY IN FT:
                  </label>
                  <input
                    type={"number"}
                    onChange={(e) => {
                      setQtyInFt(e.target.value.trim());
                    }}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "monospace",
                      paddingLeft: "10px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                      width: "125px",
                    }}
                  ></input>
                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      marginLeft: "15px",
                    }}
                  >
                    NOMINAL LENTH:
                  </label>
                  <input
                    type={"number"}
                    onChange={(e) => {
                      setNominalLength(e.target.value.trim());
                    }}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "monospace",
                      paddingLeft: "10px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                      width: "125px",
                    }}
                  ></input>

                  <label
                    style={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "Graylabel",
                      marginLeft: "15px",
                    }}
                  >
                    TOTAL QTY IN PCS:
                  </label>
                  <input
                    type={"number"}
                    onChange={(e) => {
                      setQtyInPcs(e.target.value);
                    }}
                    style={{
                      marginLeft: "10px",
                      fontFamily: "monospace",
                      paddingLeft: "10px",
                      borderColor: "black",
                      borderWidth: "1.5px",
                      borderRadius: "4px",
                      width: "125px",
                    }}
                  ></input>
                </div>
                <div>
                  <div
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <label
                      style={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        color: "Graylabel",
                      }}
                    >
                      COMMENTS:
                    </label>
                  </div>
                  <div>
                    <textarea
                      onChange={(e) => {
                        setProductComments(e.target.value.toUpperCase());
                      }}
                      style={{
                        height: "75px",
                        width: "350px",
                        borderColor: "black",
                        borderWidth: "1.5px",
                        borderRadius: "4px",
                        fontFamily: "monospace",
                      }}
                    ></textarea>
                  </div>
                </div>
                <div>
                  {workOrderToggle ? (
                    <ReactLoading
                      type={"spin"}
                      color={"midnightblue"}
                      height={"3.5%"}
                      width={"3.5%"}
                    />
                  ) : (
                    <button
                      onClick={() => {
                        if (
                          customerName === "" ||
                          poDate === "" ||
                          poNumber === "" ||
                          soNumber === "" ||
                          grade === "" ||
                          outsideDiameter === "" ||
                          thickness === "" ||
                          productComments === "" ||
                          threadConnection === "" ||
                          //   poundPerFt === "" ||
                          nominalLength === 0 ||
                          qtyInPcs === 0 ||
                          qtyInFt === 0
                        ) {
                          alert(
                            "All fields are mandatory, please complete and click CREATE ORDER "
                          );
                        } else {
                          let data = {
                            customerName: customerName,
                            poNumber: poNumber,
                            poDate: poDate,
                            soNumber: soNumber,
                            grade: grade,
                            tcType: threadConnection,
                            odDia: outsideDiameter,
                            thickness: thickness,
                            ppf:
                              (outsideDiameter - thickness) * thickness * 10.69,
                            qtyInFt: qtyInFt,
                            nominalLength: nominalLength,
                            qtyInPcs: qtyInPcs,
                            comments: productComments,
                            userEnt: "harshithv",
                          };

                          saveSOOrderDetails(data);
                        }
                      }}
                      style={{
                        marginTop: "20px",
                        backgroundColor: "midnightblue",
                        color: "white",
                        borderColor: "midnightblue",
                        borderRadius: "5px",
                      }}
                    >
                      CREATE ORDER
                    </button>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  setOrderModal(false);
                  setCustomerName("");
                  setPoNumber("");
                  setSoNumber("");
                  setGrade("");
                  setOutsideDiameter("");
                  setThickness("");
                  setPoDate("");
                  setProductComments("");
                  setThreadConnection("");
                  setPoundPerFt("");
                  setNominalLength(0);
                  setQtyInPcs(0);
                  setQtyInFt(0);
                }}
                // onClick={() => {
                //console.log(orde`rArray);
                // }}
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                }}
              >
                CLOSE
              </Button>
            </Modal.Footer>
          </Modal>

          {/* this model is for selecting test */}
          <Modal
            show={testModal}
            onHide={() => {
              setTestModal(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ fontFamily: "monospace" }}>
                SELECT TEST
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div style={{ justifyItems: "center" }}>
                  <Link
                    to={"/hydroTest"}
                    state={{
                      poNum: selectedOrderRow.PO_number,
                      poDate: selectedOrderRow.PO_date,
                      customer: selectedOrderRow.CustomerName,
                      soNum: selectedOrderRow.SO_number,
                      odDia: selectedOrderRow.OdDia,
                      thickness: selectedOrderRow.Thickness,
                      ppf: selectedOrderRow.PoundPerFt,
                      tcType: selectedOrderRow.ThreadConnectionType,
                      grade: selectedOrderRow.Grde,
                    }}
                  >
                    <Button
                      style={{
                        marginLeft: "3%",
                        width: "40%",
                        backgroundColor: "antiquewhite",
                        borderColor: "antiquewhite",
                        color: "black",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                      }}
                      onClick={() => {}}
                    >
                      HYDRO TEST REPORT
                    </Button>
                  </Link>
                  <Button
                    style={{
                      marginLeft: "12%",
                      width: "40%",
                      backgroundColor: "bisque",
                      borderColor: "bisque",
                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    variant="secondary"
                    onClick={() => {}}
                  >
                    DRIFT INSPECTION
                  </Button>
                </div>
              </div>
              <div>
                <div style={{ justifyItems: "center", marginTop: "4%" }}>
                  <Button
                    style={{
                      marginLeft: "3%",
                      width: "40%",
                      backgroundColor: "cornflowerblue",
                      borderColor: "cornflowerblue",

                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    variant="secondary"
                    onClick={() => {}}
                  >
                    EMI & SEA
                  </Button>
                  <Button
                    style={{
                      marginLeft: "12%",
                      width: "40%",
                      backgroundColor: "darksalmon",
                      borderColor: "darksalmon",
                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    variant="secondary"
                    onClick={() => {}}
                  >
                    FULL BODY UT
                  </Button>
                </div>
              </div>
              <div>
                <div style={{ justifyItems: "center", marginTop: "4%" }}>
                  <Button
                    style={{
                      marginLeft: "3%",
                      width: "40%",
                      backgroundColor: "lightcyan",
                      borderColor: "lightcyan",
                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    variant="secondary"
                    onClick={() => {}}
                  >
                    THREADING
                  </Button>
                  <Button
                    style={{
                      marginLeft: "12%",
                      width: "40%",
                      backgroundColor: "oldlace",
                      borderColor: "floralwhite",
                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    variant="secondary"
                    onClick={() => {}}
                  >
                    BUCKON
                  </Button>
                </div>
              </div>
              <div>
                <div style={{ justifyItems: "center", marginTop: "4%" }}>
                  <Button
                    style={{
                      marginLeft: "3%",
                      width: "40%",
                      backgroundColor: "ivory",
                      borderColor: "ivory",
                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    variant="secondary"
                    onClick={() => {}}
                  >
                    VISUAL INSPECTION
                  </Button>
                  <Button
                    style={{
                      marginLeft: "12%",
                      width: "40%",
                      backgroundColor: "lightsteelblue",
                      borderColor: "lightsteelblue",
                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                    variant="secondary"
                    onClick={() => {}}
                  >
                    WEIGHING
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
                  setTestModal(false);
                }}
              >
                CLOSE
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

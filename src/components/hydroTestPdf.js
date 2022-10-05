// playground requires you to assign document definition to a variable called dd
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "./jindalLogo";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

var desktopPdf = (pipeData, masterData, testData, command) => {
  console.log("pipeData" + JSON.stringify(pipeData, null, 3));
  console.log("master" + JSON.stringify(masterData, null, 3));
  console.log("testData" + JSON.stringify(testData, null, 3));
  var emptyRow = [];

  // let data = [{ text: "1", alignment: "center" }, {}, {}, {}];

  for (let i = 0; i < pipeData.length; i++) {
    let data = [
      {
        text: i + 1,
        alignment: "center",
      },
      {
        text: pipeData[i].PipeNo,
        alignment: "center",
      },
      {
        text: pipeData[i].HeatNo,
        alignment: "center",
      },
      {
        text: pipeData[i].Result === true ? "PASS" : "FAIL",
        alignment: "center",
        color: pipeData[i].Result === true ? "#2a6127" : "red",
      },
    ];
    emptyRow.push(data);
  }

  var dd = {
    content: [
      {
        style: "tableExample",
        table: {
          widths: [60, 228, 55, 145],
          body: [
            [
              {
                image: logo,
                width: 30,
                height: 40,
                rowSpan: 3,
                alignemnt: "center",
                margin: [15, 5, 0, 0],
              },
              {
                text: "Jindal Pipe USA, Inc. \n Hydrostatic Test  Report - OCTG Line",
                alignment: "center",
                bold: "true",
                fontSize: 15,
                rowSpan: 3,
                colSpan: 2,
                margin: [0, 10, 0, 0],
              },
              "",
              { text: "Form:FM-JPU-P-OCTG-P53", alignment: "right" },
            ],
            [
              "",
              "Another one here",
              {},
              { text: "Rivision:00", alignment: "right" },
            ],
            [
              "",
              "Another one here",
              {},
              { text: "Date:03.09.2022", alignment: "right" },
            ],
            [
              {
                text: "",
                colSpan: 4,
                fillColor: "lightgray",
                border: [true, false, true, false],
              },
              "",
              "",
              "",
            ],
          ],
        },
      },
      {
        table: {
          widths: [90, 90, 90, 80, 60, 60],
          body: [
            [
              { text: "Size" },
              {
                text: testData.odDia + " in X " + testData.thickness + " in",
                colSpan: 2,
              },
              {},
              { text: "Date & Shift:" },
              {
                text: moment(masterData[0].ActivityDate).format("MM-DD-YYYY"),
                colSpan: 2,
              },
              {},
            ],
            [
              { text: "Order Number" },
              { text: masterData[0].SO_number },
              { text: "Spec & Grade" },
              { text: "", colSpan: 3 },
              {},
              {},
            ],
            [
              { text: "Hydro Test Pressure Req. (Min)" },
              { text: masterData[0].PressureRequired },
              { text: "Hydro Test Pressure Actual" },
              { text: masterData[0].PressureActual },
              { text: "Holding Time" },
              { text: masterData[0].HoldingTime },
            ],
            [
              { text: "Pressure Guage ID" },
              { text: masterData[0].PressureGuageId },
              { text: "Calibration Done On" },
              {
                text: moment(masterData[0].PCalibrationDoneOn).format(
                  "DD-MM-YYYY"
                ),
              },
              { text: "Calibration Due on" },
              {
                text: moment(masterData[0].PCalibrationDueOn).format(
                  "DD-MM-YYYY"
                ),
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: [122, 122, 122, 122],
          body: [
            [
              {
                text: "SR. NO.",
                alignment: "center",
                border: [true, false, true, true],
              },
              {
                text: "PIPE NO.",
                alignment: "center",
                border: [true, false, true, true],
              },
              {
                text: "HEAT NO.",
                alignment: "center",
                border: [true, false, true, true],
              },
              {
                text: "RESULT",
                alignment: "center",
                border: [true, false, true, true],
              },
            ],
            ...emptyRow,
            [
              { text: "Tested By: Umang Gupta", colSpan: 2 },
              {},
              { text: "Reviewed By: Umang Gupta", colSpan: 2 },
              {},
            ],
            [
              { text: "", colSpan: 2 },
              {},
              { text: "Approved By: Umang", colSpan: 2 },
              {},
            ],
          ],
        },
      },
    ],
  };
  if (command === "view") {
    pdfMake.createPdf(dd).open();
  } else {
    pdfMake
      .createPdf(dd)
      .download(
        masterData[0].SO_number + " - " + masterData[0].ActivityDate + ".pdf"
      );
  }
};

export { desktopPdf };

// [{text:'Sr. No.',colSpan:2,alignment:'center'},{},{text:'Pipe No.',colSpan:2},{},{text:'Heat No.',colSpan:2},{},{text:'result',colSpan:2},{}]

import Const from "../network/const";

var getAllSalesOrderDetails = async () => {
  try {
    console.log("Url===", Const.BASE_URL + Const.GET_SALES_ORDER_DETAILS);
    let response = await fetch(Const.BASE_URL + Const.GET_SALES_ORDER_DETAILS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      error: error,
    };
    return responseJson;
  }
};

var getTestDetailsByActivityDate = async (soNumber, activityDate) => {
  try {
    console.log(
      "Url===",
      Const.BASE_URL + Const.GET_TEST_DETAILS_BY_ACTIVITY_DATE
    );
    let response = await fetch(
      Const.BASE_URL +
        Const.GET_TEST_DETAILS_BY_ACTIVITY_DATE +
        "/" +
        soNumber +
        "/" +
        activityDate,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      error: error,
    };
    return responseJson;
  }
};

var getTestMasterByActivityDate = async (soNumber, activityDate) => {
  try {
    console.log(
      "Url===",
      Const.BASE_URL + Const.GET_TEST_MASTER_BY_ACTIVITY_DATE
    );
    let response = await fetch(
      Const.BASE_URL +
        Const.GET_TEST_MASTER_BY_ACTIVITY_DATE +
        "/" +
        soNumber +
        "/" +
        activityDate,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      error: error,
    };
    return responseJson;
  }
};

var getSummaryHydroTestDetails = async (soNumber) => {
  try {
    console.log(
      "Url===",
      Const.BASE_URL + Const.GET_SUMMARY_HYDROTEST_DETAILS + "/" + soNumber
    );
    let response = await fetch(
      Const.BASE_URL + Const.GET_SUMMARY_HYDROTEST_DETAILS + "/" + soNumber,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      error: error,
    };
    return responseJson;
  }
};

var saveOrderDetails = async function (params) {
  try {
    let response = await fetch(Const.BASE_URL + Const.SAVE_ORDER_DETAILS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    console.log("receipt save detail inside server js==", responseJson);
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      err: error,
    };
    return responseJson;
  }
};

var saveHydroTestMaster = async function (params) {
  try {
    let response = await fetch(Const.BASE_URL + Const.SAVE_HYDRO_TEST_MASTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    console.log("receipt save detail inside server js==", responseJson);
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      err: error,
    };
    return responseJson;
  }
};

var uploadPackingList = async function (params) {
  try {
    let response = await fetch(Const.BASE_URL + Const.UPLOAD_PACKING_LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    console.log("receipt save detail inside server js==", responseJson);
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      err: error,
    };
    return responseJson;
  }
};
var hitLoginApi = async function (params) {
  try {
    let response = await fetch(Const.BASE_URL + Const.LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    let responseJson = await response.json();
    console.log("receipt save detail inside server js==", responseJson);
    return responseJson;
  } catch (error) {
    let responseJson = {
      message: "Something went wrong! Try after some time. ",
      status: "false",
      err: error,
    };
    return responseJson;
  }
};

export {
  getAllSalesOrderDetails,
  saveOrderDetails,
  saveHydroTestMaster,
  getSummaryHydroTestDetails,
  uploadPackingList,
  getTestDetailsByActivityDate,
  getTestMasterByActivityDate,
  hitLoginApi,
};

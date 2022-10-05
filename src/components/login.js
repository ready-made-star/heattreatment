import React, { Component, useState } from "react";
import "./loginPage.css";
import "bootstrap/dist/css/bootstrap.css";
import { hitLoginApi } from "../network/server";
import { Button } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";

// import Header from "../header/header";
import logo from "../images/jindalbanner.png";

export const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();

  const onPressResult = async () => {
    let data = {
      userName: userName,
      passWord: passWord,
    };
    let res = await hitLoginApi(data);
    if (res.code === 200) {
      if (res.recordSet[0].loginCount === 0) {
        alert("UserName and Password combination is Wrong, Please check.");
      } else {
        localStorage.setItem("userName", userName);
        localStorage.setItem("passWord", passWord);
        navigate("/orderSummary");
      }
    }
  };

  const inputChange = (e) => {
    console.log(e.target.value);
    switch (e.target.name) {
      case "userName":
        setUserName(e.target.value);
        break;
      case "passWord":
        setPassWord(e.target.value);
        break;
      default:
        alert("Please check username and password");
    }
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <img
        style={{
          marginLeft: "10px",
          marginTop: "10px",
          float: "left",
        }}
        src={logo}
        height={75}
        width={75}
        alt="bannerImage"
      ></img>
      <p className="headerText">JINDAL PIPE USA</p>
      <div
        style={{
          position: "relative",
          left: "50%",
          transform: "translate(-9%)",
          marginTop: "5%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              color: "darkslategray",
              fontWeight: "bold",
              fontSize: "17px",
              marginTop: "5px",
              marginRight: "10px",
            }}
          >
            Username:
          </label>
          <input
            className="textInput"
            name="userName"
            onChange={inputChange}
          ></input>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label
            style={{
              color: "darkslategray",
              fontWeight: "bold",
              fontSize: "17px",
              marginTop: "5px",
              marginRight: "13px",
            }}
          >
            Password:
          </label>
          <input
            className="textInput"
            type="password"
            name="passWord"
            onChange={inputChange}
          ></input>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginLeft: "50px",
        }}
      >
        <Button
          style={{
            width: "75px",
            height: "35px",
            justifyContent: "center !important",
          }}
          onClick={onPressResult}
        >
          LOGIN
        </Button>
      </div>
    </div>
  );
};

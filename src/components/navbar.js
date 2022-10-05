import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <NavLink
          style={{ textDecoration: "none", fontWeight: "bold" }}
          to="/orderSummary"
        >
          ORDERS
        </NavLink>
        <NavLink
          style={{ textDecoration: "none", fontWeight: "bold" }}
          to="/parts"
        >
          XXXX
        </NavLink>
        <NavLink
          style={{ textDecoration: "none", fontWeight: "bold" }}
          to="/technicians"
        >
          XXXX
        </NavLink>
        <NavLink
          style={{ textDecoration: "none", fontWeight: "bold" }}
          to="/technicians"
        >
          XXXX
        </NavLink>
      </nav>
    );
  }
}

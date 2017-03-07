import * as React from "react";
import Navbar from "../components/navbar/Navbar";

interface INavbarWith {
  children: JSX.Element;
}

class NavbarWith extends React.Component<INavbarWith, any> {
  render(): JSX.Element {
    return (
      <div className="navbar-with-container">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default NavbarWith;

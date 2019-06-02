import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Loading from "../../components/UI/Loading/Loading";
import Footer from "../../components/UI/Footer/Footer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawer = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Loading />
        <Toolbar
          isAuth={this.props.isAuthenticated}
          toggleSide={this.toggleSideDrawer}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          show={this.state.showSideDrawer}
          close={this.closeSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
        <Footer />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Layout);

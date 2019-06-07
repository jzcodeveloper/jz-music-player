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
    showSideDrawer: false,
    loading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 700);
  }

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawer = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    const layout = this.state.loading ? (
      <Loading />
    ) : (
      <Aux>
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

    return layout;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Layout);

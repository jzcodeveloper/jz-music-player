import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./More.css";
import background from "../../assets/background.jpg";

import { fetchMore, fetchLoadMore } from "../../actions/moreActions";

import Spinner from "../Spinner/Spinner";

class More extends Component {
  state = {
    from: 0,
    limit: 10
  };

  componentDidMount() {
    const pathname = this.props.location.pathname.split("/");
    this.props.fetchMore(pathname[2], this.state.from, this.state.limit);
  }

  onClick = () => {
    this.setState(prevState => {
      const pathname = this.props.location.pathname.split("/");
      this.props.fetchLoadMore(
        pathname[2],
        this.state.from + this.state.limit,
        this.state.limit
      );
      return {
        from: prevState.from + prevState.limit
      };
    });
  };

  render() {
    let more = <Spinner />;

    if (!this.props.loading && this.props.more.info.length > 0) {
      const pathname = this.props.location.pathname.split("/");

      more = (
        <div className={classes.More}>
          <div>
            {this.props.more.info.map(info => (
              <figure key={info._id}>
                <img
                  src={
                    info.albumArt !== ""
                      ? "data:image/jpeg;base64," + info.albumArt
                      : background
                  }
                  alt="Album Art"
                />
                <Link
                  to={`/player/${pathname[2]}/${
                    info.title ? info.title : info._id
                  }`}
                >
                  {info.title ? info.title : info._id}
                </Link>
              </figure>
            ))}
          </div>
          {(this.state.from+this.state.limit) < this.props.more.count ? (
            <button onClick={this.onClick}>Load more...</button>
          ) : null}
        </div>
      );
    }

    return more;
  }
}

const mapStateToProps = state => {
  return {
    more: state.more.more,
    loading: state.loading.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMore: (payload, from, limit) =>
      dispatch(fetchMore(payload, from, limit)),
    fetchLoadMore: (payload, from, limit) =>
      dispatch(fetchLoadMore(payload, from, limit))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(More);

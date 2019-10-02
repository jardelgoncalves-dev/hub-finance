import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as UserActions from './store/actions/user'


export default function (ComponentPrivate) {
  class ProtectedRoute extends Component {
    componentWillMount() {
      if (!this.props.auth) {
        this.props.history.push('/')
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.history.push('/')
      }
    }

    render() {
      return (
        <ComponentPrivate {...this.props} />
      );
    }

  }

  const mapStateToProps = state => ({
    auth: state.user.isAuthenticated
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

  return  connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute) ;
}

import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { ChangeBackground } from '../../components/GlobalStyle'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import Container from '../../components/Container'
import Button from '../../components/Button'

import logo from '../../assets/logo_white.svg'
import userIcon from '../../assets/user.svg'
import not_found from '../../assets/not_found.svg'

import * as UserActions from '../../store/actions/user'


class AddExpense extends Component {

  render () {
    return (
      <div>
        <Header
          logo={logo}
          links={this.props.auth ? (
            [
              { url: '/home', name: 'Página Principal' },
            ]
          ) : (
            [
              { url: '/', name: 'Login' },
              { url: '/cadastro', name: 'Cadastro' },
            ]
          )}
          buttons={this.props.auth ? [
            <Button
              key="1"
              small
              white
              onClick={() => this.props.logout()}
            >
              Sair
            </Button>
          ] : []}
        >
          <img src={logo} alt="Logo" />
          { this.props.auth && (
            <Avatar
              image={userIcon}
              text={this.props.user.name}
            />
          )}
        </Header>
        <Container center column>
          <div style={{ marginTop: '40px' }}>
            <img src={not_found} width="300" alt="Página não encontrada" />
          </div>
        </Container>
        <ChangeBackground />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.user.isAuthenticated,
  user: state.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(AddExpense);

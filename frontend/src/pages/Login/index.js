import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Header from '../../components/Header'
import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import logo from '../../assets/logo_white.svg'

import { isEmail, isRequired } from '../../util/validator'
import * as UserActions from '../../store/actions/user'

class Login extends Component {

  state = {
    email: '',
    password: '',
    error_email: '',
    error_password: '',
    error: '',
    stop_request: false
  }

  componentDidMount () {
    this.props.logout()
  }

  handleValidateField = () => {
    this.setState({ error_email: '', error_password: '', stop_request: false })
    if (!isEmail(this.state.email)){
      this.setState({ error_email: 'Email inválido', stop_request: true })
    }
    if (!isRequired(this.state.password) ) {
      this.setState({ error_password: 'Este campo é obrigatório', stop_request: true })
    }
    if (!isRequired(this.state.email)){
      this.setState({ error_email: 'Este campo é obrigatório', stop_request: true })
    }
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async () => {
    await this.handleValidateField()
    if (!this.state.stop_request) {
      const { email, password } = this.state
      const response = await this.props.login({ email, password })
      if (response.status === 200) {
        this.setState({ error: '' })
        this.props.history.push('/home')
      } else {
        if(response.data.error && response.data.error.message) {
          this.setState({ error: response.data.error.message })
        }
      }
    }
  }


  render () {
    return (
      <div>
        <Header
          logo={logo}
          links={[
            { url: '/', name: 'Login' },
            { url: '/cadastro', name: 'Cadastro' },
          ]}
        >
          <img src={logo} alt="Logo" />
        </Header>
        <Container center column>
          <h3>Para continuar, faça login</h3>
          <div style={{
            width: '600px',
            marginTop: '16px'
          }}>
            { this.state.error.length !== 0 && <Alert danger>{ this.state.error }</Alert> }
            <Input
              placeholder="Email"
              onChange={(event) => this.handleInputChange('email', event.target.value)}
              errorMessage={this.state.error_email}
              style={{ marginBottom: '32px', marginTop: '32px' }}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(event) => this.handleInputChange('password', event.target.value)}
              errorMessage={this.state.error_password}
              style={{ marginBottom: '32px' }}
            />
            <Button onClick={this.handleSubmit}>Login</Button>
          </div>
        </Container>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.user.isAuthenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);


export default  connect(mapStateToProps, mapDispatchToProps)(Login) ;

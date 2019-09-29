import React, { Component } from 'react';

import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import Container from '../../components/Container'
import Input from '../../components/Input'
import Button from '../../components/Button'
import logo from '../../assets/logo_white.svg'
import userIcon from '../../assets/user.svg'

class Login extends Component {
  render () {
    return (
      <div>
        <Header
          logo={logo}
          links={[
            { url: '/', name: 'Login' },
            { url: '/', name: 'Cadastro' },
          ]}
          buttons={[<Button key="1" small white>Sair</Button>]}
        >
          <img src={logo} alt="Logo" />
          <Avatar
            image={userIcon}
            text="Jardel Gonçalves"
          />
        </Header>
        <Container center column>
          <h3>Para continuar, faça login</h3>
          <div style={{
            width: '600px',
            marginTop: '16px'
          }}>
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Button>Login</Button>
          </div>
        </Container>
      </div>
    )
  }
}

export default Login;

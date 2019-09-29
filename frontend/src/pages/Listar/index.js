import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import "../../components/react-datepicker/dist/react-datepicker.css"

import { ChangeBackground } from '../../components/GlobalStyle'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import Container from '../../components/Container'
import Button from '../../components/Button'
import Row from '../../components/Row'
import { CardExpense } from '../../components/Card'


import logo from '../../assets/logo_white.svg'
import userIcon from '../../assets/user.svg'


class Listar extends Component {
  render () {
    return (
      <div>
        <Header
          logo={logo}
          links={[
            { url: '/', name: 'Página Principal' },
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
        <Row>
        <DatePicker
          selected={new Date()}
          onChange={() => {}}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
        <Button>Pesquisar</Button>
        </Row>
          <CardExpense />
          <CardExpense />
          <CardExpense />
        </Container>
        <ChangeBackground />
      </div>
    )
  }
}

export default Listar;

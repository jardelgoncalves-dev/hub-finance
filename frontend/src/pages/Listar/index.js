import React, { Component } from 'react';
import DatePicker from 'react-datepicker'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import {NotificationContainer, NotificationManager} from 'react-notifications';

import { ChangeBackground } from '../../components/GlobalStyle'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import Container from '../../components/Container'
import Button from '../../components/Button'
import Row from '../../components/Row'
import { CardExpense } from '../../components/Card'

import logo from '../../assets/logo_white.svg'
import userIcon from '../../assets/user.svg'
import "../../components/react-datepicker/dist/react-datepicker.css"
import 'react-notifications/lib/notifications.css';

import api from '../../services/api'
import * as UserActions from '../../store/actions/user'

class Listar extends Component {

  state = {
    date: new Date(),
    expenses: [],
    search: false
  }

  handleDate = () => {
    const year = this.state.date.getFullYear()
    const month = this.state.date.getMonth() + 1
    api.get(`/expenses/${year}/${month}/period`)
    .then(response => {
      this.setState({ expenses: response.data, search: true })
    }).catch(err => {
      NotificationManager.error(null, 'Ocorreu um erro! Tente novamente');      
    })
  }

  render () {
    return (
      <div>
        <Header
          logo={logo}
          links={[
            { url: '/home', name: 'Página Principal' },
          ]}
          buttons={[
            <Button
            key="1"
            small
            white
            onClick={() => this.props.logout()}
          >
            Sair
          </Button>
          ]}
        >
          <img src={logo} alt="Logo" />
          <Avatar
            image={userIcon}
            text={this.props.user.name}
          />
        </Header>
        <Container center column>
        <h4 style={{ color: '#FFF', marginBottom: '20px' }}>Pesquise as despesas por Mês e Ano</h4>
          <Row>
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.setState({ date: date }) }
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
            <Button onClick={this.handleDate} >Pesquisar</Button>
          </Row>
          { !this.state.expenses.length && this.state.search && (
            <p style={{ color: '#6f6f6f', marginBottom: '50px', marginTop: '50px' }}>
              Nenhuma despesa foi encontrado para a data informada
            </p>
          )}
          { this.state.expenses.map(expense => (
              <CardExpense
                key={expense.id}
                value={expense.value}
                color={expense.categories.color}
                category={expense.categories.name}
                description={expense.description}
              />
            )) }
        </Container>
        <NotificationContainer />
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

export default  connect(mapStateToProps, mapDispatchToProps)(Listar);

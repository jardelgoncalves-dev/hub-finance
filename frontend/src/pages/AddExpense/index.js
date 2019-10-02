import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { ChangeBackground } from '../../components/GlobalStyle'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import Container from '../../components/Container'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import Row from '../../components/Row'

import logo from '../../assets/logo_white.svg'
import userIcon from '../../assets/user.svg'
import 'react-notifications/lib/notifications.css';

import * as UserActions from '../../store/actions/user'
import { isRequired, isNumber } from '../../util/validator'

import api from '../../services/api'

class AddExpense extends Component {
  state = {
    categories: [],

    entry_date: '',
    entry_value: '',
    entry_description: '',
    entry_category: '',
    
    error_date: '',
    error_value: '',
    error_description: '',
    error_category: '',

    stop_request: false
  }

  componentDidMount () {
    this.getCategories()
  }

  handleInputChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleCreateIncome = () => {
    this.handleValidateField()
    if (!this.state.stop_request) {
      const {
        entry_date: date,
        entry_description: description,
        entry_value: value,
        entry_category: category_id
      } = this.state

      api.post('/expenses', { date, description, value: parseFloat(value), category_id })
        .then(response => {
          NotificationManager.success(null, 'A despesa foi cadastrada com sucesso');
          this.setState({ 
            entry_date: '',
            entry_value: '',
            entry_description: '',
            entry_category: ''
          })
        }).catch(err => {
          NotificationManager.error(null, 'Ocorreu um erro! Tente novamente');
        })

    }
  }

  getCategories = async () => {
    const response = await api.get('/categories')

    let categories = []
    response.data.forEach(category => {
      if (category.flow_type === 'expense') {
        categories.push({ value: category.id, label: category.name, type: category.flow_type })
      }
    })
    this.setState({ categories })
  }

  handleValidateField = () => {
    this.setState({ error_date: '', error_value: '', error_description: '', error_category: '', stop_request: false })
    const fields = ['entry_date', 'entry_value', 'entry_description', 'entry_category']
    if (!isNumber(this.state.entry_value)) {
      this.setState({ error_value: 'Valor inválido', stop_request: true })
    }

    fields.forEach(field => {
      if(!isRequired(this.state[field])) {
        const [, prefix] = field.split('_')
        const name = 'error_' + prefix
        this.setState({ [name]: 'Este campo é obrigatório', stop_request: true })
      }
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
          <h3 style={{ color: '#FFF', marginBottom: '20px' }}>Adicionar Despesa</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%'
          }}
          >
            <Input 
              errorMessage={this.state.error_value}
              placeholder="Valor"
              style={{ marginBottom: '20px' }}
              styleInput={{
                border: '1px solid #CCCCCC',
                boxShadow: 'none',
                width: '100%',
                margin: 0,
              }}
              defaultValue={this.state.entry_value}
              onChange={(e) => this.handleInputChange('entry_value', e.target.value)}
            />
            <Input 
              errorMessage={this.state.error_description}
              placeholder="Descrição"
              style={{ marginBottom: '20px' }}
              styleInput={{
                border: '1px solid #CCCCCC',
                boxShadow: 'none',
                width: '100%',
                margin: 0,
              }}
              defaultValue={this.state.entry_description}
              onChange={(e) => this.handleInputChange('entry_description', e.target.value)}
            />
            <Input 
              errorMessage={this.state.error_date}
              placeholder="Data"
              type="date"
              style={{ marginBottom: '20px' }}
              styleInput={{
                border: '1px solid #CCCCCC',
                boxShadow: 'none',
                width: '100%',
                margin: 0,
              }}
              defaultValue={this.state.entry_date}
              onChange={(e) => this.handleInputChange('entry_date', e.target.value)}
            />
            <Select
              placeholder="Categoria"
              options={this.state.categories}
              onChange={(e) => this.handleInputChange('entry_category', e.value)}
            />
            {this.state.error_category && (
              <small style={{
                color: '#960000'
              }}>
                {this.state.error_category}
              </small>
            )}
          </div>
          <Row style={{ marginTop: '40px' }}>
            <Button
              primary
              onClick={this.handleCreateIncome}
            >
              Salvar
            </Button>
          </Row>
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

export default  connect(mapStateToProps, mapDispatchToProps)(AddExpense);

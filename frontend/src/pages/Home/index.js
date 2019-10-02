import React, { Component } from 'react';
import Chart from 'react-google-charts'
import { Fab, Action } from 'react-tiny-fab';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { ChangeBackground } from '../../components/GlobalStyle'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import Container from '../../components/Container'
import Button from '../../components/Button'
import { CardResume, CardChart, CardExpense } from '../../components/Card'
import Row from '../../components/Row'
import Spinner from '../../components/Spinner'
import HasNoData from '../../components/HasNoData'
import { TrendingDownSVG, TrendingUpSVG } from '../../components/Icons'

import logo from '../../assets/logo_white.svg'
import trendingUp from '../../assets/trending_up_icon.svg'
import trendingDown from '../../assets/trending_down_icon.svg'
import userIcon from '../../assets/user.svg'
import * as UserActions from '../../store/actions/user'

import api from '../../services/api'

import 'react-tiny-fab/dist/styles.css';

class Home extends Component {
  state = {
    chartLineData: [],
    chartByCategoryData: [],
    resume_income: 0,
    resume_expense: 0,
    last_expense: [],
  }

  componentDidMount() {
    this.getBalance()
    this.getExpenseByCategory()
    this.getResume()
    this.getLastExpense()
  }

  getBalance = async () => {
    const balance = await api.get('/cashflow/balance')
    let data = [[
      'Mês',
      'Receitas',
      'Despesas',
    ]]
    balance.data.forEach(info => {
      data.push([info.month, parseFloat(info.income) || 0, parseFloat(info.expense) || 0])
    })
    this.setState({ chartLineData: data })
  }

  getExpenseByCategory = async () => {
    const totals = await api.get('/expenses/total/categories')
    let data = [['Despesas por categoria', 'Reais']]
    totals.data.forEach(category => {
      data.push([category.name, parseFloat(category.total) || 0])
    })
    this.setState({ chartByCategoryData: data })
  }

  getResume = async () => {
    const response = await api.get('/cashflow/balance/flowtype')
    this.setState({
      resume_income: response.data.income || 0,
      resume_expense: response.data.expense || 0
    })
  }

  getLastExpense = async () => {
    const response = await api.get('/expenses/paginate/3')
    this.setState({
      last_expense: response.data
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
          <Row>
            <CardResume
              image={trendingUp}
              title="Total em receitas"
              textValue={this.state.resume_income}
              textValueColor="#1E81CE"
            />
            <CardResume
              image={trendingDown}
              title="Total em despesas"
              textValue={this.state.resume_expense}
              textValueColor="#E63636"
            />
          </Row>
          <Row>
            <CardChart title="Despesas x Receitas">
              { this.state.chartLineData.length > 2 ? (
                <Chart
                  width={'600px'}
                  height={'400px'}
                  chartType="Line"
                  loader={<Spinner />}
                  data={this.state.chartLineData}
                  options={{
                    chart: {
                      subtitle: 'Em reais (R$)',
                    },
                  }}
                  rootProps={{ 'data-testid': '3' }}
                />
              ) : (
                <HasNoData
                  text="Você não possui dados suficientes para serem exibidos"
                  styleText={{ color: '#F2691B', marginTop: '30px' }}
                />
              )}
            </CardChart>
            <CardChart
              title="Despesas por categoria"
            >
              { this.state.chartLineData.length > 1 ? (
                <Chart
                  width={'400px'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<Spinner />}
                  data={this.state.chartByCategoryData}
                  options={{
                    is3D: true,
                  }}
                  rootProps={{ 'data-testid': '2' }}
                />
              ) : (
                <HasNoData
                  text="Você não possui dados suficientes para serem exibidos"
                  styleText={{ color: '#F2691B', marginTop: '30px' }}
                />
              )}
            </CardChart>
          </Row>
          <div style={{ width: '100%', alignItems: 'left'}}>
            <h3 style={{ color: '#F2691B' }}>
              Despesas Recentes
            </h3>
          </div>
          { !this.state.last_expense.length && (
          <p style={{ color: '#6f6f6f', marginBottom: '50px', marginTop: '50px' }}>
            Você não possui despesas cadastradas
          </p>
          )}
          { this.state.last_expense.map(expense => (
            <CardExpense
              key={expense.id}
              value={expense.value}
              color={expense.categories.color}
              category={expense.categories.name}
              description={expense.description}
            />
          )) }
          <div style={{ width: '100%', alignItems: 'left', marginTop: '20px'}}>
            <a href="/" style={{
              fontWeight: "bold",
              fontSize: '16px',
              color: '#F2691B'
            }}>
              Ver mais despesas
              </a> 
          </div>
          
          {/* Floating Button */}
          <Fab
          mainButtonStyles={{ backgroundColor: '#F2691B' }}
            icon={"+"}
          >
            <Action
                text="Adicionar despesa"
                style={{ backgroundColor: "#E63636" }}
                onClick={() => this.toggleModalExpense()}
              >
              <TrendingDownSVG />
            </Action>
            <Action
              text="Adicionar receita"
              style={{ backgroundColor: "#1E81CE" }}
              onClick={() => this.props.history.push('/home/add_income')}
            >
              <TrendingUpSVG />
            </Action>
          </Fab>
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

export default  connect(mapStateToProps, mapDispatchToProps)(Home);

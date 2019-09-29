import React, { Component } from 'react';
import Chart from 'react-google-charts'
import { Fab, Action } from 'react-tiny-fab';

import { ChangeBackground } from '../../components/GlobalStyle'
import Header from '../../components/Header'
import Avatar from '../../components/Avatar'
import Container from '../../components/Container'
import Button from '../../components/Button'
import { CardResume, CardChart, CardExpense } from '../../components/Card'
import Row from '../../components/Row'
import Spinner from '../../components/Spinner'
import { Modal } from '../../components/Modal'
import { TrendingDownSVG, TrendingUpSVG } from '../../components/Icons'

import logo from '../../assets/logo_white.svg'
import trendingUp from '../../assets/trending_up_icon.svg'
import trendingDown from '../../assets/trending_down_icon.svg'
import userIcon from '../../assets/user.svg'

import 'react-tiny-fab/dist/styles.css';

class Home extends Component {
  state = {
    modalAddIncome: false,
    modalAddExpense: false
  }

  toggleModalExpense = () => {
    this.setState({ modalAddIncome: false, modalAddExpense: !this.state.modalAddExpense })
  }

  toggleModalIncome = () => {
    this.setState({ modalAddIncome: !this.state.modalAddIncome, modalAddExpense: false })
  }

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
            <CardResume
              image={trendingUp}
              title="Total em receitas"
              textValue="4000"
              textValueColor="#1E81CE"
            />
            <CardResume
              image={trendingDown}
              title="Total em despesas"
              textValue="2000"
              textValueColor="#E63636"
            />
          </Row>
          <Row>
            <CardChart title="Receitas x Despesas">
              <Chart
                width={'600px'}
                height={'400px'}
                chartType="Line"
                loader={<Spinner />}
                data={[
                  [
                    'Mês',
                    'Receitas',
                    'Despesas',
                  ],
                  ['Jan', 80.8, 41.8],
                  ['Feb', 69.5, 52.4],
                  ['Mar', 102, 25.7],
                ]}
                options={{
                  chart: {
                    subtitle: 'Em reais (R$)',
                  },
                }}
                rootProps={{ 'data-testid': '3' }}
              />
            </CardChart>
            <CardChart
              title="Despesas por categoria"
            >
              <Chart
                width={'400px'}
                height={'300px'}
                chartType="PieChart"
                loader={<Spinner />}
                data={[
                  ['Task', 'Hours per Day'],
                  ['Work', 11],
                  ['Eat', 2],
                  ['Commute', 2],
                  ['Watch TV', 2],
                  ['Sleep', 7],
                ]}
                options={{
                  is3D: true,
                }}
                rootProps={{ 'data-testid': '2' }}
              />
            </CardChart>
          </Row>
          <div style={{ width: '100%', alignItems: 'left'}}>
            <h3 style={{ color: '#F2691B' }}>
              Despesas Recentes
            </h3>
          </div>
          <CardExpense />
          <CardExpense />
          <CardExpense />
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
              onClick={() => this.toggleModalIncome()}
            >
              <TrendingUpSVG />
            </Action>
          </Fab>
        </Container>
        <Modal
          title="Nova Receita"
          titleColor="#F2691B"
          showFlag={this.state.modalAddIncome}
          onClose={this.toggleModalIncome}
        />

        <Modal
          title="Nova Despesa"
          titleColor="#F2691B"
          showFlag={this.state.modalAddExpense}
          onClose={this.toggleModalExpense}
        />
        <ChangeBackground />
      </div>
    )
  }
}

export default Home;

import React from 'react'
import styled from 'styled-components'
import Drawer from 'react-drag-drawer'

import Row from '../Row'
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'

const ContainerModal = styled.div`
  padding: 20px;
  width: 750px;
  height: 550px;
  background-color: #FFF;
  border-radius: 5px;
`

export const Modal = ({ title, onClose, showFlag, titleColor }) => (
  <Drawer
    open={showFlag}
    onRequestClose={onClose}
  >
    <ContainerModal>
      <h3 style={{ color: titleColor }}>{ title }</h3>
      <Row style={{ justifyContent: 'space-between', marginTop: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
          <label>Descrição</label>
          <Input 
            style={{
              border: '1px solid #CCCCCC',
              boxShadow: 'none',
              margin: 0
            }}
            placeholder="Valor"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
          <label>Data</label>
          <Input 
            style={{
              border: '1px solid #CCCCCC',
              boxShadow: 'none',
              margin: 0
            }}
            type="date"
          />
        </div>
      </Row>
      <Row column>
        <label>Descrição</label>
        <Input 
          style={{
            border: '1px solid #CCCCCC',
            boxShadow: 'none',
            width: '100%',
            margin: 0
          }}
          placeholder="Breve descrição"
        />
      </Row>
      <Row style={{ justifyContent: 'space-between', marginTop: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
          <label>Categoria</label>
          <Select
            options={[
              { value: '1', label: 'Chocolate' },
              { value: '2', label: 'Strawberry' },
              { value: '3', label: 'Vanilla' }
            ]}
            onChange={(e) => console.log(e.value)}
          />
        </div>
      </Row>
      <Row style={{ marginTop: '100px' }}>
        <Button primary>Salvar</Button>
        <Button
          transparent
          secundary
          style={{ marginLeft: '10px' }}
        >
          Cancelar
        </Button>
      </Row>
    </ContainerModal>
  </Drawer>

)

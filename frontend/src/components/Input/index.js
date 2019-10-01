import React from 'react'
import styled from 'styled-components';

const StyleInput = styled.div`
  margin: 32px 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  input {
    display: block;
    padding: 14px;
    border: none;
    border-radius: 5px;
    color: #F2691B;
    font-size: 16px;
    background-color: #FFF;
    width: 100%;
    box-shadow: 0px 0px 45px -12px rgba(0,0,0,0.2);
    ::placeholder {
      color: #D69875;
    }
  }
  small.errorMessage {
    font-size: 14px;
    color: #960000
  }
`;

const Input = ({ placeholder, type, onChange, errorMessage, style }) => (
  <StyleInput
    style={style}
  >
    <input
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
    { errorMessage && <small className="errorMessage">{ errorMessage }</small> }
    
  </StyleInput>
)

export default Input
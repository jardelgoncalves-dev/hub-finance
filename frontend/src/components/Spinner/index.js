import styled, { keyframes } from 'styled-components'

// precisamos criar a animação separada
const rotate = keyframes`
  from {
    transform: rotate(0)
  }
  to {
    transform: rotate(360deg)
  }
`

const Spinner = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 5px solid #F2691B;
  border-top-color: transparent;
  animation: ${rotate} 1s linear infinite;
`

export default Spinner;
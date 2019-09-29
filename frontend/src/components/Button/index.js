import styled from 'styled-components';

const Button = styled.div`
  border: ${props => props.secundary ? '1px solid #F2691B' : 'none' };
  border-radius: 5px;
  padding: ${props => props.small ? '10px 50px' : '16px 50px'};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: ${props => {
    if (props.white || props.transparent) return '#F2691B'
    else return '#FFF'
  }};
  background-color: ${props => {
    if (props.white) return '#FFF'
    else if (props.primary) return '#F2691B'
    else if (props.transparent) return 'transparent'
    else return '#222'
  }};
  cursor: pointer;
  box-shadow: ${props => {
    if (props.white) return '0px 14px 8px -7px rgba(0,0,0,0.1)'
    else if (props.primary) return '0px 4px 10px -1px #F2691B'
    else if (props.transparent) return 'none'
    else return '0px 4px 10px -1px #222'
  }};
  

  :hover {
    opacity: 0.9;
  }
`;

export default Button

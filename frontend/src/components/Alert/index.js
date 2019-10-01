import styled from 'styled-components';

const Alert = styled.div`
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100%;
  color: #FFF;
  background-color: ${ props => props.danger ? '#b50000' : '#525252' };
`;

export default Alert

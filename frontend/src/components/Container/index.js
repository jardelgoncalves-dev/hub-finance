import styled from 'styled-components';

const Container = styled.div`
  padding: 64px;
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  align-items: ${props => props.center ? 'center' : 'flex-start'};
`;

export default Container
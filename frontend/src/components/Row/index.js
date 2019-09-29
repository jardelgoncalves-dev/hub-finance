import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  margin-bottom: 32px;
  flex-direction: ${ props => props.column ? 'column' : 'row' }
`;

export default Row
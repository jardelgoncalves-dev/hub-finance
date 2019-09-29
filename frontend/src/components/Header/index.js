import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

const StyleHeader = styled.header`
  display: flex;
  padding: 20px 64px;
  justify-content: space-between;
  color: #FFF;
  background-color: #F2691B;
  box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.2);
  align-items: center;
`;

const StyleLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  a {
    font-size: 14px;
    margin: 5px 20px;
    color: #FFF;
    font-weight: bold;
    text-decoration: none;

    :hover {
      color: #F8F8F8;
      text-decoration: underline;
    }
  }
`
const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  align-items: center;
`


const Header = ({ logo, links, linksPrivate, linksPublic, flagPrivate, buttons, children }) => (
  <StyleHeader>
    <ContainerHeader>
    { children }
    </ContainerHeader>
    <StyleLinks>
      { flagPrivate ? linksPrivate.map((link, index) => (
        <a key={index} href={link.url}>{ link.name }</a>
      )) : links.map((link, index) => (
        <a key={index} href={link.url}>{ link.name }</a>
      ))}
      { linksPublic.map((link, index) => (
        <a key={index} href={link.url}>{ link.name }</a>
      )) }
     { buttons }
    </StyleLinks>
  </StyleHeader>
)

Header.propTypes = {
  links: PropTypes.array,
  linksPrivate: PropTypes.array,
  linksPublic: PropTypes.array,
  flagPrivate: PropTypes.bool,
  logo: PropTypes.object,
  buttons: PropTypes.object
}

Header.defaultProps = {
  flagPrivate: false,
  links: [],
  linksPrivate: [],
  linksPublic: [],
  buttons: []
}

export default Header
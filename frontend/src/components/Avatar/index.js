import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

const ImageCircle = styled.img`
  padding:0;
  margin:0;
  margin-left: 80px;
  margin-right: 10px;
  vertical-align: middle;
  object-fit: cover;
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

const StyleContainer = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = ({ width, height, image, text, colorText }) => (
  <StyleContainer>
    <ImageCircle src={image} width={width} height={height} />
    <span style={{ color: colorText }}>{ text }</span>
  </StyleContainer>
)

Avatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  image: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  colorText: PropTypes.string
}

Avatar.defaultProps = {
  width: '35px',
  height: '35px',
  colorText: '#FFF'
}

export default Avatar
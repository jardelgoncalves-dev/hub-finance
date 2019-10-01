import React from 'react'
import PropTypes from 'prop-types'
import icon from '../../assets/icon_hand.svg'

const HasNoData = ({ text, width, height, imgWidth, imgHeight, styleText }) => (
  <div style={{
    width: width,
    height: height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }}>
    <img src={icon} width={imgWidth} height={imgHeight} alt="Não há dados para exibir" />
    <p style={styleText}>{text}</p>
  </div>
)

HasNoData.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
  styleText: PropTypes.object
}

HasNoData.defaultProps = {
  width: '400px',
  height: '300px',
  imgWidth: '150px',
  imgHeight: '150px'
}

export default HasNoData
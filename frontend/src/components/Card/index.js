import React from 'react'
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types'

const StyleCard = css`
  background-color: #FFF;
  padding: 12px;
  box-shadow: 0px 0px 8px -2px rgba(0,0,0,0.3);
  border-radius: 5px;
`;

const StyleChart = styled.div`
  ${StyleCard}
  padding: 30px;
  margin: 0 20px;
`

const StyleCardResume = styled.div`
  ${ StyleCard }
  display: flex;
  height: 80px;
  width: 340px;
  margin: 0 10px;
  img {
    width: 42;
    height: 22;
  }

  div {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h6 {
      font-size: 14px;
      color: #F2691B;
      font-weight: 400;
    }

    h5 {
      margin-top: 5px;
      font-size: 22px;
      color: #222;
      font-weight: bold;
    }
  }
`

const StyleExpense = styled.div`
  ${StyleCard}
  display: flex;
  width: 100%;
  margin-top: 20px;
  div.square {
    width: 130px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;
    border-radius: 5px;
    span {
      font-size: 12px;
      font-weight: bold;
      color: ${ props => props.dark ? '#FFF' : '#222' }
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 20px;
    span.category {
      font-size: 18px;
      font-weight: bold;
    }
    span.description {
      margin-top: 10px;
      font-size: 15px;
      color: #878787;
      line-height: 1.6;
    }
  }
`

export const CardResume = ({ image, textValueColor, titleColor, title, textValue }) => (
  <StyleCardResume>
    <img src={image} alt={"Resumo " + title} />
    <div>
      <h6 style={{color: titleColor}}>{ title }</h6>
      <h5 style={{color: textValueColor }}>R$ { textValue }</h5>
    </div>
  </StyleCardResume>
)


CardResume.propTypes = {
  image: PropTypes.object.isRequired,
  textValueColor: PropTypes.string,
  titleColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  textValue: PropTypes.string.isRequired
}

CardResume.defaultProps = {
  textValueColor: '#222',
  titleColor: '#F2691B'
}


export const CardChart = ({ children, title, titleColor }) => (
  <StyleChart>
    <h4 style={{ color: titleColor }}>{ title }</h4>
    { children }
  </StyleChart>
)

CardChart.propTypes = {
  title: PropTypes.string.isRequired,
}

CardChart.defaultProps = {
  titleColor: '#F2691B'
}

export const CardExpense = () => (
  <StyleExpense dark>
    <div className="square" style={{ backgroundColor: '#71C355' }}>
      <span>R$ 20000</span>
    </div>
    <div>
      <span className="category" style={{ color: '#71C355' }}>
        Educação
      </span>
      <span className="description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exe
      </span>
    </div>
  </StyleExpense>
)
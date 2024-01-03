import React from 'react'
import PropTypes from 'prop-types'

const Previsao = ({ previsoes }) => {
  return (
    <div>
      <h4>Previsão para as próximas horas</h4>
      <ul>
        {previsoes.map((previsao) => (
          <li key={previsao.dt}>
            <img
              src={`http://openweathermap.org/img/wn/${previsao.weather[0].icon}.png`}
              alt={previsao.weather[0].description}
            />
            {previsao.main.temp} ºC - {previsao.weather[0].description}
          </li>
        ))}
      </ul>
    </div>
  )
}

Previsao.propTypes = {
  previsoes: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
      }).isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default Previsao

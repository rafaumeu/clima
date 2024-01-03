import React from 'react'
import PropTypes from 'prop-types'

const ClimaAtual = ({ clima }) => {
  return (
    <div>
      <h3>{clima.name}</h3>
      {clima.weather && clima.weather.length > 0 && (
        <img
          src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`}
          alt={clima.weather[0].description}
        />
      )}
      {clima.main && <p>{clima.main.temp}ºC</p>}
      {clima.weather && clima.weather.length > 0 && (
        <p>{clima.weather[0].description}</p>
      )}
    </div>
  )
}

ClimaAtual.propTypes = {
  clima: PropTypes.shape({
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    base: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }),
}

export default ClimaAtual

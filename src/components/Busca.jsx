import React from 'react'
import PropTypes from 'prop-types'
const Busca = ({ cidade, setCidade, buscarClima }) => {
  return (
    <div>
      <input
        type='text'
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder='Digite uma Cidade...'
      />
      <button onClick={buscarClima}>Buscar</button>
    </div>
  )
}

Busca.propTypes = {
  cidade: PropTypes.string.isRequired,
  setCidade: PropTypes.func.isRequired,
  buscarClima: PropTypes.func.isRequired,
}
export default Busca

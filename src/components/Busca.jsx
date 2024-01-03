import React from 'react'

import PropTypes from 'prop-types'
import { BotaoBuscar, BuscaCidade, BuscaContainer } from './BuscaStyles'
const Busca = ({ cidade, setCidade, buscarClima }) => {
  return (
    <BuscaContainer>
      <BuscaCidade
        type='text'
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder='Digite uma Cidade...'
      />
      <BotaoBuscar onClick={buscarClima}>Buscar</BotaoBuscar>
    </BuscaContainer>
  )
}

Busca.propTypes = {
  cidade: PropTypes.string.isRequired,
  setCidade: PropTypes.func.isRequired,
  buscarClima: PropTypes.func.isRequired,
}
export default Busca

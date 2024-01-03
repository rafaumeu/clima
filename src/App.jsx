import React from 'react'
import { Titulo } from './AppStyles.js'
import Busca from './components/Busca'

import ClimaAtual from './components/ClimaAtual'

function App() {
  return (
    <div>
      <Titulo>Condições Climáticas</Titulo>
      <Busca />
      <ClimaAtual />
    </div>
  )
}

export default App

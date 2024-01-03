import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Titulo } from './AppStyles.js'
import Busca from './components/Busca'
import ClimaAtual from './components/ClimaAtual'
import Previsao from './components/Previsao.jsx'
import config from '../config.js'

function App() {
  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)
  const [previsao, setPrevisao] = useState([])
  const apiKey = config.apiKey
  const buscarClima = async () => {
    try {
      const respostaClima = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )
      setClima(respostaClima.data)
    } catch (error) {
      console.log('Erro ao buscar clima: ' + error)
    }
  }
  console.log(clima)

  return (
    <div>
      <Titulo>Condições Climáticas</Titulo>
      <Busca cidade={cidade} setCidade={setCidade} buscarClima={buscarClima} />
      <ClimaAtual clima={clima} />
      <Previsao />
    </div>
  )
}

export default App

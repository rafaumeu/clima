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
      const respostaPrevisao = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
      )
      setClima(respostaClima.data)
      setPrevisao(respostaPrevisao.data.list.slice(0, 5))
    } catch (error) {
      console.log('Erro ao buscar clima: ' + error)
    }
  }

  return (
    <div>
      <Titulo>Condições Climáticas</Titulo>
      <Busca cidade={cidade} setCidade={setCidade} buscarClima={buscarClima} />
      {clima && <ClimaAtual clima={clima} />}
      {previsao.length > 0 && <Previsao previsoes={previsao} />}
    </div>
  )
}

export default App

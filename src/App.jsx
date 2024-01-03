import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ClimaContainer, Titulo } from './AppStyles.js'
import Busca from './components/Busca'
import ClimaAtual from './components/ClimaAtual'
import Previsao from './components/Previsao.jsx'
import config from '../config.js'

function App() {
  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState(null)
  const [previsao, setPrevisao] = useState([])
  const apiKey = config.apiKey

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      try {
        const respostaClima = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        )
        setCidade(respostaClima.data.name)
        setClima(respostaClima.data)

        const respostaPrevisao = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        )
        setPrevisao(respostaPrevisao.data.list.slice(0, 5))
      } catch (error) {
        console.log('Erro ao buscar clima: ' + error)
        // Exibir uma mensagem de erro para o usuário
      }
    })
  }, [apiKey])

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
      // Exibir uma mensagem de erro para o usuário
    }
  }

  return (
    <ClimaContainer>
      <Titulo>Condições Climáticas</Titulo>
      <Busca cidade={cidade} setCidade={setCidade} buscarClima={buscarClima} />
      {clima && <ClimaAtual clima={clima} />}
      {previsao.length > 0 && <Previsao previsoes={previsao} />}
    </ClimaContainer>
  )
}

export default App

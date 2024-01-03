import App from '../App'
import React from 'react'
import {
  fireEvent,
  queryByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import axios from 'axios'
import config from '../../config'
import { act } from 'react-test-renderer'
jest.mock('axios')
const mockedResponse = {
  coord: {
    lon: -48.5578,
    lat: -22.2964,
  },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d',
    },
  ],
  base: 'stations',
  main: {
    temp: 308.43,
    feels_like: 308.93,
    temp_min: 308.43,
    temp_max: 308.43,
    pressure: 1009,
    humidity: 33,
    sea_level: 1009,
    grnd_level: 952,
  },
  visibility: 10000,
  wind: {
    speed: 1.41,
    deg: 340,
    gust: 1.3,
  },
  clouds: {
    all: 100,
  },
  dt: 1704293692,
  sys: {
    country: 'BR',
    sunrise: 1704270871,
    sunset: 1704319326,
  },
  timezone: -10800,
  id: 3460005,
  name: 'Jaú',
  cod: 200,
}
const mockedNotFoundError = {
  response: {
    data: {
      cod: '404',
      message: 'city not found',
    },
  },
}

describe('Teste de renderização do projeto', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockedResponse)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza os itens necessários', () => {
    render(<App />)

    expect(screen.getByText('Condições Climáticas')).toBeInTheDocument()
    expect(screen.getByText('Buscar')).toBeInTheDocument()
  })

  it('chama buscarClima corretamente ao clicar no botão de busca', async () => {
    render(<App />)

    const mockCity = 'London'
    const searchInput = screen.getByPlaceholderText('Digite uma Cidade...')
    const searchButton = screen.getByText('Buscar')

    fireEvent.change(searchInput, { target: { value: mockCity } })
    fireEvent.click(searchButton)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=${mockCity}&appid=${config.apiKey}&units=metric&lang=pt_br`
      )
    })
  })
})

describe('Erros da aplicação', () => {
  beforeEach(() => {
    axios.get.mockRejectedValue(mockedNotFoundError)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('trata erro ao buscar clima', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    render(<App />)

    const searchInput = screen.getByPlaceholderText('Digite uma Cidade...')
    const searchButton = screen.getByText('Buscar')

    fireEvent.change(searchInput, { target: { value: 'CidadeInexistente' } })
    fireEvent.click(searchButton)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=CidadeInexistente&appid=${config.apiKey}&units=metric&lang=pt_br`
      )

      expect(consoleSpy).not.toHaveBeenCalledWith(
        'Erro ao buscar clima: Error: Request failed with status code 404'
      )
    })

    consoleSpy.mockRestore()
  })
})

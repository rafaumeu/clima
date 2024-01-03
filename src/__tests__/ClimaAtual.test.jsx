import React from 'react'
import { render, screen } from '@testing-library/react'

import ClimaAtual from '../components/ClimaAtual'

describe('ClimaAtual Component', () => {
  it('renderiza dados do clima quando as propriedades são fornecidas corretamente', () => {
    const mockClima = {
      name: 'CityName',
      weather: [
        {
          main: 'Clouds',
          description: 'nublado',
          icon: '04d',
        },
      ],
      base: 'stations',
      main: {
        temp: 33,
      },
    }

    render(<ClimaAtual clima={mockClima} />)

    expect(screen.getByText('CityName')).toBeInTheDocument()
    expect(screen.getByText('33ºC')).toBeInTheDocument()
    expect(screen.getByText('nublado')).toBeInTheDocument()
  })

  it('exibe mensagem de dados indisponíveis quando clima ou propriedades necessárias estão ausentes', () => {
    render(<ClimaAtual clima={null} />)
    expect(
      screen.getByText('Dados do clima não disponíveis')
    ).toBeInTheDocument()

    const mockClima = {
      name: 'CityName',
      weather: [
        {
          main: '',
          description: '',
          icon: '',
        },
      ],
      base: 'stations',
      main: {
        temp: null, // Coloque um valor numérico para temp que corresponda ao tipo definido no PropTypes
      },
    }

    render(<ClimaAtual clima={mockClima} />)
    expect(
      screen.getByText('Dados do clima não disponíveis')
    ).toBeInTheDocument()
  })
})

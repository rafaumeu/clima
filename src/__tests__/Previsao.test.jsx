import React from 'react'
import { render, screen } from '@testing-library/react'

import Previsao from '../components/Previsao'

describe('Testes do componente Previsao', () => {
  const mockPrevisoes = [
    {
      dt: 1704301214,
      main: {
        temp: 25,
      },
      weather: [
        {
          icon: '01d',
          description: 'clear sky',
        },
      ],
    },
    // Adicione mais dados de previsão conforme necessário
  ]
  it('renderiza corretamente com dados de previsão', () => {
    render(<Previsao previsoes={mockPrevisoes} />)

    const previsaoTitle = screen.getByText('Previsão para as próximas horas')
    const previsaoItems = screen.getAllByRole('listitem')

    expect(previsaoTitle).toBeInTheDocument()
    expect(previsaoItems.length).toBe(mockPrevisoes.length)

    mockPrevisoes.forEach((previsao, index) => {
      const item = previsaoItems[index]
      const { icon, description } = previsao.weather[0]

      expect(item).toHaveTextContent(
        `${previsao.main.temp} ºC - ${description}`
      )

      const image = item.querySelector('img')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute(
        'src',
        `http://openweathermap.org/img/wn/${icon}.png`
      )
      expect(image).toHaveAttribute('alt', description)
    })
  })

  it('não renderiza quando não há dados de previsão', () => {
    render(<Previsao previsoes={[]} />)

    const previsaoTitle = screen.queryByText('27')
    expect(previsaoTitle).not.toBeInTheDocument()
  })
})

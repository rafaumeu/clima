import App from '../App'
import React from 'react'
import { render } from '@testing-library/react'

describe('Teste de renderização do projeto', () => {
  it('o teste renderiza os itens necessários', () => {
    const { getByText } = render(<App />)

    expect(getByText('Condições Climáticas')).toBeInTheDocument()
    expect(getByText('ºC')).toBeInTheDocument()
    expect(getByText('Buscar')).toBeInTheDocument()
    expect(getByText('Descrição da Temperatura')).toBeInTheDocument()
    expect(getByText('Previsão para as próximas horas')).toBeInTheDocument()
    expect(getByText('ºC - descrição')).toBeInTheDocument()
  })
})

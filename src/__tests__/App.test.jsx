import App from '../App'
import React from 'react'
import { render } from '@testing-library/react'

describe('Teste de renderização do projeto', () => {
  it('o teste renderiza os itens necessários', () => {
    const { getByText } = render(<App />)

    expect(getByText('Condições Climáticas')).toBeInTheDocument()
    expect(getByText('Busca')).toBeInTheDocument()
    expect(getByText('Clima Atual')).toBeInTheDocument()
  })
})

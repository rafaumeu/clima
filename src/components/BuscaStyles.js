import styled from 'styled-components'

export const BuscaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`
export const BuscaCidade = styled.input`
  padding: 10px 15px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  outline: none;
  width: 60%;
  margin-right: 16px;

  &:focus {
    border-radius: 1px solid #007bff;
  }
`
export const BotaoBuscar = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`

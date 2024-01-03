import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios'
import App from '../App'

jest.mock('axios')

describe('App component', () => {
  const mockGetCurrentPosition = jest.fn((successCallback) => {
    const mockPosition = {
      coords: {
        latitude: 51.1,
        longitude: 45.3,
      },
    }
    successCallback(mockPosition)
  })

  beforeEach(() => {
    global.navigator.geolocation = {
      getCurrentPosition: mockGetCurrentPosition,
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches weather data based on city search', async () => {
    const mockCity = 'Sao Paulo'
    const mockWeatherData = {
      data: {
        name: mockCity,
        weather: [
          {
            icon: '01d', // Icon data for weather condition
            main: 'Clear', // Main weather condition
            description: 'Clear sky', // Description of weather condition
          },
        ],
        base: 'stations',
        main: {
          temp: 20, // Temperature
        },
      },
    }
    const mockForecastData = {
      data: {
        list: [
          {},
          {},
          {},
          {},
          {}, // Simulated list items
        ],
      },
    }

    axios.get
      .mockResolvedValueOnce(mockWeatherData)
      .mockResolvedValueOnce(mockForecastData)

    render(<App />)

    const searchInput = screen.getByPlaceholderText('Digite uma Cidade...')
    const searchButton = screen.getByText('Buscar')

    fireEvent.change(searchInput, { target: { value: mockCity } })
    fireEvent.click(searchButton)

    // Ensure the API calls are not being triggered from other places unexpectedly
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2)
    })

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/weather?q=${mockCity}`)
    )
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(`/forecast?q=${mockCity}`)
    )
  })
})

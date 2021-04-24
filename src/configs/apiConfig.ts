import { ENV } from 'configs/constraints'
export default function ApiConfig() {

  const configs = {
    DEVELOPMENT: {
      BASE_URL: `http://api.openweathermap.org`
    }
  }

  return configs[ENV]
}

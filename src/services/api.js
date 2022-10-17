import axios from 'axios'
import Cookies from 'js-cookie'

const callAPI = async ({ url, method, data, token, params }) => {
  let headers = {}
  if (token) {
    const tokenCookies = Cookies.get('_T0123')
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies)
      headers = {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers,
    params,
    timeout: 30000
  }).catch((err) => err.response)
  if (response.status > 300 || response?.data?.status === 'FAILED') {
    const res = {
      error: true,
      message: response.data.message
    }
    return res
  }
  return response.data
}

export default callAPI
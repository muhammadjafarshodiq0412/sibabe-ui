import callAPI from './api'

const ROOT_API = process.env.REACT_APP_API_URL

export const getTransaction = async (data) => {
  const url = `${ROOT_API}/transaction/get-all`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

export const setSaveTransaction = async (data) => {
  const url = `${ROOT_API}/transaction/save`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

export const setTransaction = async (data, status) => {
  const url = `${ROOT_API}/transaction/${status}`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

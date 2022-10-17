import callAPI from './api'

const ROOT_API = process.env.REACT_APP_API_URL

export const setLogin = async (data) => {
  const url = `${ROOT_API}/authenticate`

  return callAPI({
    url,
    method: 'POST',
    data
  })
}

export const setUser = async (data) => {
  const url = `${ROOT_API}/user/save`

  return callAPI({
    url,
    method: 'POST',
    data,
  })
}

export const updateUser = async (data, id) => {
  const url = `${ROOT_API}/user/update?id=${id}`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  })
}

export const getUser = async (data, id) => {
  const url = `${ROOT_API}/user/get-all`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  })
}

export const deleteUser = async (id) => {
  const url = `${ROOT_API}/user/delete?id=${id}`

  return callAPI({
    url,
    method: 'POST',
    token: true,
  })
}


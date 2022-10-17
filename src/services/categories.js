import callAPI from './api'

const ROOT_API = process.env.REACT_APP_API_URL

export const setCategory = async (data) => {
  const url = `${ROOT_API}/parameter/save`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

export const updateCategory = async (data, id) => {
  const url = `${ROOT_API}/parameter/update?id=${id}`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

export const deleteCategory = async (id) => {
  const url = `${ROOT_API}/parameter/delete?id=${id}`

  return callAPI({
    url,
    method: 'POST',
    token: true
  })
}

export const getCategory = async () => {
  const url = `${ROOT_API}/parameter/get-all`

  return callAPI({
    url,
    method: 'POST',
    data: {
      currentPage: 0,
      limit: 100,
      filter: ""
    },
    token: true
  })
}
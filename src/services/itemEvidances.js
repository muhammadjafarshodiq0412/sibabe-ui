import callAPI from './api'

const ROOT_API = process.env.REACT_APP_API_URL

export const setItemEvidance = async (data) => {
  const url = `${ROOT_API}/barang-bukti/save`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

export const updateItemEvidance = async (data, id) => {
  const url = `${ROOT_API}/barang-bukti/update?id=${id}`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

export const deleteItemEvidance = async (id) => {
  const url = `${ROOT_API}/barang-bukti/delete?id=${id}`

  return callAPI({
    url,
    method: 'POST',
    token: true
  })
}

export const getItemEvidance = async (data) => {
  const url = `${ROOT_API}/barang-bukti/get-all`

  return callAPI({
    url,
    method: 'POST',
    data,
  })
}

export const getItemEvidanceMonitoring = async (data) => {
  const url = `${ROOT_API}/barang-bukti/get-monitoring`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  })
}

export const getItemEvidanceSummary = async () => {
  const url = `${ROOT_API}/barang-bukti/get-summary`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}
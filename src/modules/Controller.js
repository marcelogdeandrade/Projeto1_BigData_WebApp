import { create } from 'apisauce'

const api = create({
  baseURL: 'http://localhost:3002',
  headers: { 'Accept': 'application/vnd.github.v3+json' }
})

export const getDogs = async () => {
  return api
      .get('/species')
      .then((response) => response)
}

export const addSpecie = async (name) => {
  return api
    .post('/species', {name: name})
    .then((response) => response)
}


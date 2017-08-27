import { create } from 'apisauce'

const api = create({
  baseURL: 'http://localhost:3002',
  headers: { 'Accept': 'application/vnd.github.v3+json' }
})

export const getDogs = async () => {
  return api
      .get('/get_dogs')
      .then((response) => response)
}

export const addSpecie = async (name) => {
  console.log('addSpecie')
  return api
    .post('/get_dogs', {name: name})
    .then((response) => response)
}


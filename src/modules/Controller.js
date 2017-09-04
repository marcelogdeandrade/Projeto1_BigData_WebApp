import { create } from 'apisauce'

const api = create({
  baseURL: 'http://localhost:3002',
  headers: { 'Accept': 'application/vnd.github.v3+json' }
})


/**
 * Species
 */
export const getSpecies = async () => {
  return api
      .get('/species')
      .then((response) => response)
}

export const addSpecies = async (name) => {
  return api
    .post('/species', {name: name})
    .then((response) => response)
}

export const removeSpecies = async (idSpecies) => {
  return api
    .delete('/species', { idSpecies: idSpecies })
    .then((response) => response)
}

/**
 * Pets
 */

export const getPets = async () => {
  return api
    .get('/pets')
    .then((response) => response)
}

export const addPet = async (name, idSpecies, idClient, birthDate) => {
  return api
    .post('/pets', { name: name, idSpecies: idSpecies, idClient: idClient, birthDate: birthDate  })
    .then((response) => response)
}

/**
 * Medicines
 */

export const getMedicines = async () => {
  return api
    .get('/medicines')
    .then((response) => response)
}

export const addMedicine = async (name, idSpecies, idClient, birthDate) => {
  return api
    .post('/medicines', { name: name, idSpecies: idSpecies, idClient: idClient, birthDate: birthDate })
    .then((response) => response)
}



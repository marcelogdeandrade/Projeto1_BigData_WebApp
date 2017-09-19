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

export const updateSpecies = async (name, idSpecies) => {
  return api
    .put('/species', { name: name, idSpecies: idSpecies})
    .then((response) => response)
}

export const removeSpecies = async (idSpecies) => {
    return api
    .delete('/species', {idSpecies: idSpecies})
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

export const updatePet = async (idPet, name, idSpecies, idClient, birthDate) => {
  return api
    .put('/pets', {idPet: idPet, name: name, idSpecies: idSpecies, idClient: idClient, birthDate: birthDate })
    .then((response) => response)
}

export const removePet = async (idPet) => {
  return api
    .delete('/pets', { idPet: idPet })
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

export const addMedicine = async (name) => {
  return api
    .post('/medicines', { name: name })
    .then((response) => response)
}

export const updateMedicine = async (idMedicine, name) => {
  return api
    .put('/medicines', { idMedicine: idMedicine, name: name })
    .then((response) => response)
}

export const removeMedicine = async (idMedicine) => {
  return api
    .delete('/medicines', { idMedicine: idMedicine })
    .then((response) => response)
}

/**
 * Rel Pets Medicines
 */

export const getMedicinesPets = async () => {
  return api
    .get('/relpetsmedicines')
    .then((response) => response)
}

export const addMedicineToPet = async (idMedicine, quantity, idPet) => {
  return api
    .post('/relpetsmedicines', { idMedicine: idMedicine, quantity: quantity, idPet: idPet })
    .then((response) => response)
}

export const removeMedicinePet = async (idMedicinePet, idMedicine, idPet) => {
  return api
    .delete('/relpetsmedicines', { idMedicinePet: idMedicinePet ,idMedicine: idMedicine, idPet: idPet})
    .then((response) => response)
}

/**
 * Illness
 */
export const getIllnesses = async () => {
  return api
    .get('/illnesses')
    .then((response) => response)
}

export const addIllness = async (name, contagious) => {
  return api
    .post('/illnesses', { name: name, contagious: contagious})
    .then((response) => response)
}

export const updateIllness = async (idIllness, name, contagious) => {
  return api
    .put('/illnesses', { idIllness: idIllness, name: name, contagious: contagious })
    .then((response) => response)
}

export const removeIllness = async (idIllness) => {
  return api
    .delete('/illnesses', { idIllness: idIllness })
    .then((response) => response)
}

/**
 * Rel Pets Illnesses
 */

export const getIllnessesPets = async () => {
  return api
    .get('/relillnessespets')
    .then((response) => response)
}

export const addIllnessToPet = async (idIllness, idPet) => {
  return api
    .post('/relillnessespets', { idIllness: idIllness, idPet: idPet })
    .then((response) => response)
}


export const removeIllnessPet = async (idIllnessPet, idIllness, idPet) => {
  return api
    .delete('/relillnessespets', { idIllnessPet: idIllnessPet, idIllness: idIllness, idPet: idPet })
    .then((response) => response)
}


/**
 * Clients
 */
export const getClients = async () => {
  return api
    .get('/clients')
    .then((response) => response)
}

export const addClient = async (name, birthDate) => {
  return api
    .post('/clients', { name: name, birthDate: birthDate })
    .then((response) => response)
}

export const updateClient = async (idClient, name, birthDate) => {
  return api
    .put('/clients', { idClient: idClient, name: name, birthDate: birthDate })
    .then((response) => response)
}

export const removeClient = async (idClient) => {
  return api
    .delete('/clients', { idClient: idClient })
    .then((response) => response)
}

/**
 * Foods
 */
export const getFoods = async () => {
  return api
    .get('/foods')
    .then((response) => response)
}

export const addFood = async (name, idSpecies, quantity) => {
  return api
    .post('/foods', { name: name, idSpecies: idSpecies, quantity: quantity })
    .then((response) => response)
}

export const removeFood = async (idFood) => {
  return api
    .delete('/foods', { idFood: idFood })
    .then((response) => response)
}

/**
 * FoodLog
 */
export const getFoodLog = async () => {
  return api
    .get('/foodlog')
    .then((response) => response)
}

export const addFoodLog = async (idFood, isIn, idClient, idPet, quantity) => {
  return api
    .post('/foodlog', { idFood: idFood, isIn: isIn, idClient: idClient, idPet:idPet, quantity: quantity})
    .then((response) => response)
}

export const removeFoodLog = async (idFood) => {
  return api
    .delete('/foodlog', { idFoodLog: idFoodLog})
    .then((response) => response)
}

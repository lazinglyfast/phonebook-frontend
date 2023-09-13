import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const list = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = person => {
  return axios
    .post(baseUrl, person)
    .then(response => response.data)
}

const remove = person => {
  return axios.delete(`${baseUrl}/${person.id}`)
}

const update = person => {
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(response => response.data)
}

export default { list, create, delete: remove, update }

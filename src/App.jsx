import { useState, useEffect } from "react"
import Search from "./components/Search"
import Form from "./components/Form"
import Phonebook from "./components/Phonebook"
import Notification from "./components/Notification"
import phonebookService from "./services/phonebook"

const TIMEOUT = 5000

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState(new RegExp())
  const [notification, setNotification] = useState(null)

  const notify = notification => {
    setNotification(notification)
    setTimeout(() => setNotification(null), TIMEOUT)
  }

  const notifyFailure = error => {
    notify({ message: error, status: "failure" })
  }

  const notifySuccess = message => {
    notify({ message, status: "success" })
  }

  useEffect(() => {
    phonebookService
      .list()
      .then(serverPersons => {
        setPersons(serverPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    const msg = `${newName} is already added to the phonebook, replace the old number with a new one?`
    if (existingPerson && window.confirm(msg)) {
      const toServerPerson = { ...existingPerson, number: newNumber }
      phonebookService
        .update(toServerPerson)
        .then(fromServerPerson => {
          setPersons(persons.map(p => {
            return p.id == fromServerPerson.id ? fromServerPerson : p
          }))
          const message = `Changed ${fromServerPerson.name}'s phone number to ${fromServerPerson.number}`
          notifySuccess(message)
        })
        .catch(error => notifyFailure(error.response.data.message))
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .create(personObject)
        .then(serverPerson => {
          setPersons(persons.concat(serverPerson))
          notifySuccess(`Added ${serverPerson.name}`)
        })
        .catch(error => notifyFailure(error.response.data.message))
    }
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFilterChange = (event) => {
    // performance hit
    setQuery(new RegExp(event.target.value, "i"))
  }

  const handleDeleteOf = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .delete(person)
        .then(() => {
          setPersons(persons.filter(p => p.id != person.id))
          notifySuccess(`Deleted ${person.name}`)
        })
        .catch(error => notifyFailure(error.response.data.message))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Search onFilterChange={onFilterChange} />
      <Form addPerson={addPerson} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <Phonebook query={query} persons={persons} handleDeleteOf={handleDeleteOf} />
    </div >
  )
}

export default App

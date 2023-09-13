import { PropTypes } from "prop-types"

const Phonebook = ({ query, persons, handleDeleteOf }) => {
  return (
    <>
      <h2>Numbers</h2>
      {
        persons
          .filter((person) => query.test(person.name))
          .map((person) => {
            return <Entry
              key={person.id}
              person={person}
              handleDelete={() => handleDeleteOf(person)} />
          })
      }
    </>
  )
}

const Entry = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const personPropTypes = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
  number: PropTypes.string,
})

Phonebook.propTypes = {
  query: PropTypes.instanceOf(RegExp),
  persons: PropTypes.arrayOf(personPropTypes),
  handleDeleteOf: PropTypes.func,
}

Entry.propTypes = {
  person: personPropTypes,
  handleDelete: PropTypes.func,
}

export default Phonebook

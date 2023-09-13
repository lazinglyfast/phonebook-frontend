import { PropTypes } from "prop-types"

const Form = ({ addPerson, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Add new</h2>
      <div>
        name: <input onChange={onNameChange} />
      </div>
      <div>
        number: <input onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form >
  )
}

Form.propTypes = {
  addPerson: PropTypes.func,
  onNameChange: PropTypes.func,
  onNumberChange: PropTypes.func,
}

export default Form

import { PropTypes } from "prop-types"

const Search = ({ onFilterChange }) => {
  return (
    <div>
      filter shown with: <input onChange={onFilterChange} />
    </div>
  )
}

Search.propTypes = {
  onFilterChange: PropTypes.func,
}

export default Search

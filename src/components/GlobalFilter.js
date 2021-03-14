import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <form>
      <label>
        Search: {' '}
        <input
          type="search"
          value={ filter || '' }
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
    </form>
  )
}

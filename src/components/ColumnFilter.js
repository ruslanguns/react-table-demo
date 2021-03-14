import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <form>
      <label>
        <input
          type="search"
          value={ filterValue || '' }
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
    </form>
  )
}

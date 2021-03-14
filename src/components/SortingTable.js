import React, { useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, /** GROUPED_COLUMNS */ } from './columns'
import './table.css'

export const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  }, useSortBy)

  return (
    <table {...getTableProps()}>
      
      <thead>
        {
          headerGroups.map(({ getHeaderGroupProps, headers }) => (
            <tr {...getHeaderGroupProps()}>
              {
                headers.map(({ getHeaderProps, render, getSortByToggleProps, isSorted, isSortedDesc }) => (
                  <th {...getHeaderProps(getSortByToggleProps())}>
                    {
                      render('Header')
                    }
                    <span>
                      {
                        isSorted
                          ? (isSortedDesc ? ' 🔽' : ' 🔼')
                          : ''
                      }
                    </span>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      
      <tbody {...getTableBodyProps()}>
        {
          rows.map((row) => {
            prepareRow(row)
            
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(({ getCellProps, render }) => (
                    <td {...getCellProps()}>
                      {
                        render('Cell')
                      }
                    </td>
                  ))
                }
              </tr>
            )
          })
        }
      </tbody>

      <tfoot>
        {
          footerGroups.map(({ getFooterGroupProps, headers }) => (
            <tr {...getFooterGroupProps()}>
              {
                headers.map(({ getFooterProps, render }) => (
                  <td {...getFooterProps()}>
                    {
                      render('Footer')
                    }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tfoot>

    </table>
  )
}

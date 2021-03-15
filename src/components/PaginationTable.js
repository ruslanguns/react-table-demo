import React, { useMemo } from 'react'
import { usePagination, useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state
  } = useTable({
    columns,
    data,
  }, usePagination)

  const { pageIndex } = state

  return (
    <>
      <table {...getTableProps()}>

        <thead>
          {
            headerGroups.map(({ getHeaderGroupProps, headers }) => (
              <tr {...getHeaderGroupProps()}>
                {
                  headers.map(({ getHeaderProps, render }) => (
                    <th {...getHeaderProps()}>
                      {
                        render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>

        <tbody {...getTableBodyProps()}>
          {
            page.map((row) => {
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

      </table>
      <div className="pagination">

        <span>
          Page {''}
          <strong>
          { pageIndex + 1 } of { pageOptions.length }
          </strong>
        </span>

        <button disabled={!canPreviousPage} type="button" onClick={previousPage}>Previous</button>
        <button disabled={!canNextPage} type="button" onClick={nextPage}>Next</button>
      </div>
    </>
  )
}

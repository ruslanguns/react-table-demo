import React, { useEffect, useMemo } from 'react'
import { usePagination, useTable } from 'react-table'
import { useQueryParam, NumberParam } from "use-query-params";
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const FromParamsTable = () => {
  
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
  const [currentPage = 0, setCurrentPage] = useQueryParam('page', NumberParam);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: !isNaN(currentPage) ? currentPage - 1 : 0 }
  }, usePagination)

  const { pageIndex } = state

  useEffect(() => {
    if(currentPage === 0 || isNaN(currentPage)) {
      gotoPage(0)
    }
    setCurrentPage(pageIndex+1)

  }, [pageIndex, setCurrentPage, currentPage, gotoPage])


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

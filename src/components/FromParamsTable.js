import React, { useEffect, useMemo } from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import { NumberParam, StringParam, useQueryParams, withDefault } from "use-query-params";
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const FromParamsTable = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const defaultPageSize = 10

  const [query, setQuery] = useQueryParams({
    page: withDefault(NumberParam, 0),
    size: withDefault(NumberParam, defaultPageSize),
    sort: withDefault(StringParam, ''),
  })

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
    state: { pageIndex, sortBy },
    setPageSize
  } = useTable({
    columns,
    data,
    initialState: {
      pageSize: (!isNaN(query.size) ? query.size : defaultPageSize),
      pageIndex: (!isNaN(query.page) ? query.page - 1 : 0),
      sortBy: [{
        id: ((query.sort.charAt(0) === '-') ? query.sort.substring(1) : query.sort),
        desc: query.sort.charAt(0) === '-'
      }]
    },
    manualSorting: false,
    manualPagination: false
  },
    useSortBy,
    usePagination
  )

  // Handling page size state
  useEffect(() => {
    if (query.size > pageOptions.length) {
      setPageSize(pageOptions.length)
      setQuery({
        ...query,
        size: pageOptions.length
      })
    }
    if(query.size <= 0 || isNaN(query.size)) {
      setPageSize(defaultPageSize)
      setQuery({
        ...query,
        size: defaultPageSize
      })
    }
  }, [setQuery, query, pageOptions, setPageSize, defaultPageSize])

  // Handling sorting state
  useEffect(() => {
    if (sortBy.length) {
      const { id, desc } = sortBy[0]
      setQuery({
        ...query,
        sort: `${desc ? '-' : ''}${id}`
      })
    } else {
      setQuery({
        ...query,
        sort: ''
      })
    }
  }, [sortBy, gotoPage, setQuery, query])

  // Handling page state
  useEffect(() => {
    if ((query.page <= 0) || isNaN(query.page) || (query.page > pageOptions.length)) {
      gotoPage(0)
    }
    setQuery({
      ...query,
      page: pageIndex + 1
    })
  }, [pageIndex, setQuery, query, gotoPage, pageOptions])

  return (
    <>
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
                          ? (isSortedDesc ? <strong> &#10514;</strong> : <strong> &#10515;</strong>)
                          : <strong> &#8693;</strong>
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

        <span className="summary">
          Page {''}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>

        <button 
          disabled={!canPreviousPage} 
          type="button" 
          onClick={() => gotoPage(0)}>
            &laquo;
        </button>
        <button 
          disabled={!canPreviousPage} 
          type="button" 
          onClick={previousPage}>
            &lsaquo;
        </button>
        <button 
          disabled={!canNextPage} 
          type="button" 
          onClick={nextPage}>
            &rsaquo;
        </button>
        <button 
          disabled={!canNextPage} 
          type="button" 
          onClick={() => gotoPage(pageOptions.length -1 )}>
            &raquo;
        </button>
      </div>
    </>
  )
}

import React, { useEffect, useMemo } from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import { useQueryParam, NumberParam, StringParam } from "use-query-params";
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns'
import './table.css'

export const FromParamsTable = () => {

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const defaultPageSize = 10
  const [pageParam = 0, setPageParam] = useQueryParam('page', NumberParam);
  const [sizeParam = defaultPageSize, setSizeParam] = useQueryParam('size', NumberParam);
  const [sortParam = '', setSortParam] = useQueryParam('sort', StringParam);

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
      pageSize: (!isNaN(sizeParam) ? sizeParam : defaultPageSize),
      pageIndex: (!isNaN(pageParam) ? pageParam - 1 : 0),
      sortBy: [{
        id: ((sortParam.charAt(0) === '-') ? sortParam.substring(1) : sortParam),
        desc: sortParam.charAt(0) === '-'
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
    if (sizeParam > pageOptions.length) {
      setSizeParam(pageOptions.length)
      setPageSize(pageOptions.length)
    }
    if(sizeParam <= 0 || isNaN(sizeParam)) {
      setSizeParam(defaultPageSize)
      setPageSize(defaultPageSize)
    }
  }, [setSizeParam, sizeParam, pageOptions, setPageSize])

  // Handling sorting state
  useEffect(() => {
    if (sortBy.length) {
      const { id, desc } = sortBy[0]
      setSortParam(`${desc ? '-' : ''}${id}`)
    } else {
      setSortParam('')
    }
  }, [sortBy, setSortParam, gotoPage])

  // Handling page state
  useEffect(() => {
    if ((pageParam <= 0) || isNaN(pageParam) || (pageParam > pageOptions.length)) {
      gotoPage(0)
    }
    setPageParam(pageIndex + 1)
  }, [pageIndex, setPageParam, pageParam, gotoPage, pageOptions])

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

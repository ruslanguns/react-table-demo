import React, { useMemo } from 'react'
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS, /** GROUPED_COLUMNS */ } from './columns'
import { GlobalFilter } from './GlobalFilter'
import './table.css'
import { ColumnFilter } from './ColumnFilter'

export const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const defaultColumn = useMemo(() => ({
    Filter: ColumnFilter
  }), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({
    columns,
    data,
    defaultColumn
  }, useFilters, useGlobalFilter, useSortBy)

  const { globalFilter } = state

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(({ getHeaderGroupProps, headers }) => (
              <tr {...getHeaderGroupProps()}>
                {
                  headers.map(({ getHeaderProps, render, getSortByToggleProps, isSorted, isSortedDesc, canFilter }) => (
                    <th {...getHeaderProps(getSortByToggleProps())}>
                      {
                        render('Header')
                      }
                      <div>
                        {
                          canFilter ? render('Filter') : null
                        }
                      </div>
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
    </>
  )
}

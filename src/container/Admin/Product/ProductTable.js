import React from 'react'
import styled from 'styled-components'
import {useTable, usePagination} from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

function Table({columns, data}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns,
            data,
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <table className="table table-striped table-hover" {...getTableProps()}>
                <thead className="bg-dark text-white">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="pagination d-flex justify-content-between">
                <div>
                    <span>
                        Page{' '}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                    </span>
                </div>
                <div>
                    <button className={`btn btn-sm mx-1 ${!canPreviousPage ? 'btn-secondary' : 'btn-dark'}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>
                    {' '}
                    <button className={`btn btn-sm mx-1 ${!canPreviousPage ? 'btn-secondary' : 'btn-dark'}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    {' '}
                    <button className={`btn btn-sm mx-1 ${!canNextPage ? 'btn-secondary' : 'btn-dark'}`} onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    {' '}
                    <button className={`btn btn-sm mx-1 ${!canNextPage ? 'btn-secondary' : 'btn-dark'}`} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>
                    {' '}
                </div>
                <div>
                    <select className="form-select"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    )
}

function ProductTable({userData}) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'Id',
            },
            {
                Header: 'H??nh ???nh',
                accessor: 'image',
            },
            {
                Header: 'T??n s???n ph???m',
                accessor: 'name',
            },
            {
                Header: 'Gi?? hi???n t???i',
                accessor: 'price',
            },
            {
                Header: 'Danh m???c',
                accessor: 'category',
            },
            {
                Header: 'Ng?????i b??n',
                accessor: 'saler',
            },
            {
                Header: 'Th???i gian m??? b??n',
                accessor: 'start_date',
            },
            {
                Header: 'Th???i gian k???t th??c',
                accessor: 'end_date',
            },
            {
                Header: 'Thao t??c',
                accessor: 'actions',
            },
        ],
        []
    )
    const data = React.useMemo(() => userData,[]);

    return (
        <Styles>
            <Table columns={columns} data={data}/>
        </Styles>
    )
}

export default ProductTable
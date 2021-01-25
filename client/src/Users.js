import React, { useEffect } from "react";
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getInfos } from './actions/infoActions';
import PropTypes from 'prop-types';

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppNavbar_2 from "./components/AppNavbar_2";

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            <div style={{ marginTop: '25px' }}>
                Search:{' '}
                <input
                    className="form-control"
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                />
            </div>
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <div>
            <div>
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <table striped className="table" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {/* Render the columns filter UI */}
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        {/* Add a sort direction indicator */}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' '
                                                    : ' '
                                                : ''}
                                        </span>
                                    </th>
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
            </div>
            <div>
                <ul className="pagination">
                    <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <a style={{ color: 'black' }} className="page-link">First</a>
                    </li>
                    <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <a style={{ color: 'black' }} className="page-link">{'<'}</a>
                    </li>
                    <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                        <a style={{ color: 'black' }} className="page-link">{'>'}</a>
                    </li>
                    <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <a style={{ color: 'black' }} className="page-link">Last</a>
                    </li>
                    <li>
                        <a style={{ color: 'black' }} className="page-link">
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </a>
                    </li>
                    <li>
                        <a className="page-link">
                            <input
                                className="form-control"
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '100px', height: '20px' }}
                            />
                        </a>
                    </li>{' '}
                    <select
                        className="form-control"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        style={{ width: '120px', height: '38px' }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </ul>
            </div>
            <div>

            </div>
        </div>
    )
}

function Users(props) {

    useEffect(() => {
        props.getInfos();
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Full Name',
                columns: [
                    {
                        Header: () => {
                            return <div>Name <FontAwesomeIcon style={{ color: 'grey' }} icon={['fas', 'sort']} /></div>
                        },
                        accessor: 'name'
                    }
                ]
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Email',
                        accessor: 'email'
                    },
                    {
                        Header: 'Phone Number',
                        accessor: 'phoneNo'
                    },
                    {
                        Header: 'Date of Birth',
                        accessor: 'dateOfBirth'
                    },
                    {
                        Header: () => {
                            return <div>Gender <FontAwesomeIcon style={{ color: 'grey' }} icon={['fas', 'sort']} /></div>
                        },
                        accessor: 'gender'
                    },
                    {
                        Header: () => {
                            return <div>Education <FontAwesomeIcon style={{ color: 'grey' }} icon={['fas', 'sort']} /></div>
                        },
                        accessor: 'education'
                    }
                ]
            },
        ],
        []
    )

    const data =
        props.info.infos.map(function ({ name, email, phoneNo, dateOfBirth, gender, education }) {
            return (
                {
                    "name": name.toLowerCase(),
                    "email": email,
                    "phoneNo": phoneNo,
                    "dateOfBirth": dateOfBirth,
                    "gender": gender,
                    "education": education
                }
            );
        })


    return (
        <div>
            <div>
                <AppNavbar_2 />
            </div>
            <Container>
                <Table columns={columns} data={data} />
            </Container>
        </div>
    )
}

Users.propTypes = {
    getInfos: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    info: state.info
});

const mapDispatchToProps = dispatch => {
    return {
        getInfos: () => dispatch(getInfos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
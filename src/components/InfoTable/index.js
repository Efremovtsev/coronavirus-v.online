import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { formatNumber } from '@src/common/helpers';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const createColumns = () => [
  {
    id: 'country',
    align: 'left',
    label: 'Country',
    render: ({ name, iso2 }) => name,
  },
  {
    id: 'confirmed',
    align: 'right',
    label: 'Confirmed',
    render: ({ confirmed }) => formatNumber(confirmed),
  },
  // {
  //   id: 'recovered',
  //   align: 'left',
  //   label: 'Recovered',
  //   render: ({ recovered }) => recovered,
  // },
  {
    id: 'deaths',
    align: 'right',
    label: 'Deaths',
    render: ({ deaths }) => formatNumber(deaths),
  },
  // {
  //   id: 'active',
  //   align: 'right',
  //   label: 'Active',
  //   render: ({ active }) => active,
  // },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const columns = useMemo(() => createColumns(), []);

  return (
    <TableHead>
      <TableRow>
        {columns.map(({ id, align, label }) => (
          <TableCell key={id} align={align} sortDirection={orderBy === id ? order : false}>
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  tableContainer: {
    maxHeight: '100%',
    scrollbarWidth: 'none',
    overflow: 'inherit',
  },
  paper: {
    background: '#181a1f',
    color: '#d3ddef',
  },
  table: {
    background: '#181a1f',
    color: '#d3ddef',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function InfoTable({ data, selected, setSelected, handleClick }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('confirmed');

  const columns = useMemo(() => createColumns(), []);
  const sortedData = useMemo(() => stableSort(data, getComparator(order, orderBy)), [data, order, orderBy]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const isOther = orderBy !== property;
    setOrder(isOther ? 'desc' : isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table
          stickyHeader
          className={classes.table}
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {sortedData.map(({ iso2, name, confirmed, recovered, deaths, active, countryColor }, index) => {
              const isItemSelected = selected === iso2;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, iso2)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={name + iso2}
                  id={`row-${iso2}`}
                  selected={isItemSelected}
                  className={isItemSelected ? 'active' : ''}
                  data-color={countryColor}
                >
                  {columns.map(({ id, align, label, render }) => (
                    <TableCell key={id + iso2} align={align}>
                      {render({ iso2, name, confirmed, recovered, deaths, active })}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InfoTable;

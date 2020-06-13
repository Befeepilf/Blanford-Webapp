import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import {formatPercent} from '../Util.js';

const useStyles = makeStyles(theme => ({
  table: {
    '& th, & td': {
      border: 'none'
    },
    '& thead': {
      borderTop: '1px solid #fff',
      borderBottom: '1px solid #fff'
    },
    '& thead th:first-child, & thead th:nth-child(3), & tbody th, & tbody td:nth-child(3)': {
      borderRight: '1px solid #fff'
    },
    '& tbody tr:not(:last-child) > *': {
      borderBottom: '1px solid rgba(70, 70, 70, 0.2)'
    },
    '& tbody tr > *': {
      fontSize: '0.8125rem',
      color: '#fff',
      '& small': {
        whiteSpace: 'nowrap',
        color: 'grey',
        '&::before': {
          content: '"("'
        },
        '&::after': {
          content: '")"'
        }
      }
    }
  },
  tableHeadLabel: {
    fontFamily: '"Gotham A", "Gotham B", sans-serif',
    fontSize: '0.875rem',
    color: '#fff'
  }
}));

const tableHead = [
  {id: 'step', numeric: true, disablePadding: true, label: "Schritt im Funnel"},
  {id: 'kpiName', numeric: false, disablePadding: false, label: "Leistungskennzahl"},
  {id: 'kpiValue', numeric: true, disablePadding: true, label: "Wert"},
  {id: 'costsValue', numeric: true, disablePadding: false, label: "Kosten"},
  {id: 'costsName', numeric: false, disablePadding: false, label: ""}
];

export default function FunnelTable(props) {
  const [tableOrderBy, setTableOrderBy] = React.useState('step');
  const [tableSortDirection, setTableSortDirection] = React.useState('asc');

  function changeTableSort(columnId) {
    setTableOrderBy(columnId);
    setTableSortDirection(tableOrderBy === columnId && tableSortDirection === 'asc' ? 'desc' : 'asc');
  }

  function getSortedTableData() {
    if(tableSortDirection && tableOrderBy) {
      const tableData = JSON.parse(JSON.stringify(props.funnel || []));
      const columnId = tableOrderBy;

      const getValue = row => {
        if(columnId === 'step') {
          return row.stepNumber;
        }
        if(columnId === 'kpiName') {
          return row.kpi.name;
        }
        if(columnId === 'kpiValue') {
          return row.kpi.value;
        }
        if(columnId === 'costsValue') {
          return row.costs.value;
        }
        if(columnId === 'cosrsName') {
          return row.costs.per;
        }
      };

      tableData.sort((a, b) => {
        a = getValue(a);
        b = getValue(b);

        if(a > b) {
          return tableSortDirection === 'asc' ? 1 : -1;
        }
        if(a < b) {
          return tableSortDirection === 'asc' ? -1 : 1;
        }
        return 0;
      });

      return tableData;
    }
    return props.funnel;
  }

  const classes = useStyles();
  return(
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {tableHead.map(column => (
            <TableCell
              key={column.id}
              align="center"
              scope={column.label.length ? 'col' : null}
              padding={column.disablePadding ? 'none' : column.id === 'costsValue' ? 'checkbox' : 'default'}
              sortDirection={tableOrderBy === column.id ? tableSortDirection : false}
            >
              <Tooltip
                title="Ordnen"
                placement="bottom"
                enterDelay={300}
              >
                <TableSortLabel
                  className={classes.tableHeadLabel}
                  active={tableOrderBy === column.id}
                  direction={tableSortDirection}
                  onClick={() => {changeTableSort(column.id)}}
                >{column.label}</TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {getSortedTableData().map(step => (
          <TableRow key={step.name}>
            <TableCell component="th" scope="row" align="left">{step.stepNumber}. {step.name}</TableCell>
            <TableCell align="left">{step.kpi.name} <small>{step.kpi.short}</small></TableCell>
            <TableCell align="center"><span className={classNames({[classes.prognosis]: step.kpi.isPrognosis})}>{formatPercent(step.kpi.value) + '%'}</span> <small>NR {step.kpi.nr[0] * 100}-{step.kpi.nr[1] * 100}</small></TableCell>
            <TableCell align="left" size="small">{step.costs.unit}{step.costs.value} <small>NR {step.costs.unit}{step.costs.nr[0]}-{step.costs.unit}{step.costs.nr[1]}</small></TableCell>
            <TableCell align="left">pro {step.costs.per} <small>{step.costs.short}</small></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

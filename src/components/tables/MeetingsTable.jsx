import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PhonelinkOffIcon from '@mui/icons-material/PhonelinkOff';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import ServicesStore from '../../store/ServicesStore';
import { grey, red } from '@material-ui/core/colors';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const columns = [  { id: 'type', label: <strong>סוג שירות:</strong>, minWidth: 130, format: (value) => value.toLocaleString('en-US'), align: 'right', },
  {
    id: 'dateTime',
    label: <strong>מועד:</strong>,
    minWidth: 130,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'clienName',
    label: <strong>שם לקוח:</strong>,
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'clienAddress',
    label: <strong>כתובת:</strong>,
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'clienPhone',
    label: <strong>טלפון:</strong>,
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData( type, dateTime, clienName, clienAddress, clienPhone) {
  return { type, dateTime, clienName, clienAddress, clienPhone };
}
const MeetingsTable = observer(({ i }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orders, setOrdersList] = useState([]);




  useEffect(() => {
    ServicesStore.getOrders();
    console.log(ServicesStore.orders.length)
  }, [])

  // const isWithinComingWeek = (date) => {
  //   const currentDate = new Date();
  //   const rowDate = new Date(date);
  //   return rowDate.getMonth() === currentDate.getMonth()&&
  //   Math.abs(currentDate.getDate()-rowDate.getDate())<=7;
  // };
  function isInComingWeek(date) {
    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); 
    currentDate.setHours(0, 0, 0, 0);
    nextWeek.setHours(0, 0, 0, 0);
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0); 
    return parsedDate >= currentDate && parsedDate <= nextWeek;
  }
   const isCurrentDate = (date) => {
    const currentDate = new Date();
    const rowDate = new Date(date);
    return (
      rowDate.getDate() === currentDate.getDate() &&
      rowDate.getMonth() === currentDate.getMonth() &&
      rowDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = ServicesStore.orders && ServicesStore.orders.map((item) =>
    createData(
      item.type,
      item.dateTime,
      item.name,
      item.address,
      item.phone,
    ),
  );
  return (
    <Paper sx={{ maxWidth:'100%', overflow: 'hidden', right: '3%', marginTop: '20%' }}>
      {rows.length === 0 ? (
        <div className="no-orders-container" style={{position:'absolute',top:'20vh'}}>
          <PhonelinkOffIcon fontSize="large" style={{ width:'100vh',height:'50vh',opacity:0.3 }} />
        <div className="message">לא נרשמו הזמנות ביומן המערכת</div>
      </div>
      ) : (<>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" sx={{ direction: 'rtl' }}>
            <TableHead>
              <TableRow sx={{ direction: 'rtl' }}>
                {columns.map((column, index) => (
                  <TableCell key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth, direction: 'rtl' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => { 
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.description} style={{backgroundColor:isCurrentDate(row['dateTime'])? '#ef5350':isInComingWeek(row['dateTime'])?'#ffcc80':'#ccff90',}}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell align={column.align} >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </>
      )}
    </Paper>
  );
})
export default MeetingsTable





import React from "react";

import {
  Box,
  Card,
  CardContent,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: "200px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  title: {
    fontSize: 14,
  },
});

function HealthSummary({
  records,
  countrySum,
  suspected,
  confirmed,
  updatedAt,
}) {
  const classes = useStyles();

  return (
    <Box my={2}>
      <h2>Summary of Received Reports</h2>
      <p>Last update: {updatedAt}</p>

      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            No. of suspected cases
          </Typography>
          <Typography variant="h4" component="h2">
            {suspected}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            No. of confirmed cases
          </Typography>
          <Typography variant="h4" component="h2">
            {suspected}
          </Typography>
        </CardContent>
      </Card>

      <h3>No. of records for each student</h3>
      <TableContainer component={Paper} style={{ maxWidth: "600px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell align="center">Report count</TableCell>
              <TableCell>Last update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((row) => (
              <TableRow key={row.student_id}>
                <TableCell component="th" scope="row">
                  {row.student_id}
                </TableCell>
                <TableCell align="center">{row.record_count}</TableCell>
                <TableCell>
                  {new Date(row.input_date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>No. of reported students by countries/regions</h3>
      <TableContainer component={Paper} style={{ maxWidth: "400px" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Country/Region</TableCell>
              <TableCell align="center">Student count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(countrySum).map((key) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="center">{countrySum[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default HealthSummary;

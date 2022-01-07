import {
  TableContainer,
  Table as TableMUI,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@material-ui/core";
import React from "react";

const Table = (props) => {
  return (
    <TableContainer>
      <TableMUI>
        <TableHead>
          {props.headCell &&
            props.headCell.map((cell) => {
              return <TableCell>{cell}</TableCell>;
            })}
        </TableHead>
        <TableBody>
          {props.specialists &&
            props.specialists.map((specialist) => {
              return (
                <TableRow key={specialist.id}>
                  <TableCell>{specialist.name}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
};
export default Table;

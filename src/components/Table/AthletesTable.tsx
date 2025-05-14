import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

export default function AthletesTable(
  props: Readonly<{
    type: string;
    data: any;
    columnsHeaders: any;
    searchColumns: Array<string>;
  }>
) {
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "red",
      fontSize: 18,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: "#DBDBDB",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // TODO: corrigir isto
  const filteredRows = props.data
  // const filteredRows = props.data.filter((row: any) =>
  //   props.searchColumns.map((searchColumn) =>
  //     // console.log(row[searchColumn])
  //     row[searchColumn].toLowerCase().includes(searchTerm)
  //   )
  // );

  return (
    <Grid container sx={{ m: 2 }}>
      <Grid size={12} sx={{ mt: 2 }}>
        <Typography variant="h4">{props.type}</Typography>
      </Grid>
      <Grid size={3}>
        <TextField
          label="Procurar por Nome, Escalão, ..."
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={handleSearchTerm}
        />
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              {props.columnsHeaders.map((header: any, index: any) => (
                <StyledTableCell key={index}>{header.label}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length >= 1 ? (
              filteredRows.map((row: any, index: any) => (
                <Tooltip key={index} title={"Consultar"}>
                  <StyledTableRow
                    hover
                    onClick={() => {
                      navigate(`/teams/${row.id}`);
                    }}
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    {props.columnsHeaders.map((header: any, index: any) => (
                      <StyledTableCell component="th" scope="row">
                        {row[header.key]}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                </Tooltip>
              ))
            ) : (
              <StyledTableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <StyledTableCell component="th" scope="row">
                  Não há resultados para essa procura
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

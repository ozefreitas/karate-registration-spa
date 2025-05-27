import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useRemoveIndividualData } from "../../hooks/useIndividualsData";

export default function AthletesTable(
  props: Readonly<{
    type: string;
    data: any;
    columnsHeaders: any;
    searchColumns: Array<string>;
    actions: boolean;
  }>
) {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const removeIndividual = useRemoveIndividualData();

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleClose = async () => {};

  const handleRowEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleAthleteEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleRowDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleIndividualDelete = (
    event: React.MouseEvent<HTMLElement>,
    individualId: string
  ) => {
    event.stopPropagation();
    removeIndividual.mutate(individualId);
    setIsDeleteModalOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#e81c24",
      fontSize: 18,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      // backgroundColor: "gray",
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
  const filteredRows = props.data;
  // const filteredRows = props.data.filter((row: any) =>
  //   props.searchColumns.map((searchColumn) =>
  //     // console.log(row[searchColumn])
  //     row[searchColumn].toLowerCase().includes(searchTerm)
  //   )
  // );

  return (
    <>
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
                {props.actions ? (
                  <StyledTableCell align="center">Ações</StyledTableCell>
                ) : null}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length >= 1 ? (
                filteredRows.map((row: any, index: any) => (
                  <StyledTableRow
                    hover
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {props.columnsHeaders.map((header: any, index: any) => (
                      <StyledTableCell key={index} component="th" scope="row">
                        {row[header.key]}
                      </StyledTableCell>
                    ))}
                    {props.actions ? (
                      <StyledTableCell align="center">
                        <Stack
                          direction={{
                            xs: "row",
                          }}
                          sx={{
                            gap: 2,
                            justifyContent: "center",
                          }}
                        >
                          <Tooltip arrow title="Consultar">
                            <IconButton
                              onClick={() => {
                                if (props.type === "Equipas") {
                                  navigate(`/teams/${row.id}`);
                                } else {
                                  navigate(`/athletes/${row.id}`);
                                }
                              }}
                            >
                              <Visibility color="primary"></Visibility>
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow title="Editar">
                            <IconButton
                              onClick={(e) => {
                                handleRowEdit(e);
                              }}
                            >
                              <Edit color="warning"></Edit>
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow title="Remover">
                            <IconButton
                              onClick={(e) => {
                                handleRowDelete(e);
                              }}
                            >
                              <Delete color="error"></Delete>
                            </IconButton>
                          </Tooltip>
                        </Stack>
                        <Dialog
                          open={isDeleteModalOpen}
                          onClose={handleDeleteModalClose}
                        >
                          <DialogTitle>
                            <Typography variant="h5">Apagar Atleta</Typography>
                          </DialogTitle>
                          <DialogContent>
                            Tem a certeza que pretende apagar este Atleta? Esta
                            ação irá eliminar também todas as inscrições desta
                            Atleta em todas as provas.
                          </DialogContent>
                          <DialogActions>
                            <Stack
                              direction={{
                                xs: "row-reverse",
                                sm: "row",
                              }}
                              sx={{
                                gap: 2,
                                flexShrink: 0,
                                alignSelf: { xs: "flex-end", sm: "center" },
                              }}
                            >
                              <Button
                                size="small"
                                onClick={(e) =>
                                  handleIndividualDelete(e, row.id)
                                }
                                variant="contained"
                              >
                                Confirmar
                              </Button>
                              <Button
                                size="small"
                                onClick={handleDeleteModalClose}
                              >
                                Cancelar
                              </Button>
                            </Stack>
                          </DialogActions>
                        </Dialog>
                      </StyledTableCell>
                    ) : null}
                  </StyledTableRow>
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
      <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Editar Atleta</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

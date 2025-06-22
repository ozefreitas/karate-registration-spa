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
  TableFooter,
  TablePagination,
  Paper,
  tableCellClasses,
  Tooltip,
  Typography,
  IconButton,
  Stack,
  Box,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Edit,
  Delete,
  Visibility,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { useFetchSingleAthleteData } from "../../hooks/useAthletesData";
import EditAthleteModal from "../AthletesModal/EditAthleteModal";
import { useForm } from "react-hook-form";
import DeleteAthleteModal from "../AthletesModal/DeleteAthleteModal";
import EditIndividualModal from "../AthletesModal/EditIndividualModal";
import ChooseEditModal from "../TeamModal/ChooseEditModal";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

export default function AthletesTable(
  props: Readonly<{
    type: "Atletas" | "Equipas" | "Individuais";
    data: any;
    columnsHeaders: any;
    actions: boolean;
    selection: boolean;
    page: number;
    setPage: any;
    pageSize: any;
    setPageSize: any;
  }>
) {
  type Order = "asc" | "desc";
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectionDelete = (event: React.MouseEvent<HTMLElement>) => {
    handleDeleteAllModalOpen();
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isEditConfirmModalOpen, setIsEditConfirmModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] =
    useState<boolean>(false);
  const [isChooseModalOpen, setIsChooseModalOpen] = useState<boolean>(false);
  const [isTeamAthleteEditModalOpen, setIsTeamAthleteEditModalOpen] =
    useState<boolean>(false);
  const [actionedAthlete, setActionedAthlete] = useState<string>("");
  const [chosenAthlete, setChosenAthlete] = useState<string>("");

  const { data: singleAthleteData } =
    useFetchSingleAthleteData(actionedAthlete);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setPageSize(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  const {
    control: athleteControl,
    handleSubmit: athleteHandleSubmit,
    reset: athleteReset,
    formState: { errors: athleteErrors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      graduation: "",
      category: "",
      skip_number: null,
      gender: "",
      is_student: false,
      birthDate: "",
    },
  });

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditConfirmModalClose = () => {
    setIsEditConfirmModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteAllModalOpen = () => {
    setIsDeleteAllModalOpen(true);
  };

  const handleDeleteAllModalClose = () => {
    setIsDeleteAllModalOpen(false);
  };

  const handleChooseModalOpen = () => {
    setIsChooseModalOpen(true);
  };

  const handleChooseModalClose = () => {
    setIsChooseModalOpen(false);
  };

  const handleTeamAthleteEditModalOpen = () => {
    setIsTeamAthleteEditModalOpen(true);
  };

  const handleTeamAthleteEditModalClose = () => {
    setIsTeamAthleteEditModalOpen(false);
  };

  const handleRowEdit = (
    event: React.MouseEvent<HTMLElement>,
    athleteId: string
  ) => {
    event.stopPropagation();
    // update the form with that athlete info
    const formData = {
      firstName: singleAthleteData?.data.first_name,
      lastName: singleAthleteData?.data.last_name,
      graduation: singleAthleteData?.data.graduation,
      category: singleAthleteData?.data.category,
      gender: singleAthleteData?.data.gender,
      skip_number: singleAthleteData?.data.skip_number,
      is_student: singleAthleteData?.data.is_student,
      birthDate: singleAthleteData?.data.birth_date,
    };
    athleteReset(formData);
    setActionedAthlete(athleteId);
    setIsEditModalOpen(true);
  };

  const handleRowEditFromIndiv = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.stopPropagation();
    setActionedAthlete(id);
    setIsEditConfirmModalOpen(true);
  };

  const handleRowEditFromTeam = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsChooseModalOpen(true);
  };

  const handleRowDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.stopPropagation();
    setActionedAthlete(id);
    setIsDeleteModalOpen(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",
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
    textAlign: "center",
    "&:nth-of-type(even)": {
      // backgroundColor: "gray",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      // border: 0,
    },
    cursor: "pointer",
  }));

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.data.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    console.log(id);
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <Grid container sx={{ m: 2, mt: 4 }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              {props.selection ? (
                <StyledTableCell>
                  <label>
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < props.data.length
                      }
                      checked={
                        props.data.length > 0 &&
                        selected.length === props.data.length
                      }
                      onChange={handleSelectAllClick}
                      slotProps={{
                        input: { "aria-label": "select all athletes" },
                      }}
                    />
                  </label>
                </StyledTableCell>
              ) : null}
              {props.columnsHeaders.map((header: any, index: any) => (
                <StyledTableCell key={index}>{header.label}</StyledTableCell>
              ))}
              {props.actions ? <StyledTableCell>Ações</StyledTableCell> : null}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.data.length >= 1 ? (
              props.data.map((row: any) => {
                const isItemSelected = selected.includes(row.id);
                return (
                  <StyledTableRow
                    hover
                    selected={isItemSelected}
                    onClick={(event) => handleRowClick(event, row.id)}
                    key={row.id}
                  >
                    {props.selection ? (
                      <StyledTableCell>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          slotProps={{
                            input: { "aria-label": "select athlete" },
                          }}
                        />
                      </StyledTableCell>
                    ) : null}
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
                                  navigate(`/teams/${row.id}/`);
                                } else {
                                  navigate(`/athletes/${row.id}/`);
                                }
                              }}
                            >
                              <Visibility color="primary"></Visibility>
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow title="Editar">
                            <IconButton
                              onClick={(e) => {
                                if (props.type == "Individuais") {
                                  handleRowEditFromIndiv(e, row.id);
                                } else if (props.type == "Equipas") {
                                  handleRowEditFromTeam(e);
                                } else {
                                  handleRowEdit(e, row.id);
                                }
                              }}
                            >
                              <Edit color="warning"></Edit>
                            </IconButton>
                          </Tooltip>
                          <Tooltip arrow title="Remover">
                            <IconButton
                              onClick={(e) => {
                                handleRowDelete(e, row.id);
                              }}
                            >
                              <Delete color="error"></Delete>
                            </IconButton>
                          </Tooltip>
                        </Stack>
                        {props.type === "Equipas" ? (
                          <ChooseEditModal
                            isModalOpen={isChooseModalOpen}
                            handleModalClose={handleChooseModalClose}
                            isEditModalOpen={isTeamAthleteEditModalOpen}
                            handleEditModalClose={
                              handleTeamAthleteEditModalClose
                            }
                            handleEditModalOpen={handleTeamAthleteEditModalOpen}
                            id={row.id}
                            chosenAthlete={chosenAthlete}
                            setChosenAthlete={setChosenAthlete}
                            reset={athleteReset}
                            control={athleteControl}
                            errors={athleteErrors}
                            handleSubmit={athleteHandleSubmit}
                          ></ChooseEditModal>
                        ) : null}
                      </StyledTableCell>
                    ) : null}
                  </StyledTableRow>
                );
              })
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
          <TableFooter>
            <TableRow>
              <StyledTableCell>
                <Tooltip arrow title="Remover Selecionados">
                  <IconButton
                    disabled={selected.length === 0}
                    onClick={(e) => {
                      handleSelectionDelete(e);
                    }}
                  >
                    <Delete
                      color={selected.length === 0 ? "disabled" : "error"}
                    ></Delete>
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
              <TablePagination
                // labelRowsPerPage="Entradas por página:"
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={props.data.length}
                rowsPerPage={props.pageSize}
                page={props.page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "entradas por pagina",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {props.type !== "Equipas" ? (
        <>
          <EditAthleteModal
            isModalOpen={isEditModalOpen}
            handleModalClose={handleEditModalClose}
            id={actionedAthlete}
            control={athleteControl}
            errors={athleteErrors}
            handleSubmit={athleteHandleSubmit}
          ></EditAthleteModal>
          <EditIndividualModal
            isModalOpen={isEditConfirmModalOpen}
            handleModalClose={handleEditConfirmModalClose}
            handleEditModalOpen={handleEditModalOpen}
            id={actionedAthlete}
            reset={athleteReset}
            control={athleteControl}
            errors={athleteErrors}
          ></EditIndividualModal>
        </>
      ) : null}
      {selected.length > 0 ? (
        <DeleteAthleteModal
          isModalOpen={isDeleteAllModalOpen}
          handleModalClose={handleDeleteAllModalClose}
          handleModalOpen={handleDeleteAllModalOpen}
          from={props.type}
          id={props.data.length === selected.length ? undefined : selected}
          setSelected={setSelected}
        ></DeleteAthleteModal>
      ) : (
        <DeleteAthleteModal
          isModalOpen={isDeleteModalOpen}
          handleModalClose={handleDeleteModalClose}
          handleModalOpen={handleDeleteModalOpen}
          from={props.type}
          id={actionedAthlete}
          setSelected={setSelected}
        ></DeleteAthleteModal>
      )}
    </Grid>
  );
}

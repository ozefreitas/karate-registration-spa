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
import { useFetchSingleAthleteData } from "../../hooks/useAthletesData";
import EditAthleteModal from "../AthletesModal/EditAthleteModal";
import { useForm } from "react-hook-form";
import DeleteAthleteModal from "../AthletesModal/DeleteAthleteModal";
import EditIndividualModal from "../AthletesModal/EditIndividualModal";

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
  const [isEditConfirmModalOpen, setIsEditConfirmModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const fetchSingleAthlete = useFetchSingleAthleteData();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
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

  const handleRowEditFromIndiv = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsEditConfirmModalOpen(true);
  };

  const handleRowEdit = (
    event: React.MouseEvent<HTMLElement>,
    athleteId: string
  ) => {
    event.stopPropagation();
    fetchSingleAthlete.mutate(athleteId, {
      onSuccess: (data: any) => {
        const formData = {
          firstName: data?.data.first_name,
          lastName: data?.data.last_name,
          graduation: data?.data.graduation,
          category: data?.data.category,
          gender: data?.data.gender,
          skip_number: data?.data.skip_number,
          is_student: data?.data.is_student,
          birthDate: data?.data.birth_date,
        };
        reset(formData);
        setIsEditModalOpen(true);
      },
    });
  };

  const handleRowDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
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

  // TODO: corrigir isto
  const filteredRows = props.data;
  // const filteredRows = props.data.filter((row: any) =>
  //   props.searchColumns.map((searchColumn) =>
  //     // console.log(row[searchColumn])
  //     row[searchColumn].toLowerCase().includes(searchTerm)
  //   )
  // );

  return (
    <Grid container sx={{ m: 2 }}>
      <Grid size={12} sx={{ mt: 2 }}>
        <Typography variant="h4" sx={{ m: 2 }}>
          {props.type}
        </Typography>
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
              filteredRows.map((row: any) => (
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
                              if (props.type == "Individuais") {
                                handleRowEditFromIndiv(e);
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
                              handleRowDelete(e);
                            }}
                          >
                            <Delete color="error"></Delete>
                          </IconButton>
                        </Tooltip>
                      </Stack>
                      <EditAthleteModal
                        isModalOpen={isEditModalOpen}
                        handleModalClose={handleEditModalClose}
                        id={row.athlete_id}
                        control={control}
                        errors={errors}
                        handleSubmit={handleSubmit}
                      ></EditAthleteModal>
                      <EditIndividualModal
                        isModalOpen={isEditConfirmModalOpen}
                        handleModalClose={handleEditConfirmModalClose}
                        handleEditModalOpen={handleEditModalOpen}
                        id={row.athlete_id}
                        reset={reset}
                        control={control}
                        errors={errors}
                      ></EditIndividualModal>
                      <DeleteAthleteModal
                        isModalOpen={isDeleteModalOpen}
                        handleModalClose={handleDeleteModalClose}
                        handleModalOpen={handleDeleteModalOpen}
                        id={row.id}
                        from={props.type}
                      ></DeleteAthleteModal>
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
  );
}

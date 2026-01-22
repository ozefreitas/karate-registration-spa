import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
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
  tableRowClasses,
  Tooltip,
  Typography,
  IconButton,
  Stack,
  Box,
  Checkbox,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  FirstPage,
  LastPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import EditMemberModal from "../Modals/EditMemberModal";
import DeleteMemberModal from "../Modals/DeleteMemberModal";
import EditIndividualModal from "../Modals/EditIndividualModal";
import ChooseEditModal from "../TeamModal/ChooseEditModal";
import CategoryInfoModal from "../Categories/CategoryInfoModal";
import EditMemberActivePaymentModal from "../Modals/EditMemberActivePaymentModal";
import EditPaymentPlanModal from "../Modals/EditPaymentPlanModal";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: Readonly<TablePaginationActionsProps>) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 3 }}>
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

function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export default function AllUseTable(
  props: Readonly<{
    type:
      | "Atletas"
      | "Equipas"
      | "Individuais"
      | "Modalidades"
      | "Categorias"
      | "CategoriasReadOnly"
      | "EventCategories"
      | "Treinadores"
      | "Pagamentos"
      | "PagamentosAnuais"
      | "Plano";
    discipline?: any;
    data: any;
    count: number;
    columnsHeaders: any;
    actions: boolean;
    selection: boolean;
    notWatchable?: boolean;
    editable?: boolean;
    deletable?: boolean;
    page?: number;
    setPage?: any;
    pageSize?: any;
    setPageSize?: any;
    userRole: string;
    selectedDisciplineForCategory?: any;
    disciplineCategories?: any;
    setDisciplineCategories?: any;
    overideInternalPage?: boolean;
    disallowEdit?: boolean;
  }>,
) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramPage = searchParams.get("page") || "0";

  useEffect(() => {
    if (props.setPage && props.page) {
      if (paramPage === "0") {
        props.setPage("1");
      } else props.setPage(paramPage);
    }
  }, [paramPage]);

  const changePage = (number: string) => {
    setSearchParams({ page: number });
  };
  const navigate = useNavigate();
  const [internalPage, setInternalPage] = useState<number>(0);
  const [internalPageSize, setInternalPageSize] = useState<number>(
    props.overideInternalPage ? -1 : 10,
  );
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectionDelete = () => {
    handleDeleteAllModalOpen();
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const [isEditConfirmModalOpen, setIsEditConfirmModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] =
    useState<boolean>(false);
  const [isChooseModalOpen, setIsChooseModalOpen] = useState<boolean>(false);
  const [isTeamMemberEditModalOpen, setIsTeamMemberEditModalOpen] =
    useState<boolean>(false);
  const [actionedRow, setActionedRow] = useState<string>("");
  const [chosenMember, setChosenMember] = useState<string>("");
  const [isCategoryInfoModalOpen, setIsCategoryInfoModalOpen] =
    useState<boolean>(false);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (props.setPage) {
      // props.setPage(newPage + 1);
      changePage((newPage + 1).toString());
    } else {
      setInternalPage(newPage + 1);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10);
    if (props.setPage && props.setPageSize) {
      props.setPageSize(newSize);
      props.setPage(0);
    } else {
      setInternalPageSize(newSize);
      setInternalPage(0);
    }
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handlePaymentModalOpen = (
    event: React.MouseEvent<HTMLElement>,
    paymentId: string,
  ) => {
    event.stopPropagation();
    setActionedRow(paymentId);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const handlePaymentPlanModalOpen = (
    event: React.MouseEvent<HTMLElement>,
    paymentId: string,
  ) => {
    event.stopPropagation();
    setActionedRow(paymentId);
    setIsPlanModalOpen(true);
  };

  const handlePaymentPlanModalClose = () => {
    setIsPlanModalOpen(false);
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

  const handleChooseModalClose = () => {
    setIsChooseModalOpen(false);
  };

  const handleTeamMemberEditModalOpen = () => {
    setIsTeamMemberEditModalOpen(true);
  };

  const handleTeamMemberEditModalClose = () => {
    setIsTeamMemberEditModalOpen(false);
  };

  const handleCategoryInfoModalOpen = (event: any) => {
    event.stopPropagation();
    setIsCategoryInfoModalOpen(true);
  };

  const handleCategoryInfoModalClose = () => {
    setIsCategoryInfoModalOpen(false);
  };

  const handleRowEdit = (
    event: React.MouseEvent<HTMLElement>,
    memberId: string,
  ) => {
    event.stopPropagation();
    setActionedRow(memberId);
    setIsEditModalOpen(true);
  };

  const handleRowEditFromIndiv = (
    event: React.MouseEvent<HTMLElement>,
    id: string,
  ) => {
    event.stopPropagation();
    setActionedRow(id);
    setIsEditConfirmModalOpen(true);
  };

  const handleRowEditFromTeam = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsChooseModalOpen(true);
  };

  const handleRowDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string,
  ) => {
    event.stopPropagation();
    setActionedRow(id.toString());
    setIsDeleteModalOpen(true);
  };

  const handleCategoryRemove = (
    event: React.MouseEvent<HTMLElement>,
    id: string,
  ) => {
    event.stopPropagation();
    props.setDisciplineCategories((prev: any[]) => {
      const existingDisicpline = prev.findIndex(
        (item) => item.discipline === props.selectedDisciplineForCategory,
      );

      const categories = prev[existingDisicpline].categories;
      const updatedCategories = categories.filter((cat: any) => cat !== id);

      const updatedDiscipline = [...prev];
      updatedDiscipline[existingDisicpline] = {
        ...updatedDiscipline[existingDisicpline],
        categories: updatedCategories,
      };
      return updatedDiscipline;
    });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: "center",
    [`&.${tableCellClasses.head}`]: {
      fontSize: 17,
      // color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      paddingTop: 8,
      paddingBottom: 8,
    },
  }));

  const StyledTableRow = styled(TableRow)<{
    header?: boolean;
    warning?: boolean;
  }>(({ header, warning }) => ({
    [`&.${tableRowClasses.head}`]: {
      backgroundColor: "lightgray",
      border: "4px solid lightgray",
    },
    textAlign: "center",
    cursor: header ? "default" : "pointer",

    backgroundColor: warning ? "rgba(255, 165, 0, 0.10)" : undefined,
    borderLeft: warning ? "4px solid rgba(255, 165, 0, 0.7)" : undefined,
    borderRight: warning ? "4px solid rgba(255, 165, 0, 0.7)" : undefined,

    animation: warning ? "rowWarningPulse 1.5s ease-in-out infinite" : "none",

    "@keyframes rowWarningPulse": {
      "0%": {
        backgroundColor: "rgba(255, 165, 0, 0.08)",
        borderLeftColor: "rgba(255, 165, 0, 0.45)",
      },
      "50%": {
        backgroundColor: "rgba(255, 165, 0, 0.18)",
        borderLeftColor: "rgba(255, 165, 0, 0.95)",
      },
      "100%": {
        backgroundColor: "rgba(255, 165, 0, 0.08)",
        borderLeftColor: "rgba(255, 165, 0, 0.45)",
      },
    },
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const paginatedData = useMemo(() => {
    if (props.page === undefined && props.pageSize === undefined) {
      if (internalPageSize === -1) {
        return props.data;
      }
      const start = internalPage * internalPageSize;
      const end = start + internalPageSize;
      return props.data.slice(start, end);
    } else return props.data;
  }, [props.data, props.page, props.pageSize, internalPage, internalPageSize]);

  return (
    <>
      {props.data.length === 0 ? (
        <Grid sx={{ mt: 1, mb: 3 }} container justifyContent="center" size={12}>
          <Typography variant="h6" sx={{ color: "gray", mt: 2 }}>
            Não foram encontrados registos.
          </Typography>
        </Grid>
      ) : (
        <Grid container sx={{ m: 2 }}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <StyledTableRow header>
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
                            input: { "aria-label": "select all members" },
                          }}
                        />
                      </label>
                    </StyledTableCell>
                  ) : null}
                  {props.columnsHeaders.map((header: any, index: any) => (
                    <StyledTableCell key={index}>
                      {header.label}
                    </StyledTableCell>
                  ))}
                  {props.actions ? (
                    <StyledTableCell>Ações</StyledTableCell>
                  ) : null}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row: any) => {
                  const isItemSelected = selected.includes(row.id);
                  return (
                    <StyledTableRow
                      hover
                      warning={
                        getNestedValue(row, "past_month_payment_status") ===
                        "unpaid"
                      }
                      selected={isItemSelected}
                      onClick={(event) => {
                        if (props.selection) {
                          handleRowClick(event, row.id);
                        }
                      }}
                      key={row.id}
                    >
                      {props.selection ? (
                        <StyledTableCell>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            slotProps={{
                              input: { "aria-label": "select member" },
                            }}
                          />
                        </StyledTableCell>
                      ) : null}
                      {props.columnsHeaders.map((header: any, index: any) => (
                        <StyledTableCell key={index} component="th" scope="row">
                          {getNestedValue(row, header.key)}
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
                            {props.notWatchable ? null : (
                              <Tooltip arrow title="Consultar">
                                <span>
                                  <IconButton
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (props.type === "Equipas") {
                                        navigate(`/teams/${row.id}/`);
                                      } else if (
                                        props.type === "Categorias" ||
                                        props.type === "CategoriasReadOnly" ||
                                        props.type === "EventCategories"
                                      ) {
                                        setActionedRow(row.id.toString());
                                        handleCategoryInfoModalOpen(e);
                                      } else {
                                        navigate(
                                          `/members/${row.id}/?section=personal_info`,
                                        );
                                      }
                                    }}
                                  >
                                    <Visibility color="primary"></Visibility>
                                  </IconButton>
                                </span>
                              </Tooltip>
                            )}
                            {(props.userRole === "main_admin" &&
                              props.editable) ||
                            (props.userRole === "subed_club" &&
                              props.editable) ? (
                              <Tooltip arrow title="Editar">
                                <span>
                                  <IconButton
                                    disabled={
                                      row.can_update_sensitive !== undefined
                                        ? props.disallowEdit &&
                                          row.can_update_sensitive
                                          ? false
                                          : true
                                        : false
                                    }
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (props.type == "Individuais") {
                                        handleRowEditFromIndiv(e, row.id);
                                      } else if (props.type == "Equipas") {
                                        handleRowEditFromTeam(e);
                                      } else if (props.type == "Pagamentos") {
                                        handlePaymentModalOpen(e, row.id);
                                      } else if (props.type === "Plano") {
                                        handlePaymentPlanModalOpen(e, row.id);
                                      } else {
                                        handleRowEdit(e, row.id);
                                      }
                                    }}
                                  >
                                    <Edit
                                      color={
                                        row.can_update_sensitive !== undefined
                                          ? props.disallowEdit &&
                                            row.can_update_sensitive
                                            ? "warning"
                                            : "disabled"
                                          : "warning"
                                      }
                                    ></Edit>
                                  </IconButton>
                                </span>
                              </Tooltip>
                            ) : null}
                            {props.deletable &&
                            (props.userRole === "main_admin" ||
                              props.userRole === "subed_club" ||
                              props.type === "Modalidades" ||
                              props.type === "Individuais") ? (
                              <Tooltip arrow title="Remover">
                                <span>
                                  <IconButton
                                    disabled={
                                      row.can_update_sensitive !== undefined
                                        ? props.disallowEdit &&
                                          row.can_update_sensitive
                                          ? false
                                          : true
                                        : false
                                    }
                                    onClick={(e) => {
                                      if (
                                        props.selectedDisciplineForCategory ===
                                        undefined
                                      ) {
                                        handleRowDelete(e, row.id);
                                      } else {
                                        handleCategoryRemove(e, row.id);
                                      }
                                    }}
                                  >
                                    <Delete
                                      color={
                                        row.can_update_sensitive !== undefined
                                          ? props.disallowEdit &&
                                            row.can_update_sensitive
                                            ? "error"
                                            : "disabled"
                                          : "error"
                                      }
                                    ></Delete>
                                  </IconButton>
                                </span>
                              </Tooltip>
                            ) : null}
                          </Stack>
                          {props.type === "Equipas" ? (
                            <ChooseEditModal
                              isModalOpen={isChooseModalOpen}
                              handleModalClose={handleChooseModalClose}
                              isEditModalOpen={isTeamMemberEditModalOpen}
                              handleEditModalClose={
                                handleTeamMemberEditModalClose
                              }
                              handleEditModalOpen={
                                handleTeamMemberEditModalOpen
                              }
                              id={row.id}
                              chosenMember={chosenMember}
                              setChosenMember={setChosenMember}
                            ></ChooseEditModal>
                          ) : null}
                        </StyledTableCell>
                      ) : null}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {props.selection ? (
                    <StyledTableCell>
                      <Tooltip arrow title="Remover Selecionados">
                        <span>
                          <IconButton
                            disabled={selected.length === 0}
                            onClick={() => {
                              handleSelectionDelete();
                            }}
                          >
                            <Delete
                              color={
                                selected.length === 0 ? "disabled" : "error"
                              }
                            ></Delete>
                          </IconButton>
                        </span>
                      </Tooltip>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell></StyledTableCell>
                  )}
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Todas", value: -1 },
                    ]}
                    count={props.count}
                    rowsPerPage={
                      props.pageSize ? props.pageSize : internalPageSize
                    }
                    page={props.page ? props.page - 1 : internalPage}
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
          {props.type === "Equipas" ||
          props.type === "CategoriasReadOnly" ||
          props.type === "Categorias" ||
          props.type === "EventCategories" ||
          props.type === "Plano" ? null : (
            <>
              <EditMemberModal
                isModalOpen={isEditModalOpen}
                handleModalClose={handleEditModalClose}
                id={actionedRow}
              ></EditMemberModal>
              <EditIndividualModal
                isModalOpen={isEditConfirmModalOpen}
                handleModalClose={handleEditConfirmModalClose}
                handleEditModalOpen={handleEditModalOpen}
                id={actionedRow}
              ></EditIndividualModal>
            </>
          )}
          {selected.length > 0 ? (
            <DeleteMemberModal
              isModalOpen={isDeleteAllModalOpen}
              handleModalClose={handleDeleteAllModalClose}
              handleModalOpen={handleDeleteAllModalOpen}
              from={props.type}
              id={props.data.length === selected.length ? undefined : selected}
              setSelected={setSelected}
              discipline={props.discipline}
            ></DeleteMemberModal>
          ) : (
            <DeleteMemberModal
              isModalOpen={isDeleteModalOpen}
              handleModalClose={handleDeleteModalClose}
              handleModalOpen={handleDeleteModalOpen}
              from={props.type}
              id={actionedRow}
              setSelected={setSelected}
              discipline={props.discipline}
            ></DeleteMemberModal>
          )}
        </Grid>
      )}
      {props.type === "Categorias" ||
      props.type === "CategoriasReadOnly" ||
      props.type === "EventCategories" ? (
        <CategoryInfoModal
          isModalOpen={isCategoryInfoModalOpen}
          handleModalClose={handleCategoryInfoModalClose}
          categoryId={actionedRow}
        ></CategoryInfoModal>
      ) : null}
      {props.type === "Pagamentos" ? (
        <EditMemberActivePaymentModal
          isOpen={isPaymentModalOpen}
          handleClose={handlePaymentModalClose}
          paymentId={actionedRow}
        ></EditMemberActivePaymentModal>
      ) : null}
      {props.type === "Plano" ? (
        <EditPaymentPlanModal
          handleModalClose={handlePaymentPlanModalClose}
          isModalOpen={isPlanModalOpen}
          id={actionedRow}
        ></EditPaymentPlanModal>
      ) : null}
    </>
  );
}

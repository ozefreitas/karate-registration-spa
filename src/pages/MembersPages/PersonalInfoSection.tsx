import { Grid, Button, Tooltip } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DeleteMemberModal from "../../components/Modals/DeleteMemberModal";
import {
  Delete,
  Edit,
  Update,
  Clear,
  ContentCopy,
  Person,
  InfoOutlined,
} from "@mui/icons-material";
import { membersHooks } from "../../hooks";
import { useAuth } from "../../access/GlobalAuthProvider";
import { useSearchParams } from "react-router-dom";
import WeightConfirmModal from "../../components/Modals/WeightConfirmModal";
import { isFloat } from "../../utils/utils";
import { useSnackbar } from "notistack";
import DuplicateMemberModal from "../../components/Modals/DuplicateMemberModal";
import RequestModal from "../../components/Modals/RequestModal";
import {
  FieldBox,
  FieldRow,
  SectionBlock,
} from "../../components/Members/MemberInfoSection";
import { RequestTypeEnum } from "../../openapi";

export default function PersonalInfoSection(
  props: Readonly<{ memberData: any }>,
) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const userRole = user?.role;

  const [searchParams] = useSearchParams();
  const editField = searchParams.get("edit_field");

  const isValidated = props.memberData?.is_validated;

  useEffect(() => {
    if (editField === "weight") {
      if (watch("weight") === "N/A") {
        setValue("weight", "");
      }
      setIsEditMode(true);
    }
  }, [editField]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] =
    useState<boolean>(false);
  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] =
    useState<boolean>(false);
  const [isWeightRedirectionModalOpen, setIsWeightRedirectionModalOpen] =
    useState<boolean>(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);

  const handleRequestExamModalOpen = () => {
    setIsRequestModalOpen(true);
  };

  const handleRequestExamModalClose = () => {
    setIsRequestModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsDeleteMemberModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteMemberModalOpen(false);
  };

  const handleDuplicateModalOpen = () => {
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicateModalClose = () => {
    setIsDuplicateModalOpen(false);
  };

  const handleWeightModalOpen = () => {
    setIsWeightRedirectionModalOpen(true);
  };

  const handleWeightModalClose = () => {
    setIsWeightRedirectionModalOpen(false);
  };

  // const updateMember = membersHooks.useUpdateMemberData();
  const patchMember = membersHooks.usePatchMemberData();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      firstName: props.memberData?.first_name,
      lastName: props.memberData?.last_name,
      age: props.memberData?.age,
      graduation: props.memberData?.graduation,
      id_number:
        props.memberData?.id_number === null
          ? "N/A"
          : props.memberData?.id_number,
      gender: props.memberData?.gender,
      taxNumber:
        props.memberData?.taxpayer_number === null
          ? "N/A"
          : props.memberData?.taxpayer_number,
      postCode: props.memberData?.post_code,
      registrationDate: props.memberData?.registration_date,
      cardNumber:
        props.memberData?.national_card_number === null
          ? "N/A"
          : props.memberData?.national_card_number,
      address:
        props.memberData?.address === null || props.memberData?.address === ""
          ? "N/A"
          : props.memberData?.address,
      competitor: props.memberData?.member_types?.includes("athlete"),
      birthDate: props.memberData?.birth_date,
      quotesLegible: props.memberData?.quotes_legible,
      weight:
        props.memberData?.weight === null ? "N/A" : props.memberData?.weight,
      observations:
        props.memberData?.observations === null ||
        props.memberData?.observations === ""
          ? "N/A"
          : props.memberData?.observations,
      conditions:
        props.memberData?.conditions === null ||
        props.memberData?.conditions === ""
          ? "N/A"
          : props.memberData?.conditions,
    },
  });

  useEffect(() => {
    reset({
      firstName: props.memberData?.first_name,
      lastName: props.memberData?.last_name,
      age: props.memberData?.age,
      graduation: props.memberData?.graduation,
      id_number:
        props.memberData?.id_number === null
          ? "N/A"
          : props.memberData?.id_number,
      gender: props.memberData?.gender,
      taxNumber:
        props.memberData?.taxpayer_number === null
          ? "N/A"
          : props.memberData?.taxpayer_number,
      postCode: props.memberData?.post_code,
      registrationDate: props.memberData?.registration_date,
      cardNumber:
        props.memberData?.national_card_number === null
          ? "N/A"
          : props.memberData?.national_card_number,
      address:
        props.memberData?.address === null || props.memberData?.address === ""
          ? "N/A"
          : props.memberData?.address,
      competitor: props.memberData?.member_types?.includes("athlete"),
      birthDate: props.memberData?.birth_date,
      quotesLegible: props.memberData?.quotes_legible,
      weight:
        props.memberData?.weight === null ? "N/A" : props.memberData?.weight,
      observations:
        props.memberData?.observations === null ||
        props.memberData?.observations === ""
          ? "N/A"
          : props.memberData?.observations,
      conditions:
        props.memberData?.conditions === null ||
        props.memberData?.conditions === ""
          ? "N/A"
          : props.memberData?.conditions,
    });
  }, [props.memberData]);

  const onSubmit = (data: any) => {
    if (isFloat(data.weight)) {
      enqueueSnackbar("Peso tem de ser um número real inteiro!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
      });
      return;
    }
    if (
      editField === "weight"
      // || !["main_admin", "superuser"].includes(userRole)
    ) {
      const payload = {
        personId: props.memberData?.id,
        data: { weight: data.weight },
      };
      patchMember.mutateAsync(payload, {
        onError: () => {
          setValue("weight", props.memberData?.weight);
        },
      });
    } else {
      if (Object.keys(dirtyFields).length === 0) {
        setIsEditMode(false);
        reset();
        return;
      }
      const formData = {
        first_name:
          data.firstName === props.memberData?.first_name
            ? null
            : data.firstName,
        last_name:
          data.lastName === props.memberData?.last_name ? null : data.lastName,
        graduation:
          data.graduation === props.memberData?.graduation
            ? null
            : data.graduation,
        id_number:
          data.id_number === "N/A" ||
          data.id_number === "" ||
          data.id_number === props.memberData?.id_number
            ? null
            : data.id_number,
        gender: data.gender === props.memberData?.gender ? null : data.gender,
        taxpayer_number:
          data.taxNumber === "N/A" ||
          data.taxNumber === "" ||
          data.taxNumber === props.memberData?.taxpayer_number
            ? null
            : data.taxNumber,
        post_code:
          data.postCode === "N/A" ||
          data.postCode === "" ||
          data.postCode === props.memberData?.post_code
            ? null
            : data.postCode,
        registration_date:
          data.registrationDate === props.memberData?.registration_date
            ? null
            : data.registrationDate,
        national_card_number:
          data.cardNumber === "N/A" ||
          data.cardNumber === "" ||
          data.cardNumber === props.memberData?.national_card_number
            ? null
            : data.cardNumber,
        address:
          data.address === "N/A" ||
          data.address === "" ||
          data.address === props.memberData?.address
            ? null
            : data.address,
        conditions:
          data.conditions === "N/A" ||
          data.conditions === "" ||
          data.conditions === props.memberData?.conditions
            ? null
            : data.conditions,
        observations:
          data.observations === "N/A" ||
          data.observations === "" ||
          data.observations === props.memberData?.observations
            ? null
            : data.observations,
        member_type:
          data.competitor && props.memberData?.member_types.includes("athlete")
            ? null
            : !data.competitor &&
                props.memberData?.member_types.includes("student")
              ? null
              : data.competitor &&
                  props.memberData?.member_types.includes("student")
                ? "athlete"
                : !data.competitor &&
                    props.memberData?.member_types.includes("athlete")
                  ? "student"
                  : null,
        quotes_legible:
          data.quotesLegible === props.memberData?.quotes_legible
            ? null
            : data.quotesLegible,
        birth_date:
          data.birthDate === props.memberData?.birth_date
            ? null
            : data.birthDate,
        weight:
          data.weight === "N/A" ||
          data.weight === "" ||
          data.weight === props.memberData?.weight
            ? null
            : data.weight,
      };
      const updateData = {
        personId: props.memberData?.id,
        data: formData,
      };
      console.log(props.memberData?.member_types);
      console.log(data.competitor);
      patchMember.mutate(updateData, {
        onSuccess: (data: any) => {
          setValue("age", data.data.age);
          if (editField === "weight") {
            handleWeightModalOpen();
          }
        },
        onError: () => {
          reset();
        },
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("update_button")?.click();
      } else if (event.key === "Escape") {
        event.preventDefault();
        document.getElementById("escape_button")?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Grid>
      <Grid
        size={12}
        container
        justifyContent={"space-between"}
        mb={3}
        spacing={2}
      >
        <Grid>
          {["superuser", "subed_club"].includes(userRole!) ? (
            <Grid>
              <Tooltip
                title={
                  props.memberData?.member_types.length === 2
                    ? "Este Membro já tem 2 tipos de praticante"
                    : null
                }
                placement="right"
                arrow
              >
                <span>
                  <Button
                    variant="outlined"
                    disabled={props.memberData?.member_types.length === 2}
                    onClick={() => handleDuplicateModalOpen()}
                    startIcon={<ContentCopy />}
                  >
                    Duplicar
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          ) : null}
        </Grid>
        <Grid container>
          {isEditMode ? (
            <>
              <Button
                id="update_button"
                variant="contained"
                color="success"
                onClick={() => {
                  handleSubmit(onSubmit)();
                  setIsEditMode(false);
                }}
                startIcon={<Update />}
              >
                Atualizar
              </Button>
              <Button
                id="escape_button"
                variant="contained"
                color="inherit"
                onClick={() => {
                  reset();
                  setIsEditMode(false);
                }}
                startIcon={<Clear />}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="warning"
              onClick={() => {
                if (isEditMode === false) {
                  if (getValues("address") === "N/A") {
                    setValue("address", "");
                  }
                  if (getValues("conditions") === "N/A") {
                    setValue("conditions", "");
                  }
                  if (getValues("observations") === "N/A") {
                    setValue("observations", "");
                  }
                }
                setIsEditMode(true);
              }}
              startIcon={<Edit />}
            >
              Editar
            </Button>
          )}
          {["main_admin", "superuser", "subed_club"].includes(userRole!) ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              disabled={!isValidated}
              onClick={handleModalOpen}
            >
              Remover
            </Button>
          ) : null}
        </Grid>
      </Grid>
      {/* Main Info Section */}
      <SectionBlock
        icon={<Person sx={{ fontSize: 18 }} />}
        title="Informações Pessoais"
        status={true}
        verified={props.memberData?.is_validated}
      >
        <FieldRow>
          <Grid container size={6}>
            <FieldBox
              label="Primeiro Nome"
              control={control}
              name="firstName"
              type="text"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
          <Grid container size={6}>
            <FieldBox
              label="Último Nome"
              control={control}
              name="lastName"
              type="text"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
        </FieldRow>
        <FieldRow>
          <Grid container size={6}>
            <FieldBox
              label="Data de Nascimento"
              control={control}
              name="birthDate"
              type="date"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
          <Grid container size={6}>
            <FieldBox
              label="Idade (real)"
              control={control}
              name="age"
              type="number"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
        </FieldRow>
        <FieldRow>
          <Grid container size={6}>
            <FieldBox
              label={`Número ${import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}`}
              control={control}
              name="id_number"
              type="number"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
          <Grid container size={6}>
            <FieldBox
              label="Graduação"
              control={control}
              name="graduation"
              type="dropdown"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
              hasRequest
              is_validated={props.memberData?.is_validated}
              exam_request_status={props.memberData?.exam_request_status}
              handleOpen={handleRequestExamModalOpen}
            />
          </Grid>
        </FieldRow>
        <FieldRow>
          <Grid container size={6}>
            <FieldBox
              label="Género"
              control={control}
              name="gender"
              type="dropdown"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
          {["subed_club", "single_admin"].includes(userRole!) ? (
            <Grid container size={6}>
              <FieldBox
                label="Peso"
                control={control}
                name="weight"
                type="number"
                isEditMode={isEditMode}
                userRole={userRole}
                isValidated={isValidated}
              />
            </Grid>
          ) : null}
        </FieldRow>
        {["subed_club", "single_admin"].includes(userRole!) ? (
          <FieldRow>
            <Grid container size={6}>
              <FieldBox
                label="Paga Quotas"
                control={control}
                name="quotesLegible"
                type="switch"
                isEditMode={isEditMode}
                userRole={userRole}
                isValidated={isValidated}
              />
            </Grid>
            {props.memberData?.member_types?.includes("athlete") ||
            props.memberData?.member_types?.includes("student") ? (
              <Grid container size={6}>
                <FieldBox
                  label="É Competidor"
                  control={control}
                  name="competitor"
                  type="switch"
                  isEditMode={isEditMode}
                  userRole={userRole}
                  isValidated={isValidated}
                />
              </Grid>
            ) : null}
          </FieldRow>
        ) : null}
        <FieldRow>
          <Grid container size={6}>
            <FieldBox
              label="Data de Inscrição"
              control={control}
              name="registrationDate"
              type="date"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
        </FieldRow>
      </SectionBlock>
      <Grid m={5}></Grid>
      {/* Additional Info Section */}
      <SectionBlock
        icon={<InfoOutlined sx={{ fontSize: 18 }} />}
        title="Detalhes Adicionais"
        status={false}
        verified={false}
      >
        <FieldRow>
          <Grid container size={6}>
            <FieldBox
              label="Morada"
              control={control}
              name="address"
              type="text"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
          <Grid container size={6}>
            <FieldBox
              label="NIF"
              control={control}
              name="taxNumber"
              type="number"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
        </FieldRow>
        <FieldRow>
          <Grid container size={6}>
            <FieldBox
              label="Número C.C./B.I."
              control={control}
              name="cardNumber"
              type="number"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
        </FieldRow>
        {["subed_club", "single_admin"].includes(userRole!) ? (
          <FieldRow>
            <Grid container size={12}>
              <FieldBox
                label="Condições Médicas/Alergias/Medicações"
                control={control}
                name="conditions"
                type="text"
                isEditMode={isEditMode}
                userRole={userRole}
                isValidated={isValidated}
              />
            </Grid>
          </FieldRow>
        ) : null}
        {["subed_club", "single_admin"].includes(userRole!) ? (
          <Grid container py={1.5} size={12}>
            <FieldBox
              label="Observações"
              control={control}
              name="observations"
              type="text"
              isEditMode={isEditMode}
              userRole={userRole}
              isValidated={isValidated}
            />
          </Grid>
        ) : null}
      </SectionBlock>

      <DuplicateMemberModal
        handleModalClose={handleDuplicateModalClose}
        isModalOpen={isDuplicateModalOpen}
        memberData={props.memberData}
      ></DuplicateMemberModal>
      <DeleteMemberModal
        from="Atletas"
        handleModalClose={handleModalClose}
        handleModalOpen={handleModalOpen}
        isModalOpen={isDeleteMemberModalOpen}
        id={props.memberData?.id}
      ></DeleteMemberModal>
      <WeightConfirmModal
        handleModalClose={handleWeightModalClose}
        isModalOpen={isWeightRedirectionModalOpen}
        id={searchParams.get("event_id")}
      ></WeightConfirmModal>
      <RequestModal
        id={props.memberData?.id}
        isOpen={isRequestModalOpen}
        handleClose={handleRequestExamModalClose}
        requestType={RequestTypeEnum.EXAMS}
      ></RequestModal>
    </Grid>
  );
}

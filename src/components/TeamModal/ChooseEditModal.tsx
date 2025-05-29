import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
  Box,
  CircularProgress,
} from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useFetchSingleTeamData } from "../../hooks/useTeamsData";
import { useFetchSingleAthleteData } from "../../hooks/useAthletesData";
import EditAthleteModal from "../AthletesModal/EditAthleteModal";
import { useForm } from "react-hook-form";
import EditTeamModal from "./EditTeamModal";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChooseEditModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    isEditModalOpen: boolean;
    handleEditModalOpen: any;
    handleEditModalClose: any;
    id: string;
    chosenAthlete: string;
    setChosenAthlete: any;
    reset: any;
    control: any;
    errors: any;
    handleSubmit: any;
  }>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<any>(null);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] =
    useState<boolean>(false);
  const fetchSingleTeam = useFetchSingleTeamData();
  const fetchSingleAthlete = useFetchSingleAthleteData();

  const handleEditTeamModalOpen = () => {
    setIsEditTeamModalOpen(true)
  }

   const handleEditTeamModalClose = () => {
    setIsEditTeamModalOpen(false)
  }

  const {
    control: teamControl,
    handleSubmit: teamHandleSubmit,
    reset: teamReset,
    formState: { errors: teamErrors },
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

  useEffect(() => {
    if (props.isModalOpen && props.id) {
      setIsLoading(true);
      fetchSingleTeam.mutate(props.id, {
        onSuccess: (data: any) => {
          setIsLoading(false);
          setTeamData(data);
          // const formData = {
          //   firstName: data?.data.first_name,
          //   lastName: data?.data.last_name,
          //   graduation: data?.data.graduation,
          //   category: data?.data.category,
          //   gender: data?.data.gender,
          //   skip_number: data?.data.skip_number,
          //   is_student: data?.data.is_student,
          //   birthDate: data?.data.birth_date,
          // };
          // teamReset(formData);
          handleEditTeamModalOpen();
        },
      });
    }
  }, [props.id]);

  const handleEdit = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    fetchSingleAthlete.mutate(id, {
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
        props.reset(formData);
        props.handleModalClose();
        props.setChosenAthlete(id);
        props.handleEditModalOpen();
      },
    });
  };

  const handleTeamEdit = (
    event: React.MouseEvent<HTMLElement>,
    teamId: string
  ) => {};

  return (
    <>
      <Dialog
        open={props.isModalOpen}
        onClose={props.handleModalClose}
        maxWidth="md"
        fullWidth
        slots={{
          transition: Transition,
        }}
      >
        <DialogTitle>
          <Typography variant="h5">Selecionar o que editar</Typography>
        </DialogTitle>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <DialogContent>
              Uma Equipa é constituída por pelo menos 2 Atletas, sendo que pode
              editar tanto aspetos da Equipa como os próprios Atletas.
            </DialogContent>
            <Stack
              direction={{
                xs: "row-reverse",
                sm: "row",
              }}
              sx={{
                p: 2,
                gap: 4,
                flexShrink: 0,
                alignSelf: { xs: "flex-end", sm: "center" },
              }}
            >
              <Button
                size="small"
                onClick={(e) => handleTeamEdit(e, props.id)}
                variant="contained"
              >
                Editar Equipa
              </Button>
            </Stack>
            <Stack
              direction={{
                xs: "row-reverse",
                sm: "row",
              }}
              sx={{
                p: 2,
                gap: 4,
                flexShrink: 0,
                alignSelf: { xs: "flex-end", sm: "center" },
              }}
            >
              {teamData?.data.athlete1 !== null ? (
                <Button
                  size="small"
                  onClick={(e) => handleEdit(e, teamData?.data.athlete1.id)}
                  variant="contained"
                >
                  Editar {teamData?.data.athlete1_full_name}
                </Button>
              ) : null}
              {teamData?.data.athlete2 !== null ? (
                <Button
                  size="small"
                  onClick={(e) => handleEdit(e, teamData?.data.athlete2.id)}
                  variant="contained"
                >
                  Editar {teamData?.data.athlete2_full_name}
                </Button>
              ) : null}
              {teamData?.data.athlete3 !== null ? (
                <Button
                  size="small"
                  onClick={(e) => handleEdit(e, teamData?.data.athlete3.id)}
                  variant="contained"
                >
                  Editar {teamData?.data.athlete3_full_name}
                </Button>
              ) : null}
              {teamData?.data.athlete4 !== null ? (
                <Button
                  size="small"
                  onClick={(e) => handleEdit(e, teamData?.data.athlete4.id)}
                  variant="contained"
                >
                  Editar {teamData?.data.athlete4_full_name}
                </Button>
              ) : null}
              {teamData?.data.athlete5 !== null ? (
                <Button
                  size="small"
                  onClick={(e) => handleEdit(e, teamData?.data.athlete5.id)}
                  variant="contained"
                >
                  Editar {teamData?.data.athlete5_full_name}
                </Button>
              ) : null}
            </Stack>
          </>
        )}
        <DialogActions></DialogActions>
      </Dialog>
      <EditAthleteModal
        isModalOpen={props.isEditModalOpen}
        handleModalClose={props.handleEditModalClose}
        id={props.chosenAthlete}
        control={props.control}
        errors={props.errors}
        handleSubmit={props.handleSubmit}
      ></EditAthleteModal>
      <EditTeamModal
        isModalOpen={isEditTeamModalOpen}
        handleModalClose={handleEditTeamModalClose}
        id={props.id}
        control={teamControl}
        errors={teamErrors}
        handleSubmit={teamHandleSubmit}
      ></EditTeamModal>
    </>
  );
}

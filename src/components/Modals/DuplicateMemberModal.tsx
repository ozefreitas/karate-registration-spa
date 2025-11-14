import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { membersHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DuplicateMemberModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    memberData?: any;
  }>
) {
  const navigate = useNavigate();
  const createMember = membersHooks.useCreateMember();
  const handleSubmit = () => {
    const formData = props.memberData;
    formData.member_type =
      props.memberData?.member_type === "coach" ? "student" : "coach";
    createMember.mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        navigate(`/members/${data.data.id}`);
      },
    });
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle>
        <Typography variant="h5">
          Duplicar {props.memberData?.full_name}
        </Typography>
      </DialogTitle>
      <DialogContent>
        Esta ação irá duplicar este Membro para{" "}
        <strong>
          {props.memberData?.member_type === "coach"
            ? "Competidor/Aluno"
            : "Treinador"}
        </strong>
        . <p></p>Deseja prosseguir?
      </DialogContent>
      <DialogActions>
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
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
          >
            Confirmar
          </Button>
          <Button size="small" onClick={props.handleModalClose}>
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

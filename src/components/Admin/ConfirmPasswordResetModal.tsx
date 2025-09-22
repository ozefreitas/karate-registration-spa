import {
  Dialog,
  DialogContent,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { TransitionProps } from "notistack";
import { Close } from "@mui/icons-material";
import { adminHooks } from "../../hooks";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmPasswordResetModal(
  props: Readonly<{ isOpen: boolean; handleClose: any }>
) {
  const createPasswordResetRequest = adminHooks.useCreatePasswordResetRequest();
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      maxWidth="md"
      fullWidth
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          width: "99%",
          margin: "auto",
          marginTop: "8px",
          backgroundColor: "#e81c24",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Reiniciar Password
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid sx={{ m: 2, mb: 0 }} container justifyContent="center">
          <Typography>
            Esta ação irá criar um pedido para reiniciar a sua password. Irá
            receber um link no seu email, enviado pelo seu administrador, onde
            poderá depois criar uma nova palavra-passe. <p></p> Tem a certeza
            que deseja prosseguir com este pedido? Se sim, insira o username ou
            email associados à sua conta e clique em <strong>Confirmar</strong>.
            <br />
            Sem um username ou email válido não será possível recuperar a sua
            conta!
          </Typography>

          <TextField
            sx={{ m: 3, mb: 0 }}
            color="warning"
            variant={"outlined"}
            label="Username/Email"
            required
            fullWidth
            value={usernameOrEmail}
            onChange={(e) => {
              setUsernameOrEmail(e.target.value);
            }}
          />
        </Grid>
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
              createPasswordResetRequest.mutate({
                username_or_email: usernameOrEmail,
              });
            }}
            variant="contained"
          >
            Confirmar
          </Button>
          <Button size="small" onClick={props.handleClose}>
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

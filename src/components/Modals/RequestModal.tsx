import {
  Dialog,
  DialogContent,
  Slide,
  Button,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
  Grid,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { TransitionProps } from "notistack";
import { membersHooks } from "../../hooks";
import { CloudUpload, Delete, InsertDriveFile } from "@mui/icons-material";
import { RequestTypeEnum } from "../../openapi";
import { ColoredIconBox } from "../icon-utils/boxes";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function RequestModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    id: string;
    requestType: RequestTypeEnum;
  }>,
) {
  const [requestText, setRequestText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any>(undefined);
  const createMemberValidationRequest =
    membersHooks.useCreateMemberValidationRequest();

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("person", props.id);
    formData.append("message", requestText);
    formData.append("request_type", props.requestType);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    createMemberValidationRequest.mutate({
      person: props.id,
      message: requestText,
      request_type: props.requestType,
      file: selectedFile,
    });
    props.handleClose();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle variant="h5" sx={{ p: 3 }}>
        {props.requestType === "exams"
          ? "Pedido de Proposta de Exame"
          : props.requestType === "verify"
            ? "Pedido de Validação de Membro"
            : "Pedido Geral"}
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        {props.requestType === "verify" ? (
          <>
            <p>
              Esta ação irá fazer um pedido ao seu administrador de forma a
              validar este Membro, tornando-se parte integrante da lista oficial
              de Membros.
            </p>
            <p>
              Tenha a certeza de que os campos introduzidos estão corretos, uma
              vez que campos sensíveis não poderão ser alterados novamente após
              a validação ser confirmada.
            </p>
            <p>
              Introduza uma mensagem para informar o administrador de informação
              que ache pertinente.
            </p>
          </>
        ) : props.requestType === "exams" ? (
          <>
            <p>
              Esta ação irá fazer um pedido ao seu administrador de forma a
              propor este Membro a exame de graduação.
            </p>
            <p>
              Terá de anexar o ficheiro de Proposta de Exame assinado pelos
              responsáveis do Clube.
            </p>
            {selectedFile === undefined ? (
              <Button
                sx={{ mb: 1 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Escolher Ficheiro
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event: any) => {
                    setSelectedFile(event.target.files[0]);
                  }}
                />
              </Button>
            ) : (
              <Grid
                size={12}
                mb={1}
                width={"100%"}
                container
                borderRadius={2}
                p={2}
                justifyContent={"space-between"}
                alignItems={"center"}
                border={"1px solid #FF8FA3A1"}
                sx={{ color: "#800f2f" }}
              >
                <Grid container spacing={2}>
                  <ColoredIconBox
                    bgColor={"red"}
                    color={"#fff"}
                    border={"1px solid red"}
                    icon={<InsertDriveFile></InsertDriveFile>}
                  />
                  <Grid>
                    <Typography sx={{ color: "black" }}>
                      {selectedFile.name}
                    </Typography>
                    <Typography variant="body2">
                      Tamanho: {selectedFile.size}
                    </Typography>
                  </Grid>
                </Grid>

                <IconButton onClick={() => setSelectedFile(undefined)}>
                  <Delete color="error" />
                </IconButton>
              </Grid>
            )}
            <p>
              Introduza uma mensagem para informar o seu administrador de outras
              informações que ache relevante para complementar à proposta de
              exame.
            </p>
          </>
        ) : (
          <p>Escreva uma memnsagem</p>
        )}
        <Grid container>
          <TextField
            color="warning"
            variant={"outlined"}
            label="Mensagem"
            fullWidth
            multiline
            maxRows={4}
            value={requestText}
            onChange={(e) => {
              setRequestText(e.target.value);
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
            gap: 3,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button size="small" onClick={() => onSubmit()} variant="contained">
            Confirmar
          </Button>
          <Button
            size="small"
            onClick={() => {
              props.handleClose();
            }}
          >
            Cancelar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

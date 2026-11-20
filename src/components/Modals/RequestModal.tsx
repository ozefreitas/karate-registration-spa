import { CloudUpload, Delete, InsertDriveFile } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { membersHooks } from "../../hooks";
import { RequestTypeEnum } from "../../openapi";
import { ColoredIconBox } from "../icon-utils/boxes";
import InfoBaseModal from "../base-modals/InfoBaseModal";

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
    handleClose: () => void;
    id: string;
    requestType: RequestTypeEnum;
  }>,
) {
  const [requestText, setRequestText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const createMemberValidationRequest =
    membersHooks.useCreateMemberValidationRequest();

  const onSubmit = () => {
    createMemberValidationRequest.mutate({
      person: props.id,
      message: requestText,
      request_type: props.requestType,
      file: selectedFile?.name,
    });
    props.handleClose();
  };

  const title =
    props.requestType === "exams"
      ? "Pedido de Proposta de Exame"
      : props.requestType === "verify"
        ? "Pedido de Validação de Membro"
        : "Pedido Geral";

  const subheader =
    props.requestType === "exams"
      ? "Envie a proposta assinada e uma mensagem ao administrador."
      : props.requestType === "verify"
        ? "Peça ao administrador para validar os dados deste membro."
        : "Escreva uma mensagem para enviar ao administrador.";

  return (
    <InfoBaseModal
      isModalOpen={props.isOpen}
      size="sm"
      handleModalClose={props.handleClose}
      title={title}
      subheader={subheader}
      onSubmit={onSubmit}
      disableConfirm={createMemberValidationRequest.isPending}
    >
      <Stack spacing={2} sx={{ py: 1 }}>
        {props.requestType === "verify" ? (
          <>
            <Typography color="text.secondary">
              A validação torna este membro parte integrante da lista oficial.
              Confirme que os dados estão corretos, pois alguns campos sensíveis
              não poderão ser alterados após a validação.
            </Typography>
            <Typography color="text.secondary">
              Use a mensagem para partilhar qualquer informação relevante com o
              administrador.
            </Typography>
          </>
        ) : props.requestType === "exams" ? (
          <>
            <Typography color="text.secondary">
              Anexe o ficheiro da proposta de exame assinado pelos responsáveis
              do clube.
            </Typography>
            {selectedFile ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  p: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{ minWidth: 0 }}
                >
                  <ColoredIconBox
                    bgColor="red"
                    color="#fff"
                    border="1px solid red"
                    icon={<InsertDriveFile />}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      fontWeight={600}
                      sx={{ overflowWrap: "anywhere" }}
                    >
                      {selectedFile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tamanho: {selectedFile.size} bytes
                    </Typography>
                  </Box>
                </Stack>
                <IconButton
                  aria-label="Remover ficheiro"
                  onClick={() => setSelectedFile(undefined)}
                >
                  <Delete color="error" />
                </IconButton>
              </Box>
            ) : (
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUpload />}
                sx={{ alignSelf: "flex-start" }}
              >
                Escolher ficheiro
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                    }
                  }}
                />
              </Button>
            )}
            <Typography color="text.secondary">
              Pode acrescentar uma mensagem com informação complementar à
              proposta.
            </Typography>
          </>
        ) : (
          <Typography color="text.secondary">
            Escreva a mensagem que pretende enviar ao administrador.
          </Typography>
        )}
        <Grid container>
          <TextField
            color="warning"
            variant="outlined"
            label="Mensagem"
            fullWidth
            multiline
            maxRows={4}
            rows={2}
            value={requestText}
            onChange={(event) => setRequestText(event.target.value)}
          />
        </Grid>
      </Stack>
    </InfoBaseModal>
  );
}

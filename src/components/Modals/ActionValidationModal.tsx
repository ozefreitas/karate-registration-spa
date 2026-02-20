import {
  Dialog,
  DialogContent,
  Slide,
  Button,
  DialogActions,
  DialogTitle,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TransitionProps } from "notistack";
import { membersHooks } from "../../hooks";
import { GraduationsOptions } from "../../config";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ActionValidationModal(
  props: Readonly<{
    isOpen: boolean;
    handleClose: any;
    id: string;
    request_type: "general" | "verify" | "exams";
    type: "approve" | "reject" | null;
    personData?: any;
  }>,
) {
  const [requestText, setRequestText] = useState("");
  const [selectedGrad, setSelectedGrad] = useState(
    props.personData?.graduation ?? "",
  );

  const patchMember = membersHooks.usePatchMemberData();

  useEffect(() => {
    if (props.personData !== undefined) {
      setSelectedGrad(props.personData.graduation);
    }
  }, [props.personData]);

  const patchMemberValidationStatus =
    membersHooks.usePatchMemberValidationRequest();

  const onSubmit = () => {
    patchMemberValidationStatus.mutate({
      validationId: props.id,
      data: {
        status: props.type === "approve" ? "approved" : "rejected",
        request_type: props.request_type,
        admin_comment: requestText,
      },
    });

    // only calls the member patch if selected graduation is different from original
    if (
      props.request_type === "exams" &&
      props.personData.graduation !== selectedGrad
    ) {
      const payload = {
        personId: props.personData.id,
        data: { graduation: selectedGrad },
      };
      patchMember.mutate(payload);
    }
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
        {props.type === "approve" && props.request_type === "verify"
          ? "Validar Membro"
          : props.type === "reject" && props.request_type === "verify"
            ? "Rejeitar Membro"
            : props.type === "approve" && props.request_type === "exams"
              ? "Aprovar Proposta"
              : "Rejeitar Proposta"}
      </DialogTitle>
      <DialogContent
        sx={{
          borderBottom: "1px solid lightgrey",
          borderTop: "1px solid lightgrey",
        }}
      >
        {props.type === "approve" && props.request_type === "verify" ? (
          <>
            <p>
              Está prestes a validar este Membro. Depois disto, este Membro
              ficará disponível para ser inscrito em Eventos.
            </p>
            <p>Pode anexar uma mensagem para informar o Clube.</p>
          </>
        ) : props.request_type === "verify" && props.type === "reject" ? (
          <>
            <p>
              Está a rejeitar a validação deste Membro. O Clube será notificado
              e poderá enviar um novo pedido logo a seguir.
            </p>
            <p>
              Anexe uma mensagem para informar o Clube desta decisão, e o que
              deverá fazer para corrigir a informação deste Membro.
            </p>
          </>
        ) : props.request_type === "exams" && props.type === "approve" ? (
          <p>
            Está prestes a aceitar a Porposta de Exame deste Membro. Depois
            disto, este Membro transitará de graduação. <br /> Se assim o
            desejar, pode selecionar a nova graduação deste Membro, atualizando
            o seu perfil.
          </p>
        ) : (
          <>
            <p>
              Está a rejeitar a Proposta de Exame desde Membro. O Clube será
              notificado de tal, e poderá enviar uma nova Proposta logo a
              seguir.
            </p>
            <p>
              Anexe uma mensagem para informar o Clube desta decisão, e o que
              deverá fazer para a corrigir.
            </p>
          </>
        )}
        {props.request_type === "exams" && props.type === "approve" ? (
          <TextField
            sx={{ mt: 1 }}
            color="warning"
            variant="outlined"
            label="Graduação"
            fullWidth
            select
            value={selectedGrad}
            helperText="Graduações mais baixas que a atual aparecerão a cinzento, mas podem ser selecionadas."
            onChange={(e) => {
              setSelectedGrad(e.target.value);
            }}
          >
            {GraduationsOptions.map((item, index) => {
              const isLowerOrEqual = item.value >= props.personData.graduation;

              return (
                <MenuItem
                  key={index}
                  value={item.value}
                  sx={{
                    color: isLowerOrEqual ? "grey.500" : "text.primary",
                  }}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </TextField>
        ) : null}
        {props.request_type === "exams" && props.type === "approve" ? (
          <p>Pode anexar uma mensagem para informar o Clube.</p>
        ) : null}
        <TextField
          color="warning"
          variant={"outlined"}
          label="Mensagem"
          fullWidth
          multiline
          maxRows={5}
          value={requestText}
          onChange={(e) => {
            setRequestText(e.target.value);
          }}
        />
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

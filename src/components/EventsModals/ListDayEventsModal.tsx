import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Stack,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EventsListSingleCard from "./EventsListSingleCard";
import InfoRow from "../General/InfoRow";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListDayEventsModal(
  props: Readonly<{
    date: string;
    isModalOpen: boolean;
    handleModalClose: any;
    eventsData?: any;
  }>,
) {
  const navigate = useNavigate();
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      slots={{
        transition: Transition,
      }}
    >
      <DialogTitle
        sx={{
          borderTop: `red`,
          width: "100%",
        }}
      >
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"start"}
          mt={1}
        >
          <Grid>
            <Typography fontWeight={"bold"} m={2} ml={1} mt={0} variant="h4">
              Lista de Eventos em {props.date}
            </Typography>
            {/* <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
              
            </Typography> */}
          </Grid>
          <IconButton
            onClick={props.handleModalClose}
            sx={{ bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
          >
            <Close />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ mt: 3 }}>
        <List sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2 }}>
          {props.eventsData === undefined
            ? null
            : props.eventsData.map((item: any, index: string) => (
                <Tooltip
                  key={index}
                  title={"Ir para página de Evento"}
                  placement="bottom-end"
                >
                  <ListItem
                    sx={{ p: 0 }}
                    onClick={() => {
                      navigate(`${item.id}/`);
                    }}
                  >
                    <EventsListSingleCard
                      description={item.description}
                      title={item.name}
                      type={item.encounter_type}
                    ></EventsListSingleCard>
                  </ListItem>
                </Tooltip>
              ))}
          <ListItem
            sx={{ p: 0 }}
            onClick={() => {
              navigate(`new_event/?date=${props.date}`);
            }}
          >
            <InfoRow
              icon={<Add />}
              value="Adicionar Evento"
              color="green"
              clickable
            ></InfoRow>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Stack
          direction={{
            xs: "row-reverse",
            sm: "row",
          }}
          sx={{
            p: 2,
            pt: 0,
            gap: 3,
            flexShrink: 0,
            alignSelf: { xs: "flex-end", sm: "center" },
          }}
        >
          <Button sx={{ p: 1 }} size="small" onClick={props.handleModalClose}>
            Voltar
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

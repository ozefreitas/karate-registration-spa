import React, { useEffect } from "react";
import { classificationsHooks } from "../../hooks";
import { TransitionProps } from "@mui/material/transitions";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close, Download } from "@mui/icons-material";
import stringAvatar, { stringToColor } from "../../dashboard/utils/avatarColor";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BracketClassificationModal = (props: {
  bracketId: string;
  bracketName: string;
  isModalOpen: boolean;
  handleModalClose: any;
}) => {
  const navigate = useNavigate();
  const {
    data: bracketClassificationData,
    isLoading: isBracketClassificationLoading,
    error: bracketClassificationError,
    refetch,
  } = classificationsHooks.useFetchClassificationsData(props.bracketId);

  useEffect(() => {
    if (props.bracketId !== undefined) {
      refetch();
    }
  }, [props.bracketId]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

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
          borderTop: `5px solid ${stringToColor("Competição/Torneio")}`,
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
            <Chip label="Pódio"></Chip>
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h4">
              {bracketClassificationData?.results[0].event}
            </Typography>
            <Typography fontWeight={"bold"} m={2} ml={1} variant="h5">
              {props.bracketName}
            </Typography>
          </Grid>
          <IconButton
            onClick={props.handleModalClose}
            sx={{ bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
          >
            <Close />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ px: 5 }}>
        {isBracketClassificationLoading ? (
          <Grid mt={3} container justifyContent={"center"} size={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container size={12} spacing={3} alignItems={"end"} pt={3}>
            {bracketClassificationData?.results.map((place, index: number) => {
              const boxShadow =
                place.place === 2
                  ? "0 10px 20px rgba(148, 163, 184, 0.2)"
                  : place.place === 1
                    ? "0 10px 20px rgba(245, 158, 11, 0.3)"
                    : "0 10px 20px rgba(234, 88, 12, 0.2)";
              const background =
                place.place === 2
                  ? "linear-gradient(135deg, #e2e8f0, #cbd5e1)"
                  : place.place === 1
                    ? "linear-gradient(135deg, #fef3c7, #fbbf24)"
                    : "linear-gradient(135deg, #fed7aa, #fb923c)";
              return (
                <Grid key={index} size={4}>
                  <Tooltip title="Ver Atleta">
                    <Box
                      height={
                        place.place === 2 ? 310 : place.place === 1 ? 370 : 270
                      }
                      p={3}
                      width="100%"
                      boxShadow={boxShadow}
                      borderRadius={4}
                      sx={{
                        background: background,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05) translateY(-10px)",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/members/${place.person.id}/`)}
                    >
                      {getRankIcon(place.place)}
                      <Avatar
                        {...stringAvatar(place.person.full_name, 88)}
                      ></Avatar>
                      <Typography variant="h6">
                        {place.person.full_name}
                      </Typography>
                      <Chip variant="filled" label={place.person.club}></Chip>
                    </Box>
                  </Tooltip>
                </Grid>
              );
            })}
            <Grid
              mt={3}
              size={12}
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                size="small"
                variant="contained"
                startIcon={<Download></Download>}
              >
                Obter Lista Completa de Resultados
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Grid
          container
          size={12}
          alignItems={"center"}
          justifyContent={"flex-end"}
          m={1}
        >
          <Button sx={{ p: 1 }} size="small" onClick={props.handleModalClose}>
            Voltar
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default BracketClassificationModal;

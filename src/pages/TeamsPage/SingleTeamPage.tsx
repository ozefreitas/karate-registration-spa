import {
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Chip,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { teamsHooks } from "../../hooks";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import stringAvatar from "../../dashboard/utils/avatarColor";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import DeleteMemberModal from "../../components/Modals/DeleteMemberModal";

export default function SingleTeamPage() {
  const { id: teamId } = useParams<{ id: string }>();
  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] =
    useState<boolean>(false);

  const handleModalOpen = () => {
    setIsDeleteMemberModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteMemberModalOpen(false);
  };

  const {
    data: singleTeamData,
    isLoading: isSingleTeamLoading,
    error: singleTeamError,
  } = teamsHooks.useFetchSingleTeamData(teamId);
  return (
    <>
      <PageInfoCard
        description={
          <>
            <p>
              Nesta página poderá consultar toda a informação inerente de uma
              Equipa, assim como remover esta mesma Equipa.
            </p>
          </>
        }
        title="Perfil de Equipa"
      ></PageInfoCard>
      {isSingleTeamLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : singleTeamError ? (
        <Navigate to={"/not_found/"}></Navigate>
      ) : (
        <Grid container m={4}>
          <Card>
            <Grid container size={12} justifyContent={"flex-end"}>
              <Button
                sx={{ m: 2 }}
                variant="contained"
                size="small"
                color="error"
                startIcon={<Delete />}
                onClick={handleModalOpen}
              >
                Remover
              </Button>
            </Grid>
            <Grid container size={12}>
              <Grid size={6} p={2}>
                <Card>
                  <CardContent
                    sx={{
                      "&:last-child": {
                        paddingBottom: 2,
                      },
                    }}
                  >
                    {isSingleTeamLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Typography
                        variant="h6"
                        px={2}
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        Escalão: {singleTeamData?.data.category.name}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={6} p={2}>
                <Card>
                  <CardContent
                    sx={{
                      "&:last-child": {
                        paddingBottom: 2,
                      },
                    }}
                  >
                    {isSingleTeamLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Typography
                        variant="h6"
                        px={2}
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        Género: {singleTeamData?.data.gender}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <Grid size={4}>
                <Card elevation={3}>
                  <CardContent sx={{ p: 4, width: "100%" }}>
                    <Grid
                      size={12}
                      container
                      justifyContent={"center"}
                      spacing={2}
                    >
                      <Avatar
                        {...stringAvatar(
                          singleTeamData?.data.athlete1.full_name,
                          128,
                        )}
                      ></Avatar>
                      <Typography
                        width={"100%"}
                        textAlign={"center"}
                        variant="h4"
                      >
                        {singleTeamData?.data.athlete1.full_name}
                      </Typography>
                      <Grid container justifyContent={"center"} mt={2}>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete1.age} anos
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete1.gender}
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete1.weight} Kg
                      `}
                        ></Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card elevation={3}>
                  <CardContent sx={{ p: 4, width: "100%" }}>
                    <Grid
                      size={12}
                      container
                      justifyContent={"center"}
                      spacing={2}
                    >
                      <Avatar
                        {...stringAvatar(
                          singleTeamData?.data.athlete2.full_name,
                          128,
                        )}
                      ></Avatar>
                      <Typography
                        width={"100%"}
                        textAlign={"center"}
                        variant="h4"
                      >
                        {singleTeamData?.data.athlete2.full_name}
                      </Typography>
                      <Grid container justifyContent={"center"} mt={2}>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete2.age} anos
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete2.gender}
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete2.weight} Kg
                      `}
                        ></Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card elevation={3}>
                  <CardContent sx={{ p: 4, width: "100%" }}>
                    <Grid
                      size={12}
                      container
                      justifyContent={"center"}
                      spacing={2}
                    >
                      <Avatar
                        {...stringAvatar(
                          singleTeamData?.data.athlete3.full_name,
                          128,
                        )}
                      ></Avatar>
                      <Typography
                        width={"100%"}
                        textAlign={"center"}
                        variant="h4"
                      >
                        {singleTeamData?.data.athlete3.full_name}
                      </Typography>
                      <Grid container justifyContent={"center"} mt={2}>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete3.age} anos
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete3.gender}
                      `}
                        ></Chip>
                        <Chip
                          sx={{ p: 1 }}
                          label={`
                        ${singleTeamData?.data.athlete3.weight} Kg
                      `}
                        ></Chip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
      <DeleteMemberModal
        from="Equipas"
        handleModalClose={handleModalClose}
        handleModalOpen={handleModalOpen}
        isModalOpen={isDeleteMemberModalOpen}
        id={teamId}
      ></DeleteMemberModal>
    </>
  );
}

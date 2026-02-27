import {
  Typography,
  Button,
  Card,
  CardHeader,
  Grid,
  CardActions,
  CardContent,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { FrontHand, PersonSearch, Upgrade, DoneAll } from "@mui/icons-material";
import { membersHooks } from "../../hooks";

interface MemberRequestsCardProps {
  onResolve?: () => void;
}

function StatRow({
  icon,
  label,
  value,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: number;
}>) {
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
    >
      <Grid container alignItems={"center"} spacing={3}>
        <Grid
          width={45}
          height={45}
          borderRadius={2}
          bgcolor={"#fdf6ea"}
          container
          alignItems={"center"}
          justifyContent={"center"}
        >
          {icon}
        </Grid>
        <Typography variant="h6" sx={{ color: "#555", fontWeight: 500 }}>
          {label}
        </Typography>
      </Grid>
      <Typography
        variant="h4"
        fontWeight={700}
        color={value === 0 ? "textDisabled" : "warning"}
        sx={{ minWidth: 32, textAlign: "right" }}
      >
        {value}
      </Typography>
    </Grid>
  );
}

export default function MemberRequestsCard({
  onResolve,
}: Readonly<MemberRequestsCardProps>) {
  const {
    data: memberValidationRequestsData,
    isLoading: isMemberValidationRequestsLoading,
    error: memberValidationRequestsError,
  } = membersHooks.useFetchMemberValidationRequestsData("main_admin");

  return (
    <Card
      sx={{
        overflow: "hidden",
        m: 2,
      }}
    >
      <CardHeader
        title={
          <Grid container alignItems={"center"} gap={2}>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              color={"#fff"}
              bgcolor={"#d38c2f"}
              sx={{
                width: 50,
                height: 50,
                borderRadius: 1.5,
              }}
            >
              <PersonSearch sx={{ fontSize: 28 }} />
            </Grid>
            <Typography variant="h5" fontWeight={"bold"}>
              Pedidos de Membros
            </Typography>
          </Grid>
        }
      ></CardHeader>

      {/* Stats */}
      {memberValidationRequestsError ? (
        <CardContent
          sx={{ display: "flex", justifyContent: "flex-end", pr: 5 }}
        >
          Ocorreu um erro ao coletar o número de clubes com quotas em falta.
          Tente mais tarde ou contacte um administrador.
        </CardContent>
      ) : (
        <CardContent
          sx={{
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          {isMemberValidationRequestsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid px={3} pb={2}>
              <StatRow
                icon={<DoneAll sx={{ fontSize: 22 }} color="warning" />}
                label="Pedidos de Verificação"
                value={
                  memberValidationRequestsData?.results.filter(
                    (item: any) =>
                      item.status === "pending" &&
                      item.request_type === "verify",
                  )?.length!
                }
              />
              <Divider sx={{ borderColor: "#f5f5f5" }} />
              <StatRow
                icon={<Upgrade sx={{ fontSize: 22 }} color="warning" />}
                label="Propostas de exame"
                value={
                  memberValidationRequestsData?.results.filter(
                    (item: any) =>
                      item.status === "pending" &&
                      item.request_type === "exams",
                  )?.length!
                }
              />
              <Divider sx={{ borderColor: "#f5f5f5" }} />
              <StatRow
                icon={<FrontHand sx={{ fontSize: 22 }} color="warning" />}
                label="Pedidos Gerais"
                value={
                  memberValidationRequestsData?.results.filter(
                    (item: any) =>
                      item.status === "pending" &&
                      item.request_type === "general",
                  )?.length!
                }
              />
            </Grid>
          )}
        </CardContent>
      )}
      {/* Footer */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          startIcon={<PersonSearch />}
          onClick={onResolve}
          disableElevation
          color="warning"
        >
          Verificar
        </Button>
      </CardActions>
    </Card>
  );
}

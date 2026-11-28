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
      columnGap={1}
      px={{ xs: 0.5, sm: 1 }}
      py={1}
      sx={{ width: "100%", minWidth: 0, flexWrap: "nowrap" }}
    >
      <Grid
        container
        alignItems={"center"}
        spacing={{ xs: 1, sm: 2 }}
        sx={{ minWidth: 0, flex: 1, flexWrap: "nowrap" }}
      >
        <Grid
          borderRadius={2}
          bgcolor={"#fdf6ea"}
          container
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            flexShrink: 0,
          }}
        >
          {icon}
        </Grid>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            minWidth: 0,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {label}
        </Typography>
      </Grid>
      <Typography
        variant="h4"
        fontWeight={700}
        color={value === 0 ? "textDisabled" : "warning"}
        sx={{
          minWidth: 28,
          flexShrink: 0,
          textAlign: "right",
          fontSize: { xs: "1.5rem", sm: "2.125rem" },
        }}
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
        width: "100%",
        minWidth: 0,
      }}
    >
      <CardHeader
        sx={{
          p: { xs: 1.5, sm: 2 },
          "& .MuiCardHeader-content": { minWidth: 0 },
        }}
        title={
          <Grid
            container
            alignItems={"center"}
            gap={{ xs: 1, sm: 2 }}
            sx={{ minWidth: 0, flexWrap: "nowrap" }}
          >
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              color={"#fff"}
              bgcolor={"#d38c2f"}
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                borderRadius: 1.5,
                flexShrink: 0,
              }}
            >
              <PersonSearch sx={{ fontSize: 18 }} />
            </Grid>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              sx={{
                minWidth: 0,
                fontSize: { xs: "1.05rem", sm: "1.25rem" },
                lineHeight: 1.25,
              }}
            >
              Pedidos de Membros
            </Typography>
          </Grid>
        }
      ></CardHeader>

      {/* Stats */}
      {memberValidationRequestsError ? (
        <CardContent
          sx={{
            px: { xs: 2, sm: 3 },
            textAlign: { xs: "left", sm: "right" },
            overflowWrap: "anywhere",
          }}
        >
          Ocorreu um erro ao coletar o número de clubes com quotas em falta.
          Tente mais tarde ou contacte um administrador.
        </CardContent>
      ) : (
        <CardContent
          sx={{
            pt: 0,
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
            <Grid px={{ xs: 0, sm: 1 }}>
              <StatRow
                icon={<DoneAll sx={{ fontSize: 20 }} color="warning" />}
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
                icon={<Upgrade sx={{ fontSize: 20 }} color="warning" />}
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
                icon={<FrontHand sx={{ fontSize: 20 }} color="warning" />}
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
      <CardActions
        sx={{
          p: { xs: 1.5, sm: 2 },
          pt: 0,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ width: { xs: "100%", sm: "auto" } }}
          size="small"
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

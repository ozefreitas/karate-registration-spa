import {
  Box,
  Button,
  Grid,
  Card,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import { useState } from "react";
import {
  Check,
  Close,
  Warning,
  Https,
  MilitaryTech,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const PricingPage = () => {
  const [selected, setSelected] = useState<string>("mensal");
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  return (
    <>
      <PageInfoCard
        description={
          <>
            Consulte as opções de subscrição da plataforma{" "}
            <strong>
              <i>FightTech</i>
            </strong>
            . Escolha entre pagamentos mensais ou anuais.
          </>
        }
        title="Planos de Subscrição"
      ></PageInfoCard>
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          px: { xs: 2, sm: 3, md: 4 },
          pb: 2,
        }}
      >
        <Grid container justifyContent={"center"} sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "min(100%, 320px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              p: 1,
              bgcolor: "background.paper",
              borderRadius: 12,
            }}
          >
            <Button
              sx={{ borderRadius: 10, flex: 1, minWidth: 0 }}
              variant="contained"
              color={selected === "mensal" ? "primary" : "inherit"}
              onClick={() => {
                setSelected("mensal");
                setHasDiscount(false);
              }}
            >
              Mensal
            </Button>
            <Button
              sx={{ borderRadius: 10, flex: 1, minWidth: 0 }}
              variant="contained"
              color={selected === "anual" ? "primary" : "inherit"}
              onClick={() => {
                setSelected("anual");
                setHasDiscount(true);
              }}
            >
              Anual
            </Button>
          </Box>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          sx={{ width: "100%", mx: 0, mt: { xs: 2, sm: 4 } }}
        >
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                border: 2,
                borderColor: "transparent",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 6,
                  borderColor: "red",
                },
              }}
            >
              <Grid
                container
                sx={{
                  minHeight: { xs: 210, sm: 200 },
                  px: 2,
                  py: 2,
                  boxSizing: "border-box",
                }}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <Typography variant="h6" color="#cd7f32">
                  Base
                </Typography>
                <Typography variant="h5" fontStyle={"italic"}>
                  Ganhe Controlo e Clareza
                </Typography>
                {hasDiscount ? (
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    alignItems={"center"}
                    sx={{ maxWidth: "100%" }}
                  >
                    <Typography
                      variant="h6"
                      pt={1}
                      sx={{ textDecoration: "line-through" }}
                    >
                      360€
                    </Typography>
                    <Typography color="success" pt={1} variant="h4">
                      320€
                    </Typography>
                    <Typography color="success" pt={1} variant="h6">
                      (-11%)
                    </Typography>
                  </Grid>
                ) : (
                  <Typography pt={1} variant="h3">
                    €30
                  </Typography>
                )}
              </Grid>
              <Grid>
                <List sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: 2 }}>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Inscrição em Eventos</ListItemText>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Listagem de Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Informação detalhada de Membro</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Close color="error"></Close>
                    </ListItemIcon>
                    <ListItemText>Registo de novos Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Https color="warning"></Https>
                    </ListItemIcon>
                    <ListItemText>
                      Notificações e Alertas Limitados
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Close color="error"></Close>
                    </ListItemIcon>
                    <ListItemText>Pedidos ao Administrador</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Close color="error"></Close>
                    </ListItemIcon>
                    <ListItemText>ID único para Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Warning color="warning"></Warning>
                    </ListItemIcon>
                    <ListItemText>Suporte Padrão</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Close color="error"></Close>
                    </ListItemIcon>
                    <ListItemText>Estatísticas e relatórios</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Ideal para Clubes que precisam de organização
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                border: 2,
                borderColor: "transparent",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 6,
                  borderColor: "red",
                },
              }}
            >
              <Grid
                container
                sx={{
                  minHeight: { xs: 210, sm: 200 },
                  px: 2,
                  py: 2,
                  boxSizing: "border-box",
                }}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                gap={1}
              >
                <Typography variant="h6" color="silver">
                  Pro
                </Typography>
                <Typography variant="h5" fontStyle={"italic"}>
                  Domine a gestão do seu Clube
                </Typography>
                {hasDiscount ? (
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    alignItems={"center"}
                    sx={{ maxWidth: "100%" }}
                  >
                    <Typography
                      variant="h6"
                      pt={1}
                      sx={{ textDecoration: "line-through" }}
                    >
                      600€
                    </Typography>
                    <Typography color="success" pt={1} variant="h4">
                      500€
                    </Typography>
                    <Typography color="success" pt={1} variant="h6">
                      (-15%)
                    </Typography>
                  </Grid>
                ) : (
                  <Typography pt={1} variant="h3">
                    €50
                  </Typography>
                )}
              </Grid>
              <Grid>
                <List sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: 2 }}>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Inscrição em Eventos</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Listagem de Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Informação detalhada de Membro + estatísticas
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Https color="warning"></Https>
                    </ListItemIcon>
                    <ListItemText>Registo de novos Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Notificações personalizadas em tempo real
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Close color="error"></Close>
                    </ListItemIcon>
                    <ListItemText>Pedidos ao Administrador</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Close color="error"></Close>
                    </ListItemIcon>
                    <ListItemText>ID único para Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Suporte Prioritário</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Estatísticas e relatórios</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Ideal para Clubes em crecimento e competição ativa
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              sx={{
                width: "100%",
                height: "100%",
                border: 2,
                borderColor: "transparent",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 6,
                  borderColor: "red",
                },
              }}
            >
              <Grid
                container
                sx={{
                  minHeight: { xs: 210, sm: 200 },
                  px: 2,
                  py: 2,
                  boxSizing: "border-box",
                }}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <Typography variant="h6" color="gold">
                  Elite
                </Typography>
                <Typography variant="h5" fontStyle={"italic"}>
                  Tenha tudo nas suas mãos
                </Typography>
                {hasDiscount ? (
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    alignItems={"center"}
                    sx={{ maxWidth: "100%" }}
                  >
                    <Typography
                      variant="h6"
                      pt={1}
                      sx={{ textDecoration: "line-through" }}
                    >
                      1200€
                    </Typography>
                    <Typography color="success" pt={1} variant="h4">
                      1000€
                    </Typography>
                    <Typography color="success" pt={1} variant="h6">
                      (-18%)
                    </Typography>
                  </Grid>
                ) : (
                  <Typography pt={1} variant="h3">
                    €100
                  </Typography>
                )}
              </Grid>
              <Grid>
                <List sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: 2 }}>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Inscrição em Eventos</ListItemText>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Listagem de Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Informação detalhada de Membro + estatísticas
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Registo de novos Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Notificações e Alertas personalizados e avançados
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>Pedidos ao Administrador</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>ID único para Membros</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <MilitaryTech color="primary"></MilitaryTech>
                    </ListItemIcon>
                    <ListItemText>Suporte exclusivo e direto</ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Estatísticas e Relatórios + Exportação
                    </ListItemText>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Check color="success"></Check>
                    </ListItemIcon>
                    <ListItemText>
                      Ideal para Associações e gestores com equipas grandes
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, width: "100%", minWidth: 0 }}>
          <Card
            sx={{
              width: "100%",
              minWidth: 0,
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                sm: "minmax(0, 3fr) minmax(0, 9fr)",
                md: "minmax(0, 2fr) minmax(0, 10fr)",
              },
              gap: 1,
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                py: { xs: 1, sm: 0 },
              }}
            >
              <Typography variant="h6">Free</Typography>
            </Box>
            <Grid container spacing={1} sx={{ width: "100%", minWidth: 0 }}>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Check color="success"></Check>
                  </ListItemIcon>
                  <ListItemText>Inscrição em Eventos</ListItemText>
                </ListItem>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Listagem de Membros</ListItemText>
                </ListItem>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Informação detalhada de Membro</ListItemText>
                </ListItem>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Registo de novos Membros</ListItemText>
                </ListItem>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Notificações e Alertas</ListItemText>
                </ListItem>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Pedidos ao Administrador</ListItemText>
                </ListItem>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Warning color="warning"></Warning>
                  </ListItemIcon>
                  <ListItemText>Suporte Padrão</ListItemText>
                </ListItem>
              </Grid>
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                container
                alignItems={"center"}
              >
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Estatísticas e Relatórios</ListItemText>
                </ListItem>
              </Grid>
            </Grid>
          </Card>
        </Box>
        <Grid
          container
          gap={2}
          justifyContent={"center"}
          sx={{ width: "100%", mt: 5 }}
        >
          <Link to={"/contacts/"}>Contactos</Link>.
          <Link to={"/feedback/"}>Feedback</Link>
        </Grid>
      </Box>
    </>
  );
};

export default PricingPage;

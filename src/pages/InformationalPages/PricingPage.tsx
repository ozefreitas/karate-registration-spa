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
  Lightbulb,
  Https,
  MilitaryTech,
} from "@mui/icons-material";

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
      <Grid size={12}>
        <Grid size={12} container justifyContent={"center"}>
          <Box
            width={220}
            height={60}
            bgcolor={"lightgray"}
            borderRadius={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Button
              sx={{ borderRadius: 10 }}
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
              sx={{ borderRadius: 10 }}
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
        <Grid height={800} size={12} container spacing={1} m={1} mt={4}>
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
                height={200}
                container
                pt={2}
                direction={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Typography variant="h6" color="#cd7f32">
                  Base
                </Typography>
                <Typography variant="h5" fontStyle={"italic"}>
                  Ganhe Controlo e Clareza
                </Typography>
                {hasDiscount ? (
                  <Grid container gap={2} alignItems={"center"}>
                    <Typography
                      variant="h6"
                      pt={3}
                      sx={{ textDecoration: "line-through" }}
                    >
                      360€
                    </Typography>
                    <Typography color="success" pt={3} variant="h3">
                      320€
                    </Typography>
                    <Typography color="success" pt={3} variant="h5">
                      (-11%)
                    </Typography>
                  </Grid>
                ) : (
                  <Typography pt={3} variant="h3">
                    €30
                  </Typography>
                )}
              </Grid>
              <Grid>
                <List sx={{ p: 5, pt: 3 }}>
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
                height={200}
                container
                pt={2}
                direction={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Typography variant="h6" color="silver">
                  Pro
                </Typography>
                <Typography variant="h5" fontStyle={"italic"}>
                  Domine a gestão do seu Clube
                </Typography>
                {hasDiscount ? (
                  <Grid container gap={2} alignItems={"center"}>
                    <Typography
                      variant="h6"
                      pt={3}
                      sx={{ textDecoration: "line-through" }}
                    >
                      600€
                    </Typography>
                    <Typography color="success" pt={3} variant="h3">
                      500€
                    </Typography>
                    <Typography color="success" pt={3} variant="h5">
                      (-15%)
                    </Typography>
                  </Grid>
                ) : (
                  <Typography pt={3} variant="h3">
                    €50
                  </Typography>
                )}
              </Grid>
              <Grid>
                <List sx={{ p: 5, pt: 3 }}>
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
                height={200}
                container
                pt={2}
                direction={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Typography variant="h6" color="gold">
                  Elite
                </Typography>
                <Typography variant="h5" fontStyle={"italic"}>
                  Tenha tudo nas suas mãos
                </Typography>
                {hasDiscount ? (
                  <Grid container gap={2} alignItems={"center"}>
                    <Typography
                      variant="h6"
                      pt={3}
                      sx={{ textDecoration: "line-through" }}
                    >
                      1200€
                    </Typography>
                    <Typography color="success" pt={3} variant="h3">
                      1000€
                    </Typography>
                    <Typography color="success" pt={3} variant="h5">
                      (-18%)
                    </Typography>
                  </Grid>
                ) : (
                  <Typography pt={3} variant="h3">
                    €100
                  </Typography>
                )}
              </Grid>
              <Grid height={"70%"}>
                <List sx={{ p: 5, pt: 3 }}>
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
        <Grid m={1} mt={2} size={{ xs: 12 }} height={200}>
          <Card sx={{ width: "100%", display: "flex", p: 3, pl: 1, pr: 1 }}>
            <Grid
              width={"20%"}
              container
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h6">Free</Typography>
            </Grid>
            <Grid container>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Check color="success"></Check>
                  </ListItemIcon>
                  <ListItemText>Inscrição em Eventos</ListItemText>
                </ListItem>
              </Grid>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Listagem de Membros</ListItemText>
                </ListItem>
              </Grid>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Informação detalhada de Membro</ListItemText>
                </ListItem>
              </Grid>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Registo de novos Membros</ListItemText>
                </ListItem>
              </Grid>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Notificações e Alertas</ListItemText>
                </ListItem>
              </Grid>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Pedidos ao Administrador</ListItemText>
                </ListItem>
              </Grid>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Warning color="warning"></Warning>
                  </ListItemIcon>
                  <ListItemText>Suporte Padrão</ListItemText>
                </ListItem>
              </Grid>
              <Grid size={4} p={1} container alignItems={"center"}>
                <ListItem disablePadding sx={{ m: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Close color="error"></Close>
                  </ListItemIcon>
                  <ListItemText>Estatísticas e Relatórios</ListItemText>
                </ListItem>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PricingPage;

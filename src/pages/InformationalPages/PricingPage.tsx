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
import { Check, Close, Warning, Lightbulb } from "@mui/icons-material";

const PricingPage = () => {
  const [selected, setSelected] = useState<string>("mensal");
  const [hasDiscount, setHasDiscout] = useState<boolean>(false);
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
              onClick={() => setSelected("mensal")}
            >
              Mensal
            </Button>
            <Button
              sx={{ borderRadius: 10 }}
              variant="contained"
              color={selected === "anual" ? "primary" : "inherit"}
              onClick={() => setSelected("anual")}
            >
              Anual
            </Button>
          </Box>
        </Grid>
        <Grid size={12} container spacing={1} m={1} mt={4}>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: 700, width: "100%" }}>
              <Grid
                height={"20%"}
                container
                pt={2}
                direction={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Typography variant="h6">Base</Typography>
                <Typography variant="h3">€30</Typography>
              </Grid>
              <Grid height={"70%"}>
                <List sx={{ p: 3 }}>
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
                      <Close color="error"></Close>
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
                    <ListItemText>ID único pata Membros</ListItemText>
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
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Lightbulb color="secondary"></Lightbulb>
                    </ListItemIcon>
                    <ListItemText>Ganhe controlo e clareza</ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: 700, width: "100%" }}>
              <Grid
                height={"20%"}
                container
                pt={2}
                direction={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Typography variant="h6">Pro</Typography>
                <Typography variant="h3">€50</Typography>
              </Grid>
              <Grid height={"70%"}>
                <List sx={{ p: 3 }}>
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
                      <Close color="error"></Close>
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
                    <ListItemText>ID único pata Membros</ListItemText>
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
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Lightbulb color="secondary"></Lightbulb>
                    </ListItemIcon>
                    <ListItemText>Ganhe controlo e clareza</ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card sx={{ height: 700, width: "100%" }}>
              <Grid
                height={"20%"}
                container
                pt={2}
                direction={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Typography variant="h6">Elite</Typography>
                <Typography variant="h3">€100</Typography>
              </Grid>
              <Grid height={"70%"}>
                <List sx={{ p: 3 }}>
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
                      <Close color="error"></Close>
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
                    <ListItemText>ID único pata Membros</ListItemText>
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
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Lightbulb color="secondary"></Lightbulb>
                    </ListItemIcon>
                    <ListItemText>Ganhe controlo e clareza</ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PricingPage;

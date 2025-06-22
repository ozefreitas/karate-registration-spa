import {
  Grid,
  Stack,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

export default function SingleTeamPage() {
  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title={"Perfil da Equipa"}
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Nesta página poderá consultar toda a informação de uma Equipa, assim
          como editar ou remover esta mesma Equipa.
        </CardContent>
      </Card>
      
    </>
  );
}

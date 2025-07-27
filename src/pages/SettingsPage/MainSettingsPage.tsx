import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Tabs,
  Tab,
  Grid,
  List,
  ListItem,
  ListItemButton,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  useFetchAvailableClubs,
  useRemoveClub,
  useCreateClub,
} from "../../hooks/useAuth";
import { useFetchDojoUsersData } from "../../hooks/useNotificationData";

export default function MainSettingsPage() {
  const [value, setValue] = useState("one");
  const [clickedUsername, setClickedUsername] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  
  const { data: availableClubsData } = useFetchAvailableClubs();
  const createClub = useCreateClub();
  const removeClub = useRemoveClub();

  const { data: dojoUserData, refetch } =
    useFetchDojoUsersData(clickedUsername);

  useEffect(() => {
    if (clickedUsername !== "") {
      refetch();
    }
  }, [clickedUsername]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDojoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUserId(event.target.value);
  };

  const handleClubDelete = () => {
    removeClub.mutate({ clubId: selectedUserId });
  };

  return (
    <>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Administrador"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá iniciar configurar esta plataforma, e da forma como é
          apresentada para as contas associadas, assim como controlo sobre essas
          mesmas contas.
        </CardContent>
      </Card>
      <Card sx={{ m: 3, mt: 0 }}>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Tabs
              sx={{
                "& .MuiTab-root": { color: "#e81c24" },
                "& .Mui-selected": { color: "#e81c24" },
                "& .MuiTabs-indicator": { backgroundColor: "#e81c24" },
                "& .MuiTab-fullWidth	": { color: "#e81c24" },
                m: 2,
                mt: 0,
                color: "#e81c24",
              }}
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              textColor="inherit"
            >
              <Tab value="one" label="Gestor de contas" />
              <Tab value="two" label="Work In Progress" />
              <Tab value="three" label="Work In Progress" />
            </Tabs>
          </Box>
          {value === "one" ? (
            <Grid
              sx={{ m: 4, mb: 0 }}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Grid size={6} sx={{ p: 2 }}>
                <TextField
                  color="warning"
                  variant={"outlined"}
                  label="Conta Associada"
                  select
                  fullWidth
                  multiline
                  maxRows={8}
                  value={selectedUserId}
                  onChange={handleDojoChange}
                >
                  <MenuItem value="">-- Selecionar --</MenuItem>
                  {availableClubsData?.data.results.map(
                    (item: any, index: string) => (
                      <MenuItem key={index} value={item.id}>
                        {item.dojo}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>
              <Grid size={6} container justifyContent="space-evenly">
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={handleClubDelete}
                  disabled={selectedUserId === ""}
                  startIcon={<Delete />}
                >
                  Eliminar Clube
                </Button>
                <Button
                  variant="contained"
                  size={"large"}
                  color={"success"}
                  type={"submit"}
                  startIcon={<Add></Add>}
                  onClick={() => {
                    // handleSubmit(onSubmit)();
                  }}
                >
                  Adicionar Clube
                </Button>
              </Grid>
            </Grid>
          ) : value === "two" ? (
            <Grid></Grid>
          ) : (
            <Grid></Grid>
          )}
        </CardContent>
      </Card>
    </>
  );
}

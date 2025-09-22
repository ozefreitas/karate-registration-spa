import {
  Typography,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ClassificationsPage() {
  interface Ranking {
    first_place: string;
    second_place: string;
    third_place: string;
  }

  interface Jornada {
    [key: string]: {
      string: Ranking;
    }[];
  }
  const [classifications, setClassifications] = useState<Jornada[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/classifications/per_comp/")
      .then((response) => setClassifications(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Card sx={{ ml: 2, mr: 2, mt: 0 }}>
        <CardHeader
          title="Página de Classificações"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá consultar todas as classificações dos eventos (competições) realizadas até à data.
          <p></p>
          Consultando cada prova, poderá abrir as classificações de cada
          escalão. Lá dentro, os perfis de cada medalhado pode também ser
          aberto.
        </CardContent>
      </Card>
      <Grid sx={{ m: 2, mt: 4 }}>
        {classifications.map((jornadaGroup, i) =>
          Object.entries(jornadaGroup).map(([jornadaName, matches]) => (
            <Accordion key={`${jornadaName}-${i}`} sx={{ m: 3, mt: 0 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h4" component="span">
                  {jornadaName}
                </Typography>
              </AccordionSummary>
              {matches.map((match, matchIdx) =>
                Object.entries(match).map(([category, ranking]) => (
                  <Accordion key={`${category}-${matchIdx}`} sx={{ m: 2 }}>
                    <AccordionSummary
                      sx={{ pl: 4 }}
                      expandIcon={<ExpandMore />}
                    >
                      <Typography variant="h5" component="span">
                        {category}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List sx={{ m: 0, p: 0 }}>
                        <ListItem sx={{ m: 0 }}>
                          <ListItemButton sx={{ m: 0, pb: 0 }}>
                            <ListItemText
                              primary={
                                <Typography variant="h6">
                                  🥇 {ranking.first_place}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ m: 0 }}>
                          <ListItemButton sx={{ m: 0, pb: 0 }}>
                            <ListItemText
                              primary={
                                <Typography variant="h6">
                                  🥈 {ranking.second_place}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                        <ListItem sx={{ m: 0 }}>
                          <ListItemButton sx={{ m: 0, pb: 0 }}>
                            <ListItemText
                              primary={
                                <Typography variant="h6">
                                  🥉 {ranking.third_place}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))
              )}
            </Accordion>
          ))
        )}
      </Grid>
    </>
  );
}

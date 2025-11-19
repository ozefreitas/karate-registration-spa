import { Card, Grid, Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import PageInfoCard from "../../components/info-cards/PageInfoCard";
import bannerLigaSoshinkai from "./../../assets/sorteios_1_Jornadaa_liga_2526.jpg";

export default function RulesPage() {
  const DrawSettings: {
    image: string;
    file: string;
    rename: string;
  } = {
    image: bannerLigaSoshinkai,
    file: "/files/Sorteios_1_Jornada_Liga_Soshinkai_22_11_25.pdf",
    rename: "Sorteios_1_Jornada_Liga_Soshinkai_22_11_25",
  };

  return (
    <div>
      <PageInfoCard
        description="Aqui poderá fazer download dos Sorteios disponibilizados para os Eventos em vigor."
        title="Sorteios"
      ></PageInfoCard>
      <Grid m={5} container justifyContent={"space-between"}>
        <Grid position={"relative"} size={3.5}>
          <Card
            sx={{
              height: 300,
              backgroundImage: `url(${DrawSettings.image})`,
              backgroundSize: "110%",
              backgroundPosition: "center top 30%",
              color: "white",
            }}
          ></Card>
          <Grid bottom={-20} left={"48%"} position={"absolute"}>
            <a
              href={DrawSettings.file} // path inside public/
              download={DrawSettings.rename} // optional rename
              style={{ textDecoration: "none" }}
            >
              <Button
                size="large"
                startIcon={<FileDownload></FileDownload>}
                variant="contained"
              >
                Download
              </Button>
            </a>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

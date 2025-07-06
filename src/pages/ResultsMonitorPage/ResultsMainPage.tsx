import { Card, CardHeader, CardContent, Button } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import ControlPage from "../ResultsMonitorPage/ControlPage";
import { useEffect, useState, useRef } from "react";
import FormAccordion from "../../dashboard/FormAccordion";

export default function ResultsMainPage() {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const displayWindowRef = useRef<Window | null>(null);

  const openDisplay = () => {
    if (!displayWindowRef.current || displayWindowRef.current.closed) {
      displayWindowRef.current = window.open(
        "/display_panel/",
        "_blank",
        "width=800,height=600"
      );
      setIsDisplayOpen(true);
    } else {
      displayWindowRef.current.focus();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayWindowRef.current) {
        setIsDisplayOpen(!displayWindowRef.current.closed);
      } else {
        setIsDisplayOpen(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardHeader
          title="Página de Monitorização e Mostragem de Resultados ao Vivo"
          sx={{
            "& .MuiCardHeader-title": {
              fontWeight: "bold",
            },
          }}
        ></CardHeader>
        <CardContent>
          Aqui poderá iniciar o sistema de monitorização de resultados de cada
          prova. Poderá controlar todos os aspetos, como inserir sorteios,
          definir diferentes parametros, entre outros.
        </CardContent>
      </Card>
      <FormAccordion expanded title="Configurações de Monitor">
        ola
      </FormAccordion>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        color="success"
        startIcon={<OpenInNew />}
        onClick={openDisplay}
      >
        Inicializar monitor
      </Button>
      {isDisplayOpen ? <ControlPage></ControlPage> : null}
    </div>
  );
}

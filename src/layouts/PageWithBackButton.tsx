import { ArrowBack } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface PageWithBackButtonProps {
  children: ReactNode;
  backTo?: string;
}

export default function PageWithBackButton({
  children,
  backTo,
}: Readonly<PageWithBackButtonProps>) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <Grid>
      {children}

      <Grid container m={4} justifyContent="flex-end">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowBack />}
          onClick={handleBack}
        >
          Voltar
        </Button>
      </Grid>
    </Grid>
  );
}

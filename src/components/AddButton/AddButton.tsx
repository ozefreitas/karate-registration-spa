import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function AddButton(props: Readonly<{ label: string; to: string }>) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size="large"
      color="success"
      onClick={() => navigate(props.to)}
      startIcon={<Add />}
    >
      {props.label}
    </Button>
  );
}

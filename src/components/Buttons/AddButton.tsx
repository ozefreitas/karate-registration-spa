import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function AddButton(props: Readonly<{ label: string; to: string, disabled?: boolean }>) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size="large"
      color="success"
      onClick={() => navigate(props.to)}
      startIcon={<Add />}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
}

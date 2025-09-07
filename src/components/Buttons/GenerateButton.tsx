import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Casino } from "@mui/icons-material";

export default function GenerateButton(
  props: Readonly<{ label: string; to: string, disabled?: boolean }>
) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size="medium"
      disabled={props.disabled}
      color="secondary"
      onClick={() => navigate(props.to)}
      startIcon={<Casino />}
    >
      {props.label}
    </Button>
  );
}

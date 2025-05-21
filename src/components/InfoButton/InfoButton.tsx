import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

export default function InfoButton(props: {
  label: string;
  to: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size={props.size ?? "medium"}
      color="primary"
      disabled={props.disabled}
      onClick={() => navigate(props.to)}
      startIcon={<Visibility />}
    >
      {props.label}
    </Button>
  );
}

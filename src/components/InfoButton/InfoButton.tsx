import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    >
      {props.label}
    </Button>
  );
}

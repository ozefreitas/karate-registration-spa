import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function InfoButton(props: { label: string; to: string }) {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      color="primary"
      onClick={() => navigate(props.to)}
    >
      {props.label}
    </Button>
  );
}

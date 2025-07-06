import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";

export default function SettingsButton(
  props: Readonly<{
    label: string;
    to?: string;
    size: "small" | "medium" | "large";
  }>
) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size={props.size}
      color="warning"
      onClick={() => {
        if (props.to) {
          navigate(props.to);
        }
      }}
      startIcon={<Settings />}
    >
      {props.label}
    </Button>
  );
}

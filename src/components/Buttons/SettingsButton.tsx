import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";

export default function SettingsButton(
  props: Readonly<{
    label: string;
    to?: string;
    handleOpen?: any;
    size: "small" | "medium" | "large";
    disabled?: boolean;
  }>,
) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size={props.size}
      disabled={props.disabled}
      color="warning"
      onClick={() => {
        if (props.to) {
          navigate(props.to);
        }
        if (props.handleOpen) {
          props.handleOpen();
        }
      }}
      startIcon={<Settings />}
    >
      {props.label}
    </Button>
  );
}

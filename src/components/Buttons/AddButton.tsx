import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

export default function AddButton(
  props: Readonly<{
    label: string;
    to?: string;
    action?: any;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
  }>,
) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size={props.size ?? "large"}
      color="success"
      onClick={() => {
        if (props.to !== undefined) {
          navigate(props.to);
        } else if (props.action !== undefined) {
          props.action();
        }
      }}
      startIcon={<Add />}
      disabled={props.disabled}
    >
      {props.label}
    </Button>
  );
}

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";

export default function DeleteButton(
  props: Readonly<{
    label: string;
    to: string;
    id: string;
    mutation: any;
    size: "small" | "medium" | "large";
  }>
) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size={props.size}
      color="error"
      onClick={() => {
        props.mutation(props.id, {
          onSuccess: () => {
            if (props.to) {
              navigate(props.to);
            }
          },
        });
      }}
      startIcon={<Delete />}
    >
      {props.label}
    </Button>
  );
}

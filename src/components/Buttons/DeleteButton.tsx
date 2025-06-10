import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";

export default function DeleteButton(
  props: Readonly<{ label: string; to: string; id: string; mutation: any }>
) {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ m: 1 }}
      variant="contained"
      size="large"
      color="error"
      onClick={() => {
        props.mutation(props.id, {
          onSuccess: () => {
            navigate(props.to);
          },
        });
      }}
      startIcon={<Delete />}
    >
      {props.label}
    </Button>
  );
}

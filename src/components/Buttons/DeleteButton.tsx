import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function DeleteButton(
  props: Readonly<{
    label: string;
    handleModalOpen: any;
    id: string;
    size: "small" | "medium" | "large";
    disabled?: boolean;
  }>,
) {
  return (
    <Button
      sx={{ m: 1 }}
      disabled={props.disabled}
      variant="contained"
      size={props.size}
      color="error"
      onClick={() => {
        props.handleModalOpen();
      }}
      startIcon={<Delete />}
    >
      {props.label}
    </Button>
  );
}

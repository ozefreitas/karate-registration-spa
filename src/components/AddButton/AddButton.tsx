import { Button } from "@mui/material";

export default function AddButton(props: { label: string }) {
  return (
    <Button sx={{m: 1}} variant="contained" color="success">
      {props.label}
    </Button>
  );
}

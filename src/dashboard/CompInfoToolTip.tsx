import { ListItem, Tooltip, ListItemIcon, ListItemText } from "@mui/material";

export default function CompInfoToolTip(
  props: Readonly<{ title: string; text: string; icon: any }>
) {
  return (
    <ListItem sx={{ m: 0, pb: 0 }}>
      <Tooltip placement="left" sx={{ cursor: "pointer" }} title={props.title}>
        <ListItemIcon>{props.icon}</ListItemIcon>
      </Tooltip>
      <ListItemText
        sx={{ color: props.text ? "black" : "GrayText" }}
        primary={props.text ? props.text : "Não se aplica"}
      />
    </ListItem>
  );
}

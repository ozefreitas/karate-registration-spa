import { Paper, Typography } from "@mui/material";
import { ColoredIconBox } from "../icon-utils/boxes";

export default function InfoRow({
  color,
  icon,
  value,
  reverse,
  clickable,
}: Readonly<{
  color: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  reverse?: boolean;
  clickable?: boolean;
}>) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: reverse ? "flex-end" : "flex-start",
        gap: 2,
        p: 2,
        borderRadius: 3,
        border: "1px solid #eeeeee",
        width: "100%",
        transition: "0.3s",
        "&:hover": {
          bgcolor: clickable ? "#fff" : "none",
          cursor: clickable ? "pointer" : "none",
          transform: clickable ? "translateY(-3px)" : "none",
          boxShadow: clickable ? 4 : "none",
          borderColor: clickable ? "red" : "none",
        },
      }}
    >
      {reverse ? (
        <>
          <Typography>{value}</Typography>
          <ColoredIconBox
            bgColor={color === "Aka" ? "red" : "transparent"}
            color={color === "Aka" ? "#fff" : "black"}
            border={color === "Aka" ? "1px solid red" : "1px solid black"}
            icon={icon}
          />
        </>
      ) : (
        <>
          <ColoredIconBox
            bgColor={color === "Aka" ? "red" : "transparent"}
            color={color === "Aka" ? "#fff" : "black"}
            border={color === "Aka" ? "1px solid red" : "1px solid black"}
            icon={icon}
          />
          <Typography>{value}</Typography>
        </>
      )}
    </Paper>
  );
}

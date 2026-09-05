import { Box } from "@mui/material";

export function IconBox({ icon }: Readonly<{ icon: React.ReactNode }>) {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        bgcolor: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "#fff",
      }}
    >
      {icon}
    </Box>
  );
}

export function ColoredIconBox({
  icon,
  color,
  bgColor,
  border,
}: Readonly<{
  icon: React.ReactNode;
  color: string;
  bgColor?: string;
  border?: string;
}>) {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        bgcolor: bgColor,
        border: border,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: color,
      }}
    >
      {icon}
    </Box>
  );
}

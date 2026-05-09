import { Grid, Tooltip, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";

function useIsOverflowing() {
  const ref = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setIsOverflowing(el.scrollWidth > el.clientWidth);
  }, []);

  return { ref, isOverflowing };
}

function StatRow({
  icon,
  label,
  value,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  value: string | null;
}>) {
  const { ref, isOverflowing } = useIsOverflowing();
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"space-between"}
      py={1}
      spacing={3}
      flexWrap="nowrap"
    >
      <Grid
        container
        alignItems={"center"}
        spacing={3}
        flexWrap="nowrap"
        flexShrink={0}
      >
        <Grid
          width={30}
          height={30}
          borderRadius={2}
          bgcolor={"#fdecea"}
          container
          alignItems={"center"}
          justifyContent={"center"}
          flexShrink={0}
        >
          {icon}
        </Grid>
        <Typography variant="body1" sx={{ color: "#555", fontWeight: 500 }}>
          {label}
        </Typography>
      </Grid>
      <Tooltip title={isOverflowing ? (value ?? "N/A") : ""} placement="top">
        <Typography
          ref={ref}
          variant="body1"
          fontWeight={700}
          color={value === null ? "textDisabled" : "error"}
          sx={{
            minWidth: 32,
            textAlign: "right",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "default"
          }}
        >
          {value ?? "N/A"}
        </Typography>
      </Tooltip>
    </Grid>
  );
}

export default function CompInfoToolTip(
  props: Readonly<{ title: string; text: string | null; icon: any }>,
) {
  return <StatRow icon={props.icon} label={props.title} value={props.text} />;
}

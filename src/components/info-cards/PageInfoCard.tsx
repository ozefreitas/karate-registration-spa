import { Grid, Typography, Box, Popover } from "@mui/material";
import { useState, ReactNode } from "react";
import { InfoOutline } from "@mui/icons-material";

const PageInfoCard = (props: {
  title: string;
  description: string | ReactNode;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Grid container sx={{ p: 2, pt: 4, mb: 6 }} gap={3} alignItems={"center"}>
      <Typography variant="h4">{props.title}</Typography>
      {props.description ? (
        <>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <InfoOutline />
          </Box>
          <Popover
            id="mouse-over-popover"
            sx={{ pointerEvents: "none", ml:3, maxWidth: "90%" }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography variant="body1" sx={{ p: 2 }}>
              {props.description}
            </Typography>
          </Popover>
        </>
      ) : null}
    </Grid>
  );
};

export default PageInfoCard;

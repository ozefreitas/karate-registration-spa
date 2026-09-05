import { Grid, Typography, Box, Popover } from "@mui/material";
import { useEffect, useRef, useState, ReactNode } from "react";
import { InfoOutline } from "@mui/icons-material";

const PageInfoCard = (props: {
  title: string;
  description: string | ReactNode;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isStuck, setIsStuck] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateStickyState = () => {
      if (cardRef.current) {
        setIsStuck(cardRef.current.getBoundingClientRect().top <= 32);
      }
    };

    updateStickyState();
    window.addEventListener("scroll", updateStickyState, { passive: true });
    return () => window.removeEventListener("scroll", updateStickyState);
  }, []);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Grid
      ref={cardRef}
      container
      sx={{
        p: 2,
        ml: "-67px",
        width: "calc(100% + 90px)",
        pl: "calc(16px + 67px)",
        pt: 4,
        mb: 4,
        position: "sticky",
        top: 32,
        zIndex: (theme) => theme.zIndex.appBar - 2,
        backgroundColor: "#f3f3f3",
        boxShadow: isStuck ? "0 3px 6px -6px rgba(0, 0, 0, 0.4)" : "none",
        transition: `box-shadow 500ms ease`,
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -20,
          height: 20,
          pointerEvents: "none",
          opacity: isStuck ? 1 : 0,
          transition: `opacity 500ms ease`,
          background: (theme) =>
            `linear-gradient(to bottom, ${theme.palette.background.paper}, transparent)`,
        },
      }}
      gap={3}
      alignItems={"center"}
    >
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
            sx={{ pointerEvents: "none", ml: 3, maxWidth: "90%" }}
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

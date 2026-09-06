import * as React from "react";
import { Box, Button, Drawer, Grid, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { SwapVert } from "@mui/icons-material";

const FiltersBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -20px;
    right: -55px;
  }
`;

export interface FilterDrawerProps {
  label: string;
  children: React.ReactNode;
  changedCount?: number;
  isLoading?: boolean;
  icon?: React.ReactNode;
  width?: number;
  mobileAriaLabel?: string;
}

export default function FilterDrawer({
  label,
  children,
  changedCount = 0,
  isLoading = false,
  icon = <SwapVert />,
  width = 100,
  mobileAriaLabel,
}: Readonly<FilterDrawerProps>) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Button
          endIcon={icon}
          size="large"
          variant="outlined"
          disabled={isLoading}
          onClick={toggleDrawer(true)}
        >
          {label}
          <FiltersBadge
            badgeContent={changedCount}
            color="primary"
            overlap="circular"
          />
        </Button>
        <Drawer
          anchor="right"
          sx={{
            scrollbarWidth: "none",
            "& .MuiDrawer-paper": {
              marginTop: "25px",
              marginBottom: "25px",
              marginRight: "25px",
              height: "calc(100% - 50px)",
            },
          }}
          open={open}
          onClose={toggleDrawer(false)}
        >
          <Box sx={{ width }} role="presentation">
            {children}
          </Box>
        </Drawer>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        sx={{ display: { sm: "flex", md: "none" } }}
      >
        <Tooltip title={label} placement="top">
          <IconButton
            sx={{ border: 1, borderRadius: 3 }}
            size="large"
            color="primary"
            disabled={isLoading}
            aria-label={mobileAriaLabel ?? label}
            onClick={toggleDrawer(true)}
          >
            {icon}
          </IconButton>
        </Tooltip>
        <Drawer
          anchor="right"
          sx={{
            scrollbarWidth: "none",
            "& .MuiDrawer-paper": {
              marginTop: "25px",
              marginBottom: "25px",
              marginRight: "25px",
              height: "calc(100% - 50px)",
              width: "25vw",
            },
          }}
          open={open}
          onClose={toggleDrawer(false)}
        >
          <Box role="presentation">
            {children}
          </Box>
        </Drawer>
      </Grid>
    </>
  );
}

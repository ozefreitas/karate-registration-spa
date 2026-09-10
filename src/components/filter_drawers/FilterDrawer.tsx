import * as React from "react";
import { Box, Button, Drawer, IconButton, Tooltip } from "@mui/material";
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
  mobileAriaLabel?: string;
}

export default function FilterDrawer({
  label,
  children,
  changedCount = 0,
  isLoading = false,
  icon = <SwapVert />,
  mobileAriaLabel,
}: Readonly<FilterDrawerProps>) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* Mobile: icon-only button */}
        <Tooltip
          title={label}
          placement="top"
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <Button
            disabled={isLoading}
            color="primary"
            aria-label={mobileAriaLabel ?? label}
            variant="outlined"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            {icon}
          </Button>
        </Tooltip>

        {/* Desktop: icon + label button */}
        <Button
          endIcon={icon}
          variant="outlined"
          disabled={isLoading}
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "none", md: "inline-flex" } }}
        >
          {label}
          <FiltersBadge
            badgeContent={changedCount}
            color="primary"
            overlap="circular"
          />
        </Button>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          scrollbarWidth: "none",
          "& .MuiDrawer-paper": {
            marginTop: { xs: "10px", md: "25px" },
            marginBottom: { xs: "10px", md: "25px" },
            marginRight: { xs: "10px", md: "25px" },
            height: { xs: "calc(100% - 20px)", md: "calc(100% - 50px)" },
            width: { xs: "97vw", md: "35vw" },
          },
        }}
      >
        <Box role="presentation">{children}</Box>
      </Drawer>
    </>
  );
}

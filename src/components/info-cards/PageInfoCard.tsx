import { InfoOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactElement, ReactNode } from "react";

type PageInfoCardProps = Readonly<{
  title: string;
  description: ReactNode;
  icon?: ReactNode;
  chipLabel?: string;
  chipIcon?: ReactElement;
  chipColor?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
}>;

const PageInfoCard = ({
  title,
  description,
  icon,
  chipLabel,
  chipIcon,
  chipColor = "default",
}: PageInfoCardProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const collapsedHeight = isSmallScreen ? 72 : 96;
  const descriptionId = useId();
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [canExpand, setCanExpand] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) {
      setCanExpand(false);
      return;
    }

    const updateOverflow = () => {
      setCanExpand(element.scrollHeight > collapsedHeight + 1);
    };

    updateOverflow();
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(updateOverflow);
    observer?.observe(element);
    window.addEventListener("resize", updateOverflow);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateOverflow);
    };
  }, [collapsedHeight, description]);

  return (
    <Card
      variant="outlined"
      sx={{
        mx: { xs: 2, sm: 3, md: 4 },
        mt: { xs: 2, sm: 3 },
        mb: 3,
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 3 },
          "&:last-child": { pb: { xs: 2, sm: 3 } },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1.5, sm: 2 }}
            sx={{ minWidth: 0, width: { xs: "100%", sm: "auto" }, flex: 1 }}
          >
            <Box
              sx={{
                width: { xs: 44, sm: 52 },
                height: { xs: 44, sm: 52 },
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: 2,
                color: "error.main",
                bgcolor: "action.hover",
              }}
            >
              {icon ?? <InfoOutline />}
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ overflowWrap: "anywhere" }}
              >
                {title}
              </Typography>
              {description ? (
                <>
                  <Box
                    id={descriptionId}
                    sx={{
                      mt: 0.5,
                      maxHeight: isExpanded ? "none" : collapsedHeight,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      ref={descriptionRef}
                      sx={{
                        color: "text.secondary",
                        typography: "body2",
                        "& p": { m: 0, mb: 1 },
                        "& p:last-child": { mb: 0 },
                        "& p:empty": { display: "none" },
                      }}
                    >
                      {description}
                    </Box>
                  </Box>
                  {canExpand ? (
                    <Button
                      size="small"
                      color="error"
                      aria-expanded={isExpanded}
                      aria-controls={descriptionId}
                      onClick={() => setIsExpanded((expanded) => !expanded)}
                      sx={{
                        mt: 0.5,
                        py: 0,
                        px: 1,
                        minWidth: 0,
                        fontWeight: 700,
                        textTransform: "none",
                      }}
                    >
                      {isExpanded ? "Ver menos" : "Ver mais"}
                    </Button>
                  ) : null}
                </>
              ) : null}
            </Box>
          </Stack>
          {chipLabel ? (
            <Chip
              icon={chipIcon}
              label={chipLabel}
              color={chipColor}
              variant="outlined"
              sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
            />
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PageInfoCard;

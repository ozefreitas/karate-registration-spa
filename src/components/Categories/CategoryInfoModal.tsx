import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { categoriesHooks } from "../../hooks";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Category } from "@mui/icons-material";
import { GraduationsOptions } from "../../config";

// ── Types ────────────────────────────────────────────────────────────────────

function buildRows(c: any) {
  return [
    { label: "Nome", value: c.name },
    { label: "Género", value: c.gender },
    { label: "Idade Mínima", value: c.min_age },
    { label: "Idade Máxima", value: c.max_age },
    { label: "Graduação Mínima", value: c.min_grad },
    { label: "Graduação Máxima", value: c.max_grad },
    { label: "Peso Mínimo (Kg)", value: c.min_weight },
    { label: "Peso Máximo (Kg)", value: c.max_weight },
    { label: "Número Máximo de Atletas", value: c.max_athletes },
  ];
}

// ── Sub-components ────────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  type,
}: Readonly<{ label: string; value: string | number | null; type?: string }>) {
  const isEmpty = value === null || value === undefined || value === "";
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      py={1.5}
    >
      <Typography variant="body1" fontWeight={600} sx={{ color: "#1a1a1a" }}>
        {label}
      </Typography>
      {type === "graduation" ? (
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ color: isEmpty ? "#bdbdbd" : "#d32f2f" }}
        >
          {isEmpty
            ? "N/A"
            : GraduationsOptions.find((item) => item.value === Number(value))
                ?.label}
        </Typography>
      ) : (
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ color: isEmpty ? "#bdbdbd" : "#d32f2f" }}
        >
          {isEmpty ? "N/A" : String(value)}
        </Typography>
      )}
    </Grid>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// ── Main component ────────────────────────────────────────────────────────────

export default function CategoryInfoModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    categoryId: any;
  }>,
) {
  const { data: singleCategoryData, isLoading: isSingleCategoryDataLoading } =
    categoriesHooks.useFetchSingleCategory(props.categoryId);

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      maxWidth="sm"
      fullWidth
      slots={{
        transition: Transition,
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ p: 1, width: "100%" }}>
        <Grid
          size={12}
          container
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
          sx={{
            borderBottom: "1px solid #eeeeee",
          }}
        >
          <Grid container alignItems={"center"} gap={2}>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"center"}
              color={"white"}
              bgcolor={"#d32f2f"}
              borderRadius={2}
              width={45}
              height={45}
            >
              <Category sx={{ fontSize: 20 }} />
            </Grid>
            <Typography variant="h6" fontWeight={700} sx={{ color: "#1a1a1a" }}>
              {singleCategoryData
                ? `Informações de ${singleCategoryData?.name}`
                : "Informações de Categoria"}
            </Typography>
          </Grid>
          <IconButton
            size="small"
            onClick={props.handleModalClose}
            sx={{ color: "#9e9e9e" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 4, py: 1, pb: 2 }}>
        {isSingleCategoryDataLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={28} sx={{ color: "#d32f2f" }} />
          </Box>
        )}
        {!isSingleCategoryDataLoading &&
          singleCategoryData &&
          buildRows(singleCategoryData).map((row, i, arr) => (
            <Box key={row.label}>
              <InfoRow
                label={row.label}
                value={row.value}
                type={
                  row.label.includes("Graduação") ? "graduation" : undefined
                }
              />
              {i < arr.length - 1 && (
                <Divider sx={{ borderColor: "#f5f5f5" }} />
              )}
            </Box>
          ))}
      </DialogContent>
    </Dialog>
  );
}

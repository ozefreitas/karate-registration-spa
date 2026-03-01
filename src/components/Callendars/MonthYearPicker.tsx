import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import { MonthOptions } from "../../config";
import {
  Close,
  ChevronLeft,
  ChevronRight,
  CalendarMonth,
} from "@mui/icons-material";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface MonthYearPickerProps {
  open: boolean;
  onClose: () => void;
  currentMonth: number; // 0-indexed
  currentYear: number;
  onConfirm: (month: number, year: number) => void;
}

export default function MonthYearPicker({
  open,
  onClose,
  currentMonth,
  currentYear,
  onConfirm,
}: Readonly<MonthYearPickerProps>) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleConfirm = () => {
    onConfirm(selectedMonth, selectedYear);
    onClose();
  };

  const handleClose = () => {
    // Reset to current on cancel
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      {/* Header */}
      <DialogTitle sx={{ p: 0, width: "100%" }}>
        <Grid
          size={12}
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            px: 2.5,
            py: 1.5,
            borderBottom: "1px solid #eeeeee",
          }}
        >
          <Grid container alignItems={"center"} spacing={2} p={1}>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 2,
                bgcolor: "#d32f2f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <CalendarMonth sx={{ fontSize: 25 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#1a1a1a" }}>
              Selecionar Mês e Ano
            </Typography>
          </Grid>
          <IconButton
            size="small"
            color="error"
            onClick={handleClose}
            sx={{ color: "#9e9e9e" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Grid>
      </DialogTitle>

      <DialogContent sx={{ px: 2.5, py: 3 }}>
        {/* Year selector */}
        <Grid
          container
          alignItems={"center"}
          justifyContent={"space-between"}
          my={5}
          px={2.5}
        >
          <IconButton
            size="small"
            onClick={() => setSelectedYear((y) => y - 1)}
            sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#eeeeee" } }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>

          <Typography variant="h5" fontWeight={700} sx={{ color: "#1a1a1a" }}>
            {selectedYear}
          </Typography>

          <IconButton
            size="small"
            onClick={() => setSelectedYear((y) => y + 1)}
            sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#eeeeee" } }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>
        </Grid>

        <Grid
          container
          justifyContent={"space-around"}
          size={12}
          spacing={2}
          my={4}
          px={1}
        >
          {MonthOptions.map((month, i) => {
            const isSelected = i + 1 === selectedMonth;
            return (
              <Grid
                size={2}
                container
                key={month.value}
                justifyContent={"center"}
              >
                <Box
                  onClick={() => setSelectedMonth(month.value)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: isSelected ? "#d32f2f" : "#f5f5f5",
                    color: isSelected ? "#fff" : "#1a1a1a",
                    fontWeight: isSelected ? 700 : 500,
                    transition: "all 0.15s ease",
                    "&:hover": {
                      bgcolor: isSelected ? "#b71c1c" : "#eeeeee",
                    },
                  }}
                >
                  {month.label.slice(0, 3)}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, p: 2.5, gap: 3 }}>
        <Button onClick={handleClose} disableElevation sx={{}}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          disableElevation
          sx={{
            px: 2,
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

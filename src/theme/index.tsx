import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptPT } from "@mui/material/locale";

const theme = createTheme(ptPT, {
  typography: {
    fontFamily:
      '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "red", // Label color when focused
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red", // Default border color
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: { root: { paddingLeft: 20, paddingTop: 25 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // mimic elevation
          },
          borderRadius: 16,
          padding: 6,
          overflow: "hidden",
          // margin: 10,
          marginTop: 0,
          "&:before": {
            display: "none",
          },
          "&:not(:last-of-type)": {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          "&:not(:first-of-type)": {
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: { root: { borderRadius: "10px" } },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: "#e81c24", // Thumb color when checked
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#e81c24", // Track color when checked
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#e81c24",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "&.MuiTabs-fullWidth": {
            "& .MuiTab-root": {
              color: "red",
            },
            "& .Mui-selected": {
              color: "red",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "red",
            },
          },
        },
      },
    },
  },
});

export default theme;

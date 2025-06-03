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
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red", // Default border color
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: { root: { paddingLeft: 20 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // change this value as needed
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
          borderRadius: 12,
          padding: 6,
          overflow: "hidden",
          margin: 10,
          marginTop: 0,
          "&:before": {
            display: "none",
          },
          "&:not(:last-of-type)": {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
          "&:not(:first-of-type)": {
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: { root: { borderRadius: "10px" } },
    },
  },
});

export default theme;

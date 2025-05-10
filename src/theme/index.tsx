import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
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
          borderRadius: 12,
          padding: 6,
          overflow: "hidden",
          margin: "8px 0",
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
  },
});

export default theme;

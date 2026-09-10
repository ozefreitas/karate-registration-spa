import { TypographyVariantsOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h4Half: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h4Half?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h4Half: true;
  }
}


declare module "@mui/material/styles" {
  interface TypographyVariants {
    h5Half: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h5Half?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h5Half: true;
  }
}

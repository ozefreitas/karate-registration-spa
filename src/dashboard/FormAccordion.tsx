import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Tooltip,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function FormAccordion(
  props: Readonly<{
    title: string;
    summary?: any;
    children: any;
    expanded?: boolean;
    tooltipMessage?: string;
    size?: "split" | "fullWidth";
  }>
) {
  return (
    <Grid sx={{ m: 6, mt: 2, mb: 2 }} size={12}>
      <Accordion square expanded={props.expanded}>
        <Tooltip
          placement="bottom-start"
          title={!props.expanded ? props.tooltipMessage : ""}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
              sx={{
                width: "50%",
                fontSize: 18,
                fontWeight: "bold",
                flexShrink: 0,
              }}
              component="span"
            >
              {props.title}
            </Typography>
            <Typography
              component="span"
              sx={{
                width: "50%",
                pr: 5,
                fontSize: 18,
                textAlign: "right",
                color: "text.secondary",
              }}
            >
              {props.summary}
            </Typography>
          </AccordionSummary>
        </Tooltip>
        <AccordionDetails>
          <Grid alignItems="flex-start" container>
            {props.children}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

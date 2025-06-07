import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Tooltip,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function FormAccordion(
  props: Readonly<{
    title: string;
    children: any;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  }>
) {
  return (
    <Grid sx={{ m: 6, mt: 2, mb: 2 }} size={12}>
      <Accordion square expanded={!props.expanded}>
        <Tooltip
          placement="bottom-start"
          title={
            props.expanded
              ? "Apenas poderá abrir esta secção, se este Atleta for participar em competições."
              : ""
          }
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold" }}
              component="span"
            >
              {props.title}
            </Typography>
          </AccordionSummary>
        </Tooltip>
        <AccordionDetails>
          <Grid container>{props.children}</Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

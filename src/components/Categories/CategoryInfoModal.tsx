import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  FormControl,
  FormControlLabel,
  TextField,
  CircularProgress,
  Grid,
} from "@mui/material";
import * as React from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Close } from "@mui/icons-material";
import { categoriesHooks } from "../../hooks";
import { getGraduationFromValue } from "../../config";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategoryInfoModal(
  props: Readonly<{
    isModalOpen: boolean;
    handleModalClose: any;
    categoryId: any;
  }>
) {
  const {
    data: singleCategoryData,
    refetch,
    isLoading: isSingleCategoryDataLoading,
  } = categoriesHooks.useFetchSingleCategory(props.categoryId);

  React.useEffect(() => {
    refetch();
  }, [props.categoryId]);

  return (
    <Dialog
      open={props.isModalOpen}
      onClose={props.handleModalClose}
      maxWidth="xs"
      fullWidth
      slots={{
        transition: Transition,
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          width: "99%",
          margin: "auto",
          marginTop: "8px",
          backgroundColor: "#e81c24",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleModalClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {singleCategoryData?.data.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ pb: 0 }}>
        {isSingleCategoryDataLoading ? (
          <Grid
            height={100}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <Grid>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Nome:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "200px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={singleCategoryData?.data.name}
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Género:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "200px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={singleCategoryData?.data.gender}
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Idade Mínima:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "100px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={singleCategoryData?.data.min_age ?? "N/A"}
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Idade Máxima:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "100px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={singleCategoryData?.data.max_age ?? "N/A"}
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Graduação Mínima:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "150px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={
                      getGraduationFromValue(
                        Number(singleCategoryData?.data.min_grad)
                      ) ?? "N/A"
                    }
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Graduação Máxima:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "150px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={
                      getGraduationFromValue(
                        Number(singleCategoryData?.data.max_grad)
                      ) ?? "N/A"
                    }
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Peso Mínimo:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "100px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={singleCategoryData?.data.min_weight ?? "N/A"}
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
            <FormControl
              sx={{ pb: 2, justifyContent: "center" }}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                sx={{ mr: 2 }}
                labelPlacement="start"
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: 18, pr: 2 }}>
                    Peso Máximo:
                  </Typography>
                }
                control={
                  <TextField
                    sx={{ width: "100px" }}
                    color="warning"
                    variant="standard"
                    label=""
                    value={singleCategoryData?.data.max_weight ?? "N/A"}
                    slotProps={{
                      input: {
                        readOnly: true,
                        disableUnderline: true,
                        style: { fontSize: 18, marginRight: 10 },
                      },
                    }}
                  />
                }
              ></FormControlLabel>
            </FormControl>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}

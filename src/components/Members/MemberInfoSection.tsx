import {
  AccountCircle,
  HourglassBottom,
  Upgrade,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  MenuItem,
  Switch,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GraduationsOptions, GenderOptions } from "../../config";
import { arEG } from "@mui/material/locale";

// ── Sub-components ────────────────────────────────────────────────────────────

export function FieldBox({
  label,
  name,
  control,
  type,
  isEditMode,
  isValidated,
  userRole,
  hasRequest,
  exam_request_status,
  is_validated,
  handleOpen,
}: Readonly<{
  label: string;
  name: string;
  control: any;
  type: "text" | "number" | "date" | "dropdown" | "switch";
  isEditMode: boolean;
  isValidated: boolean;
  userRole?: string;
  hasRequest?: boolean;
  exam_request_status?: string;
  is_validated?: boolean;
  handleOpen?: any;
}>) {
  const sensitiveFields = [
    "firstName",
    "lastName",
    "birthDate",
    "id_number",
    "graduation",
    "gender",
  ];
  return (
    <Grid container alignItems={"center"} columnSpacing={5}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          // variant="h6"
          sx={{ color: "#9e9e9e", fontWeight: 600, letterSpacing: 0.3 }}
        >
          {label}
        </Typography>
        {/* <Typography
        variant="body2"
        fontWeight={600}
        sx={{ color: isEmpty ? "#bdbdbd" : "#1a1a1a" }}
      >
        {isEmpty ? "N/A" : String(value)}
      </Typography> */}
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return type === "date" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  format="YYYY-MM-DD"
                  label=""
                  onChange={(date) => {
                    const isAdmin = ["main_admin", "single_admin"].includes(
                      userRole!,
                    );
                    const isSubedClub = userRole === "subed_club";

                    const canChange =
                      isEditMode &&
                      ((isAdmin && name === "birthDate") ||
                        (isSubedClub && !isValidated) ||
                        (isSubedClub && isValidated && name !== "birthDate"));

                    if (canChange) {
                      field.onChange(date ? date.format("YYYY-MM-DD") : "");
                    }
                  }}
                  value={field.value ? dayjs(field.value) : null}
                  enableAccessibleFieldDOMStructure={false}
                  slotProps={{
                    textField:
                      (isEditMode &&
                        ["main_admin", "single_admin"].includes(userRole!) &&
                        name === "birthDate") ||
                      (isEditMode &&
                        isValidated &&
                        ["subed_club"].includes(userRole!) &&
                        name !== "birthDate") ||
                      (isEditMode &&
                        !isValidated &&
                        ["subed_club"].includes(userRole!))
                        ? {}
                        : {
                            variant: "standard",
                            InputProps: {
                              disableUnderline: true,
                              sx: {
                                border: "none",
                                padding: 0,
                                fontSize: 20,
                              },
                            },
                            sx: {
                              // width: "100px",
                              "& .MuiInputBase-root": {
                                border: "none",
                                padding: 0,
                              },
                              "& .MuiInputBase-input": {
                                textAlign: "left",
                                padding: 0,
                              },
                            },
                          },
                  }}
                  slots={
                    (isEditMode &&
                      ["main_admin", "single_admin"].includes(userRole!) &&
                      name === "birthDate") ||
                    (isEditMode &&
                      isValidated &&
                      ["subed_club"].includes(userRole!) &&
                      name !== "birthDate") ||
                    (isEditMode &&
                      !isValidated &&
                      ["subed_club"].includes(userRole!))
                      ? undefined
                      : {
                          openPickerIcon: () => null,
                          textField: TextField,
                        }
                  }
                />
              </LocalizationProvider>
            ) : type === "switch" ? (
              <Switch
                disabled={!isEditMode}
                {...field}
                checked={field.value}
                color="warning"
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
              />
            ) : (
              <TextField
                select={type === "dropdown"}
                color="warning"
                type={field.value === "N/A" && !isEditMode ? "text" : type}
                variant={
                  isEditMode &&
                  name !== "age" &&
                  isValidated &&
                  ["main_admin", "single_admin"].includes(userRole!)
                    ? "outlined"
                    : isEditMode &&
                        name !== "age" &&
                        isValidated &&
                        !sensitiveFields.includes(name) &&
                        ["subed_club"].includes(userRole!)
                      ? "outlined"
                      : isEditMode &&
                          name !== "age" &&
                          !isValidated &&
                          ["subed_club"].includes(userRole!)
                        ? "outlined"
                        : "standard"
                }
                label=""
                fullWidth
                slotProps={{
                  input: {
                    readOnly:
                      name === "age"
                        ? true
                        : ["main_admin", "single_admin"].includes(userRole!) &&
                            isEditMode
                          ? false
                          : ["subed_club"].includes(userRole!) &&
                              isEditMode &&
                              !sensitiveFields.includes(name)
                            ? false
                            : !(
                                ["subed_club"].includes(userRole!) &&
                                isEditMode &&
                                !isValidated
                              ),
                    disableUnderline: true,
                    style: {
                      fontSize: 22,
                      marginRight: 10,
                      color: field.value === "N/A" ? "lightgray" : "inherit",
                    },
                  },
                }}
                required
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                }}

                // error={!!errors.firstName}
              >
                {type === "dropdown" && name === "graduation"
                  ? GraduationsOptions.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))
                  : type === "dropdown" && name === "gender"
                    ? GenderOptions.filter((item) =>
                        ["Feminino", "Masculino"].includes(item.value),
                      ).map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))
                    : null}
              </TextField>
            );
          }}
        />
      </Box>
      {hasRequest && !["main_admin", "single_admin"].includes(userRole!) ? (
        <Grid container flexDirection={"column"} alignItems={"center"}>
          {exam_request_status === "pending" ? (
            <Tooltip arrow placement="top" title="Pendente">
              <span>
                <HourglassBottom fontSize="medium" color="info" />
              </span>
            </Tooltip>
          ) : (
            <Tooltip
              arrow
              placement="top"
              title={
                is_validated
                  ? "Pedir Proposta de Exame"
                  : "Precisa de verificar este Membro para o propor a Exame."
              }
            >
              <span>
                <IconButton
                  disabled={!is_validated || isEditMode}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                  color={"info"}
                >
                  <Upgrade
                    fontSize="large"
                    color={is_validated && !isEditMode ? "info" : "disabled"}
                  />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Grid>
      ) : null}
    </Grid>
  );
}

export function SectionBlock({
  icon,
  title,
  status,
  children,
  verified,
}: Readonly<{
  icon: React.ReactNode;
  title: string;
  status: boolean;
  children: React.ReactNode;
  verified: boolean;
}>) {
  return (
    <Box
      sx={{
        border: "1px solid lightgray",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: 2,
      }}
    >
      {/* Block header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          px: 2.5,
          py: 2,
          borderBottom: "2px solid #d32f2f",
          bgcolor: "#fff",
          mb: 1,
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            bgcolor: "#d32f2f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" fontWeight={700} sx={{ color: "#1a1a1a" }}>
          {title}
        </Typography>
        {status ? (
          verified ? (
            <Tooltip title="Verificado">
              <VerifiedUser color="info" sx={{ fontSize: 28 }} />
            </Tooltip>
          ) : (
            <Tooltip title="Próprio" sx={{ cursor: "pointer" }}>
              <AccountCircle color="info" sx={{ fontSize: 28 }} />
            </Tooltip>
          )
        ) : null}
      </Box>

      {/* Fields */}
      <Box sx={{ px: 5, py: 2 }}>{children}</Box>
    </Box>
  );
}

export function FieldRow({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Grid container spacing={5} sx={{ py: 1.5 }}>
        {children}
      </Grid>
      <Divider sx={{ borderColor: "#f5f5f5" }} />
    </>
  );
}

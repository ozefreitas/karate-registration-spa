import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Chip,
  Card,
  CircularProgress,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { EncounterOptions, MonthOptions } from "../../config";
import { stringToColor } from "../../dashboard/utils/avatarColor";
import EventCalendarInfo from "../EventsModals/EventCalendarInfo";
import { adminHooks, eventsHooks } from "../../hooks";
import { useSearchParams } from "react-router-dom";
import MonthYearPicker from "./MonthYearPicker";

const WEEKDAYS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

function getEventKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
}

export default function Calendar() {
  const [isEventInfoModalOpen, setIsEventInfoModalOpen] =
    useState<boolean>(false);

  const handleModalOpen = () => {
    setIsEventInfoModalOpen(true);
  };
  const handleModalClose = () => {
    setIsEventInfoModalOpen(false);
  };
  const today = new Date();
  const [clickedEventData, setClickedEventData] = useState(undefined);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [currentSeason, setCurrentSeason] = useState<string>("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramMonth = searchParams.get("month") ?? String(today.getMonth());

  const changeMonth = (number: string) => {
    setSearchParams((prev) => {
      prev.set("month", number);
      return prev;
    });
  };

  const handlePrev = () => {
    if (month === 1) {
      setMonth(12);
      // changeMonth("12");
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (month === 12) {
      setMonth(1);
      // changeMonth("1");
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Build grid cells: leading empty + day cells
  const cells: any = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (day: number) =>
    day &&
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day;

  const { data } = adminHooks.useFetchCurrentSeason();

  useEffect(() => {
    if (data?.season) {
      setCurrentSeason(data.season);
    }
  }, [data]);

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    error: eventsError,
    refetch,
  } = eventsHooks.useFetchEventsData(
    1,
    20,
    undefined,
    currentSeason,
    false,
    false,
    false,
    false,
    `${year}-${month < 9 ? "0" : ""}${month.toString()}`,
  );

  return (
    <Grid size={12} sx={{ p: 2, fontFamily: "inherit" }}>
      {/* Header */}
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        mb={3}
        spacing={3}
      >
        <IconButton
          onClick={handlePrev}
          sx={{ bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
        >
          <ChevronLeft />
        </IconButton>
        <Typography
          variant="h4"
          color="info"
          fontWeight={700}
          onClick={() => setPickerOpen(true)}
          sx={{
            minWidth: 260,
            textAlign: "center",
            cursor: "pointer",
            userSelect: "none",
            "&:hover": { color: "#d32f2f" },
            transition: "color 0.15s ease",
          }}
        >
          {MonthOptions.find((item) => item.value === month)?.label} {year}
        </Typography>
        <IconButton
          onClick={handleNext}
          sx={{ bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0e0e0" } }}
        >
          <ChevronRight />
        </IconButton>
        <Button
          onClick={() => {
            setMonth(today.getMonth() + 1);
            setYear(today.getFullYear());
          }}
          color="info"
          variant="contained"
          disabled={
            today.getMonth() + 1 === month && today.getFullYear() === year
          }
        >
          Hoje
        </Button>
      </Grid>
      {isEventsDataLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : eventsError ? (
        <Grid my={3} container justifyContent="center" size={12}>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText primary="Ocorreu um erro ao encontrar os Membros disponíveis, tente mais tarde ou contacte um administrador."></ListItemText>
          </ListItem>
          <Button
            onClick={() => {
              refetch();
            }}
          >
            Refrescar
          </Button>
        </Grid>
      ) : (
        <>
          <Card elevation={2}>
            <Grid container>
              {WEEKDAYS.map((day) => (
                <Grid
                  justifyContent={"center"}
                  bgcolor={"black"}
                  container
                  key={day}
                  sx={{ flex: 1 }}
                >
                  <Box
                    sx={{
                      color: "white",
                      textAlign: "center",
                      py: 2,
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      letterSpacing: 1,
                    }}
                  >
                    {day}
                  </Box>
                </Grid>
              ))}
            </Grid>

            {Array.from({ length: cells.length / 7 }, (_, rowIdx) => (
              <Grid
                container
                key={rowIdx}
                sx={{ borderTop: "1px solid #e0e0e0" }}
              >
                {cells
                  .slice(rowIdx * 7, rowIdx * 7 + 7)
                  .map((day: any, colIdx: any) => {
                    const key = day ? getEventKey(year, month, day) : null;
                    const dayEvents = key
                      ? eventsData?.results.filter(
                          (event: any) => event.event_date === key,
                        ) || []
                      : [];
                    console.log(today.getDay());
                    const todayCell = isToday(day);

                    return (
                      <Grid
                        container
                        key={colIdx}
                        sx={{
                          flex: 1,
                          minHeight: 125,
                          borderLeft: colIdx > 0 ? "1px solid #e0e0e0" : "none",
                          bgcolor: todayCell ? "#fffde7" : "transparent",
                          p: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        {day && (
                          <>
                            <Grid
                              container
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Box
                                sx={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  // bgcolor: todayCell ? "#e53935" : "transparent",
                                  // color: todayCell ? "#fff" : "inherit",
                                  fontWeight: todayCell ? 700 : 400,
                                  fontSize: todayCell ?  "1.2rem" : "0.95rem",
                                }}
                              >
                                {day}
                              </Box>
                              {/* Dot indicator for event type of the first event */}
                              {dayEvents.length > 0 &&
                                day >= today.getDate() && (
                                  <Box
                                    mr={0.5}
                                    sx={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: "50%",
                                      bgcolor: EncounterOptions.find(
                                        (item) =>
                                          item.value ===
                                          dayEvents[0].encounter_type,
                                      )?.color,
                                    }}
                                  />
                                )}
                            </Grid>

                            {/* Event chips */}
                            {dayEvents.map((evt: any, i: any) => (
                              <Chip
                                key={i}
                                label={evt.name}
                                size="small"
                                clickable
                                onClick={() => {
                                  setClickedEventData(evt);
                                  handleModalOpen();
                                }}
                                sx={{
                                  bgcolor: EncounterOptions.find(
                                    (item) => item.value === evt.encounter_type,
                                  )?.color,
                                  color: "#fff",
                                  fontWeight: 600,
                                  fontSize: "0.72rem",
                                  height: 22,
                                  textDecoration:
                                    day >= today.getDate()
                                      ? "none"
                                      : "line-through",
                                  cursor: "pointer",
                                  "& .MuiChip-label": { px: 1 },
                                  "&:hover": { opacity: 0.95 },
                                }}
                              />
                            ))}
                          </>
                        )}
                      </Grid>
                    );
                  })}
              </Grid>
            ))}
          </Card>

          <Grid
            container
            spacing={3}
            rowSpacing={1}
            justifyContent={"center"}
            m={2}
          >
            {Object.entries(EncounterOptions).map(([_, { color, label }]) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: color,
                  }}
                />
                <Typography variant="body2" fontWeight={500}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Grid>
        </>
      )}
      <EventCalendarInfo
        handleModalClose={handleModalClose}
        isModalOpen={isEventInfoModalOpen}
        eventData={clickedEventData}
      ></EventCalendarInfo>
      <MonthYearPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        currentMonth={month}
        currentYear={year}
        onConfirm={(m, y) => {
          setMonth(m);
          setYear(y);
        }}
      />
    </Grid>
  );
}

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
  Tooltip,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { EncounterOptions, MonthOptions } from "../../config";
import EventCalendarInfo from "../EventsModals/EventCalendarInfo";
import { adminHooks, eventsHooks } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import MonthYearPicker from "./MonthYearPicker";
import ListDayEventsModal from "../EventsModals/ListDayEventsModal";

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
  const navigate = useNavigate();
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
  const [listModalOpen, setListModalOpen] = useState(false);

  const handleListModalOpen = () => {
    setListModalOpen(true);
  };
  const handleListModalClose = () => {
    setListModalOpen(false);
  };

  const [clickedDay, setClickedDay] = useState<string>("");
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
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
    "",
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
          sx={{ bgcolor: "#ffffff", "&:hover": { bgcolor: "#e0e0e0" } }}
        >
          <ChevronLeft />
        </IconButton>
        <Tooltip title={"Selecionar Mês e Ano"} placement="top">
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
              "&:hover": { color: "#d32f2f", transform: "translateY(-3px)" },
              transition: "0.15s ease",
            }}
          >
            {MonthOptions.find((item) => item.value === month)?.label} {year}
          </Typography>
        </Tooltip>
        <IconButton
          onClick={handleNext}
          sx={{ bgcolor: "#ffffff", "&:hover": { bgcolor: "#e0e0e0" } }}
        >
          <ChevronRight />
        </IconButton>
        <Tooltip title={"Voltar ao mês atual"} placement="top">
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
        </Tooltip>
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
          <Card elevation={2} sx={{ p: 3 }}>
            <Grid container>
              {WEEKDAYS.map((day) => (
                <Grid
                  justifyContent={"center"}
                  bgcolor={"black"}
                  container
                  key={day}
                  borderRadius={3}
                  sx={{ flex: 1 }}
                  mx={0.5}
                  mb={5}
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
                sx={{ borderTop: rowIdx === 0 ? "none" : "1px solid #e0e0e0" }}
              >
                {cells
                  .slice(rowIdx * 7, rowIdx * 7 + 7)
                  .map((day: any, colIdx: any) => {
                    const key = day ? getEventKey(year, month, day) : null;

                    const dayEvents = key
                      ? eventsData?.results.filter(
                          (event) => event.event_date === key,
                        ) || []
                      : [];
                    const todayCell = isToday(day);

                    return (
                      <Grid
                        container
                        key={`${rowIdx}|${colIdx}`}
                        onMouseEnter={() =>
                          day !== null && setHoveredDay(`${rowIdx}|${colIdx}`)
                        }
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={() => {
                          const formattedDay = day < 10 ? `0${day}` : day;
                          const formattedMonth =
                            month < 10 ? `0${month}` : month;
                          if (dayEvents.length <= 1) {
                            navigate(
                              `new_event/?date=${year}-${formattedMonth}-${formattedDay}`,
                            );
                          } else {
                            setClickedDay(day);
                            setListModalOpen(true);
                          }
                        }}
                        sx={{
                          flex: 1,
                          minHeight: 125,
                          transition: "0.15s ease",
                          "&:hover": {
                            bgcolor: day === null ? null : "#fdecea",
                            transform: day === null ? null : "scale(1.2)",
                            borderLeft: day === null ? null : "transparent",
                            cursor: day === null ? null : "pointer",
                            zIndex: 99,
                            borderRadius: day === null ? null : 4,
                          },
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
                                  fontWeight: todayCell ? 800 : 400,
                                  fontSize: todayCell ? "1.5rem" : "0.95rem",
                                }}
                              >
                                {day}
                              </Box>
                              {/* Dot indicator for event type of the first event */}
                              {dayEvents.length > 0 &&
                                new Date(year, month - 1, day) >
                                  new Date(new Date().setHours(0, 0, 0, 0)) && (
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
                            {(() => {
                              const visibleEvents = dayEvents.slice(0, 2);
                              const hiddenCount = dayEvents.length - 2;
                              const dayKey = `${year}-${month}-${day}`;
                              const isHovered = hoveredDay === dayKey;
                              return (
                                <>
                                  {visibleEvents.map((evt: any, i: any) => (
                                    <Chip
                                      key={i}
                                      label={evt.name}
                                      size="small"
                                      clickable
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setClickedEventData(evt);
                                        handleModalOpen();
                                      }}
                                      sx={{
                                        bgcolor: EncounterOptions.find(
                                          (item) =>
                                            item.value === evt.encounter_type,
                                        )?.color,
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: "0.72rem",
                                        height: 22,
                                        textDecoration:
                                          new Date(year, month - 1, day) <
                                          new Date(
                                            new Date().setHours(0, 0, 0, 0),
                                          )
                                            ? "line-through"
                                            : "none",
                                        cursor: "pointer",
                                        "& .MuiChip-label": { px: 1 },
                                        "&:hover": { opacity: 0.95 },
                                      }}
                                    />
                                  ))}

                                  {hiddenCount > 0 && (
                                    <Chip
                                      label={
                                        hoveredDay === `${rowIdx}|${colIdx}`
                                          ? "Clique p. ver Todos"
                                          : `+${hiddenCount}`
                                      }
                                      size="small"
                                      clickable
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleListModalOpen();
                                      }}
                                      sx={{
                                        bgcolor: "grey.300",
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: "0.72rem",
                                        height: 22,
                                        cursor: "pointer",
                                        letterSpacing: isHovered ? 0 : "0.05em",
                                        transition: "all 0.2s ease",
                                        "& .MuiChip-label": { px: 1 },
                                        "&:hover": { opacity: 0.95 },
                                      }}
                                    />
                                  )}
                                </>
                              );
                            })()}
                            {hoveredDay === `${rowIdx}|${colIdx}` &&
                            day !== null &&
                            dayEvents.length <= 1 ? (
                              <Chip
                                label="Clique para ad. Evento"
                                size="small"
                                sx={{
                                  color: "#fff",
                                  fontWeight: 600,
                                  fontSize: "0.72rem",
                                  height: 22,
                                  cursor: "pointer",
                                  "& .MuiChip-label": { px: 1 },
                                }}
                              />
                            ) : null}
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
            mt={5}
            py={2}
            borderRadius={2}
            bgcolor={"#ffffff"}
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
      <ListDayEventsModal
        date={getEventKey(year, month, Number(clickedDay))}
        handleModalClose={handleListModalClose}
        isModalOpen={listModalOpen}
        eventsData={eventsData?.results.filter(
          (event) =>
            event.event_date === getEventKey(year, month, Number(clickedDay)),
        )}
      ></ListDayEventsModal>
    </Grid>
  );
}

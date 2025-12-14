import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { eventsHooks } from "../../hooks";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  Pagination,
  Typography,
} from "@mui/material";
import stringAvatar from "../../dashboard/utils/avatarColor";
import CompInfoToolTip from "../../dashboard/CompInfoToolTip";
import { AccessTime, HowToReg, LocationPin, Today } from "@mui/icons-material";
import SettingsButton from "../Buttons/SettingsButton";
import "dayjs/locale/pt";
import {
  PickerSelectionState,
  PickerValue,
} from "@mui/x-date-pickers/internals";
import { DateView } from "@mui/x-date-pickers/models";

function ServerDay(props: PickersDayProps & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🟢" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function EventCallendar(props: {
  ordering: any;
  filtersWatch: any;
}) {
  type Event = {
    id: string;
    name: string;
    season: string;
    location: string;
    event_date: string;
    has_registrations: boolean;
    number_registrations: number;
    is_open: boolean;
    is_retification: boolean;
    is_closed: boolean;
    has_ended: boolean;
  };

  const initialValue = dayjs();
  const [month, setMonth] = React.useState<string>(
    initialValue.format("YYYY-MM")
  );
  const [day, setDay] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading } = eventsHooks.useFetchEventDaysperMonth(month);

  const {
    data: eventsData,
    isLoading: isEventsDataLoading,
    error: eventsError,
  } = eventsHooks.useFetchEventsData(
    page,
    5,
    props.ordering,
    props.filtersWatch("season"),
    props.filtersWatch("has_ended"),
    props.filtersWatch("has_teams"),
    props.filtersWatch("has_categories"),
    props.filtersWatch("has_registrations"),
    month,
    day
  );

  const [highlightedDays, setHighlightedDays] = React.useState([]);

  React.useEffect(() => {
    if (data?.data?.days) {
      setHighlightedDays(data.data.days);
    }
  }, [data]);

  const fetchHighlightedDays = (date: Dayjs) => {
    setMonth(date.format("YYYY-MM"));
  };

  const handleMonthChange = (date: Dayjs) => {
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDayChange = (
    value: PickerValue,
    _selectionState?: PickerSelectionState,
    _selectedView?: DateView | undefined
  ) => {
    if (value) {
      setDay(value.format("DD"));
    }
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid size={12}>
      <Card sx={{ m: 2, mt: 0 }}>
        <CardContent>
          <Grid container justifyContent={"space-between"} size={12}>
            <Grid size={3} p={1}>
              <Card elevation={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt"
                >
                  <DateCalendar
                    views={["month", "day"]}
                    // defaultValue={initialValue}
                    loading={isLoading}
                    renderLoading={() => <DayCalendarSkeleton />}
                    onMonthChange={handleMonthChange}
                    onChange={handleDayChange}
                    slots={{
                      day: ServerDay,
                    }}
                    slotProps={{
                      day: {
                        highlightedDays,
                      } as any,
                    }}
                  />
                </LocalizationProvider>
              </Card>
            </Grid>
            <Grid size={9}>
              <CardContent
                sx={{
                  p: 0,
                  pl: 1,
                  "&:last-child": {
                    paddingBottom: 0,
                  },
                }}
              >
                {isLoading ? (
                  <Grid my={3} container justifyContent="center" size={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CircularProgress />
                    </Box>
                  </Grid>
                ) : eventsData?.data?.count === 0 ? (
                  <Grid mt={5} container justifyContent="center" size={12}>
                    <Typography variant="h6" sx={{ color: "gray" }}>
                      Não foram encontrados Eventos para esse mês.
                    </Typography>
                  </Grid>
                ) : (
                  eventsData?.data?.results.map(
                    (comp: Event, index: string) => (
                      <Grid size={12} key={index} sx={{ p: 1 }}>
                        <Card elevation={3}>
                          <CardContent
                            sx={{
                              p: 0,
                              pl: 1,
                              "&:last-child": {
                                paddingBottom: 0,
                              },
                            }}
                          >
                            <Grid container alignItems="center" size={12}>
                              <Grid size={4} sx={{ p: 1 }}>
                                <Card
                                  sx={{
                                    backgroundColor: "lightgray",
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 2,
                                  }}
                                >
                                  <Avatar
                                    {...stringAvatar(comp.name, 120)}
                                  ></Avatar>
                                </Card>
                              </Grid>
                              <Grid container size={8} sx={{ p: 2 }}>
                                <Grid size={12}>
                                  <Typography
                                    sx={{ pl: 3, fontWeight: "bold" }}
                                    variant="h5"
                                  >
                                    {comp.name}
                                  </Typography>
                                </Grid>
                                <Grid size={8}>
                                  <List>
                                    <Grid container size={12}>
                                      <Grid size={8}>
                                        <CompInfoToolTip
                                          title="Dia do Evento"
                                          text={comp.event_date}
                                          icon={<Today />}
                                        ></CompInfoToolTip>
                                      </Grid>
                                      <Grid size={4}>
                                        {comp.has_registrations ? (
                                          <CompInfoToolTip
                                            title="Número de Inscritos"
                                            text={comp.number_registrations.toString()}
                                            icon={<HowToReg />}
                                          ></CompInfoToolTip>
                                        ) : null}
                                      </Grid>
                                    </Grid>
                                    <CompInfoToolTip
                                      title="Localização"
                                      text={comp.location}
                                      icon={<LocationPin />}
                                    ></CompInfoToolTip>
                                    <CompInfoToolTip
                                      title="Estado"
                                      text={
                                        comp.has_ended
                                          ? "Realizado"
                                          : comp.is_open || comp.is_retification
                                          ? "Inscrições em Progresso"
                                          : comp.is_closed
                                          ? "Inscrições Encerradas"
                                          : "Por Iniciar"
                                      }
                                      icon={<AccessTime />}
                                    ></CompInfoToolTip>
                                  </List>
                                </Grid>
                                <Grid
                                  container
                                  justifyContent="flex-end"
                                  alignContent="flex-end"
                                  size={4}
                                >
                                  <SettingsButton
                                    size="large"
                                    label="Consultar"
                                    to={`/events/${comp.id}/`}
                                  ></SettingsButton>
                                </Grid>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  )
                )}
              </CardContent>
            </Grid>
          </Grid>
        </CardContent>
        {eventsData?.data.count === 0 ||
        isEventsDataLoading ||
        eventsError ? null : (
          <Grid size={12} my={3} container justifyContent={"center"}>
            <Pagination
              count={Math.ceil(eventsData?.data.count / 5)}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Grid>
        )}
      </Card>
    </Grid>
  );
}

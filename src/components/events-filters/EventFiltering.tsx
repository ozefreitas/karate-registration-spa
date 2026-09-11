import { Tune } from "@mui/icons-material";
import FilterDrawer from "../filter_drawers/FilterDrawer";
import EventFilteringContent from "./EventFilteringContent";

export default function EventFiltering(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    reset: any;
    changedCount: number;
    setPage: any;
  }>,
) {
  return (
    <FilterDrawer
      label="Filtragem"
      changedCount={props.changedCount}
      isLoading={props.isLoading}
      icon={<Tune />}
    >
      <EventFilteringContent
        control={props.control}
        reset={props.reset}
        changedCount={props.changedCount}
        setPage={props.setPage}
      />
    </FilterDrawer>
  );
}

import { Tune } from "@mui/icons-material";
import FilterDrawer from "../../filter_drawers/FilterDrawer";
import MemberFilteringContent from "./MemberFilteringContent";

export default function MemberFiltering(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    reset: any;
    changedCount: number;
    setValue: any;
    setPage: any;
    setSelectedUsers: any;
  }>,
) {
  return (
    <FilterDrawer
      label="Filtragem"
      changedCount={props.changedCount}
      isLoading={props.isLoading}
      icon={<Tune />}
    >
      <MemberFilteringContent
        control={props.control}
        reset={props.reset}
        changedCount={props.changedCount}
        setValue={props.setValue}
        setPage={props.setPage}
        setSelectedUsers={props.setSelectedUsers}
      />
    </FilterDrawer>
  );
}

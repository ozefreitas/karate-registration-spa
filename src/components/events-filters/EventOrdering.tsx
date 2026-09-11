import FilterDrawer from "../filter_drawers/FilterDrawer";
import EventOrderingContent from "./EventOrderingContent";

export default function EventOrdering(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    reset: any;
    changedCount: number;
    orderFields: any;
    setOrderFields: any;
  }>,
) {
  return (
    <FilterDrawer
      label="Ordem"
      changedCount={props.changedCount}
      isLoading={props.isLoading}
    >
      <EventOrderingContent
        control={props.control}
        reset={props.reset}
        changedCount={props.changedCount}
        orderFields={props.orderFields}
        setOrderFields={props.setOrderFields}
      />
    </FilterDrawer>
  );
}

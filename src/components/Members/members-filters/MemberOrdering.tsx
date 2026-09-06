import FilterDrawer from "../../filter_drawers/FilterDrawer";
import MemberOrderingContent from "./MemberOrderingContent";

export default function MemberOrdering(
  props: Readonly<{
    isLoading: boolean;
    control: any;
    errors: any;
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
      <MemberOrderingContent
        control={props.control}
        reset={props.reset}
        changedCount={props.changedCount}
        orderFields={props.orderFields}
        setOrderFields={props.setOrderFields}
      />
    </FilterDrawer>
  );
}

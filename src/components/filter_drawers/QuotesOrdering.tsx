import FilterDrawer from "./FilterDrawer";
import QuotesOrderingContent from "./QuotesOrderingContent";

export default function QuotesOrdering(
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
      <QuotesOrderingContent
        control={props.control}
        reset={props.reset}
        changedCount={props.changedCount}
        orderFields={props.orderFields}
        setOrderFields={props.setOrderFields}
      />
    </FilterDrawer>
  );
}

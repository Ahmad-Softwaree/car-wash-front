import Container from "@/components/ui/Container";
import ExpenseReportList from "@/containers/ExpenseReportList";

const ExpenseReport = () => {
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start"
      >
        <ExpenseReportList />
      </Container>
    </>
  );
};

export default ExpenseReport;

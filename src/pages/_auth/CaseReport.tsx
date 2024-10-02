import Container from "@/components/ui/Container";
import CaseReportList from "@/containers/CaseReportList";

const CaseReport = () => {
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start"
      >
        <CaseReportList />
      </Container>
    </>
  );
};

export default CaseReport;

import Container from "@/components/ui/Container";
import ReservationReportList from "@/containers/ReservationReportList";

const ReservationReport = () => {
  return (
    <>
      <Container
        as={`div`}
        className="w-full gap-10 flex flex-col justify-start items-start"
      >
        <ReservationReportList />
      </Container>
    </>
  );
};

export default ReservationReport;

import Container from "@/components/ui/Container";
import { ENUMs } from "@/lib/enum";
import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error: any = useRouteError();
  return (
    <Container
      as={`div`}
      className="w-full flex flex-col justify-center items-center gap-5 h-screen dark-light">
      <span className="text-[25px] md:text-[35px] lg:text-[50px] text-center z-50">
        هەڵە ڕوویداوە
      </span>
      <span className="text-[25px] md:text-[35px] lg:text-[50px] text-center z-50 font-poppins">
        {" "}
        {error?.message}
      </span>
      <Link
        to={`${ENUMs.GENERAL_SECTION}/${ENUMs.DASHBOARD_PART}`}
        className="dark-light rounded-lg cursor-pointer py-2 md:py-3 px-5 md:px-10 z-50 font-bukra text-sm md:text-lg">
        گەڕانەوە بۆ پەرەی سەرەکی
      </Link>
    </Container>
  );
}

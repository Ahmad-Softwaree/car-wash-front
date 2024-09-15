import Container from "@/components/ui/Container";
import { useGlobalContext } from "@/context/GlobalContext";
import { CONTEXT_TYPEs } from "@/context/types";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { ChevronLeft, SunMoon } from "lucide-react";
import { useLocation } from "react-router-dom"; // To get the current URL

const Header = () => {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);
  const { dispatch } = useGlobalContext();
  return (
    <Container
      as={`header`}
      className="w-full flex flex-row justify-between items-center gap-10 dark-light">
      <Breadcrumbs
        separator={<ChevronLeft />}
        className="dark-light"
        aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <span
              key={index}
              className="dark-light !font-bukra !text-md !font-bold">
              {breadcrumb.label}
            </span>
          ) : (
            <span
              key={index}
              className="dark-light !font-bukra !text-md !text-opacity-50">
              {breadcrumb.label}
            </span>
          );
        })}
      </Breadcrumbs>
      <div className="flex flex-row justify-center items-center gap-4">
        <SunMoon
          onClick={() => {
            let mode = document.getElementsByTagName("html")[0];
            mode.classList.toggle("dark");
            if (!mode.classList.contains("dark")) {
              localStorage.setItem("theme", "light");
              dispatch({
                type: CONTEXT_TYPEs.THEME,
                payload: "light",
              });
            } else {
              localStorage.setItem("theme", "dark");
              dispatch({
                type: CONTEXT_TYPEs.THEME,
                payload: "dark",
              });
            }
          }}
          className="cursor-pointer p-3 w-12 h-12 light-dark rounded-full"
        />
      </div>
    </Container>
  );
};

export default Header;

function generateBreadcrumbs(pathname: string) {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = decodeURIComponent(segment);

    return { label, href };
  });

  return [...breadcrumbs];
}

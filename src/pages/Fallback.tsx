import { Circles } from "react-loader-spinner";

export default function Fallback() {
  let theme = localStorage.getItem("theme");
  return (
    <section className="fallback dark-light w-full flex flex-row justify-center items-center m-auto text-white">
      <Circles
        height="80"
        width="80"
        color={theme == "light" ? "#000" : "#fff"}
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      )
    </section>
  );
}

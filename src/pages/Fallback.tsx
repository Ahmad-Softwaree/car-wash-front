import { Circles } from "react-loader-spinner";

export default function Fallback() {
  return (
    <section className="fallback dark-light w-full flex flex-row justify-center items-center m-auto text-white">
      <Circles
        height="80"
        width="80"
        color="#fff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      )
    </section>
  );
}

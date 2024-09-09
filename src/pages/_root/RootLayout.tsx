import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className=" w-full">
      <section className="auth w-full flex flex-row justify-center items-center">
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;

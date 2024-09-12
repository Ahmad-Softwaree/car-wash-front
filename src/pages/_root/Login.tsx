import LoginForm from "@/components/forms/LoginForm";
import Container from "@/components/ui/Container";
import Image from "@/components/ui/Image";

export default function Login() {
  return (
    <Container
      as={`div`}
      className={`auth flex flex-row justify-center items-center  w-full h-screen`}>
      <div className="w-full h-screen md:w-fit md:h-fit flex flex-col justify-center md:justify-start  items-center gap-5  p-5 text-primary-800 dark:text-white bg-white dark:bg-primary-700 rounded-none md:rounded-lg shadow-2xl shadow-white dark:shadow-primary-900 drop-shadow-2xl border-2 border-primary-200 border-opacity-20 border-solid">
        <Image
          height={100}
          width={100}
          loading="lazy"
          className="object-contain rounded-full"
          image="/images/logo.jpg"
          alt="circle"
        />
        <h1 className="text-center font-bukra font-bold text-2xl">
          چوونەژوورەوە
        </h1>
        <LoginForm />{" "}
      </div>
    </Container>
  );
}

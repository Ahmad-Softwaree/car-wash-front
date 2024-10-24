import LoginForm from "@/components/forms/LoginForm";
import Container from "@/components/ui/Container";
import Image from "@/components/ui/Image";
import { useGetCompanyInfo } from "@/lib/react-query/query/config.query";

export default function Login() {
  const { data: info } = useGetCompanyInfo();

  return (
    <Container
      as={`div`}
      className={`auth flex flex-row justify-center items-center  w-full h-screen`}
    >
      <div className="w-full h-screen max-h-[600px] max-w-[600px] flex flex-col justify-center md:justify-start  items-center gap-5  p-5 text-primary-800 dark:text-white bg-secondary-100 dark:bg-primary-700 rounded-none md:rounded-lg shadow-2xl shadow-white dark:shadow-primary-900 drop-shadow-2xl border-2 border-primary-200 border-opacity-20 border-solid">
        <Image
          height={200}
          width={200}
          loading="lazy"
          className="object-contain rounded-full"
          image={
            info?.image_url != "" ? info?.image_url : "/images/ap-soft.jpg"
          }
          alt="circle"
        />
        <h1 className="text-center font-bukra font-bold text-3xl">
          چوونەژوورەوە
        </h1>
        <LoginForm />{" "}
      </div>
    </Container>
  );
}

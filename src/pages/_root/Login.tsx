import LoginForm from "@/components/forms/LoginForm";
import Container from "@/components/ui/Container";
import Image from "@/components/ui/Image";

export default function Login() {
  return (
    <Container
      as={`div`}
      className={`auth grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-5 w-full h-fit xl:h-screen`}>
      <div className="col-span-full row-span-1 order-2 xl:order-1 xl:col-span-3 h-full flex flex-col justify-start items-start gap-2 p-5 text-white  blue-liner pr-10 lg:pr-30 lg:pt-30 xl:pr-40 pt-10 xl:pt-40 relative">
        <Image
          height={430}
          width={430}
          loading="lazy"
          className="object-contain absolute right-0 -bottom-30 z-20"
          image="/images/circle.svg"
          alt="circle"
        />
        <Image
          height={430}
          width={430}
          loading="lazy"
          className="object-contain absolute -right-20 -bottom-30 z-20"
          image="/images/circle2.svg"
          alt="circle"
        />

        <h1 className="font-bold text-[30px] z-50">سیستمی بەڕێوەبردنی غەسل</h1>
        <h1 className="text-[20px] opacity-70 z-50">
          دیزاین و جێبەجێکردنی ئەم سیستمە لەلایەن{" "}
          <span className="font-poppins">AP Soft</span>
        </h1>
        <a
          rel="noopener"
          href="https://www.ap-soft.tech/?fbclid=IwY2xjawFKiXZleHRuA2FlbQIxMAABHVEWTRIIR-BqvgSr7O8FTMd3DX4RHZ1munDMk83gAfirU7PjPmFSVKvK8A_aem_-7Cf73gMg6Oes_yJMSZHxw"
          target="_blank"
          className="bg-black-600 text-white z-50 rounded-md p-3 px-6 text-nowrap mt-3 font-poppins">
          AP Soft
        </a>
      </div>
      <div className="col-span-full row-span-1 order-1 xl:order-2 xl:col-span-2 h-full flex flex-col xl:pt-20 justify-start pt-5 lg:pt-10 items-center gap-5  p-5">
        <Image
          height={100}
          width={100}
          loading="lazy"
          className="object-contain rounded-full"
          image="/images/logo.jpg"
          alt="circle"
        />
        <h1 className="text-center font-bold text-[30px]">چوونەژوورەوە</h1>
        <LoginForm />{" "}
        <p className="mt-auto text-primary-500 text-md">
          {new Date().getFullYear()} &copy;
        </p>
      </div>
    </Container>
  );
}

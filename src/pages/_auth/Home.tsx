import HomeCard from "@/components/cards/HomeCard";
import Container from "@/components/ui/Container";
import { PackageSearch, ReceiptText, UserCog, Users } from "lucide-react";

const Home = () => {
  return (
    <Container as={`div`}>
      <div className="w-full flex flex-row justify-start items-center gap-5 md:gap-10 flex-wrap">
        <HomeCard Icon={<PackageSearch />} title="ڕێژەی مواد" body={1000} />
        <HomeCard Icon={<ReceiptText />} title="پسولەکان" body={1000} />
        <HomeCard Icon={<UserCog />} title="بەکارهێنەران" body={1000} />
        <HomeCard Icon={<Users />} title="کڕیارەکان" body={1000} />
      </div>
    </Container>
  );
};

export default Home;

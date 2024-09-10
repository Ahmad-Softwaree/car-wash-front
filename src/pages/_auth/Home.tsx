import HomeCard from "@/components/cards/HomeCard";
import { Table, Tbody, THead } from "@/components/ui";
import Container from "@/components/ui/Container";
import { homeBoxes } from "@/constants";
import { useAuthContext } from "@/context/AuthContext";
import { HomeBox } from "@/types/global";
import { Part } from "@/types/part";

const Home = () => {
  const {
    state: { user },
  } = useAuthContext();

  let userParts: string[] = user?.parts.map(
    (val: Part, _index: number) => val.name
  );

  return (
    <Container as={`div`}>
      <div className="w-full flex flex-row justify-start items-center gap-5 md:gap-10 flex-wrap">
        {homeBoxes.map((val: HomeBox, _index: number) => {
          return (
            val.name != "مەندووبەکان" &&
            userParts.includes(val.name) && <HomeCard key={val.id} {...val} />
          );
        })}
      </div>
    </Container>
  );
};

export default Home;

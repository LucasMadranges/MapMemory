import Container2XL from "../../components/layout/Container2XL";
import Navigation from "../../components/layout/Navigation";
import Map from "../../components/map/Map";

export default function Page() {
  return (
    <Container2XL className={"h-[calc(100svh-32px)]"}>
      <div className={"bg-blue-500 h-full rounded-2xl flex"}>
        <Navigation/>
        <Map/>
      </div>
    </Container2XL>
  );
}

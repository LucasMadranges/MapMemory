import Container2XL from "../../components/layout/Container2XL";
import Navigation from "../../components/layout/Navigation";

export default function Page() {
  return (
    <Container2XL className={"h-[calc(100svh-32px)]"}>
      <div className={"bg-blue-500 h-full rounded-2xl flex"}>
        <Navigation/>
        <div>
          Map
        </div>
      </div>
    </Container2XL>
  );
}

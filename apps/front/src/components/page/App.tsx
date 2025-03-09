import Container2XL from "../layout/Container2XL";
import Navigation from "../layout/Navigation";
import Map from "../map/Map";

export default function App() {
  return (
    <Container2XL className={"h-svh sm:h-[calc(100svh-32px)]"}>
      <div className={"bg-blue-500 h-full sm:rounded-2xl flex flex-col-reverse sm:flex-row"}>
        <Navigation/>
        <Map/>
      </div>
    </Container2XL>
  );
}

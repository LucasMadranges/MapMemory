import Container2XL from "../layout/Container2XL";
import Navigation from "../layout/Navigation";
import Map from "../map/Map";

export default function App() {
  return (
    <Container2XL className={"h-svh"}>
      <div className={"relative h-full flex flex-col-reverse sm:flex-row"}>
        <Navigation/>
        <Map/>
      </div>
    </Container2XL>
  );
}

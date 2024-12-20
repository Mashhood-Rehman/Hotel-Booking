import About from "./About/page";
import Testimonials from "./Testimonial/page";
import Cities from "./Cities/page";
import Header from "./Header/page";
import Comfort from "./Comfort/page";
import Amenities from "./Amenities/page";
export default function Home() {
  return (
    <>
      <div>
        <Header />
        <Comfort />
        {/* <Cities /> */}
        <About />
        <Amenities />
        <Testimonials />
      </div>
    </>
  );
}

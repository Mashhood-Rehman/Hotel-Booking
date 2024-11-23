import AboutUs from "./About/page";
import Cities from "./Components/Cities/page";
import Hero from "./Components/Hero/page";
import Testimonials from "./Components/Testimonial/page";
export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <Cities />
        <AboutUs />
        <Testimonials />
      </div>
    </>
  );
}

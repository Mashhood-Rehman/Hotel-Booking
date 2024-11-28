import About from "./About/page";
import Testimonials from "./Testimonial/page";
import Cities from "./Cities/page";
import Header from "./Header/page";
export default function Home() {
  return (
    <>
      <div>
        <Header />
        <Cities />
        <About />
        <Testimonials />
      </div>
    </>
  );
}

import Categories from "../Components/Categories";
import Working from "../Components/Working";
import Hero from "../Components/Hero";
import Featured from "../Components/Featured";
import MostSearched from "../Components/MostSearched";
import LocalPulseFeatures from "../Components/WhatweDo";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <div className="font-grotesque bg-white">
      <Hero/>
      <LocalPulseFeatures/>
      <MostSearched />
      <Categories />
      <Working />
      <Featured/>
      <Footer/>
    </div>
  );
}
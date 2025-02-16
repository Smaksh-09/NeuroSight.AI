import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import HowTo from './components/HowTo';
import DailyFacts from './components/DailyFacts';

export default function Home() {
  return (
    <div className="bg-white h-screen">
      <NavBar/>
      <div className="mt-10">
        <Hero/>
        <HowTo />
        <DailyFacts />
      </div>
    </div>
  );
}

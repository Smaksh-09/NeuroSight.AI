import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import HowTo from './components/HowTo';
import DailyFacts from './components/DailyFacts';
import Background from "./components/Background";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background wrapper */}
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        <NavBar/>
        <Hero/>
        <HowTo />
        <DailyFacts />
      </div>
    </div>
  );
}

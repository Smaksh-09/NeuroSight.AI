import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
export default function Home() {
  return (
    <div className="bg-white h-screen">
      <NavBar/>
      <div className="mt-10">
      <Hero/>
      </div>
    </div>
  );
}

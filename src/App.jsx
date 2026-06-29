import { useState } from "react";
import Home from "./pages/Home.jsx";
import SplashScreen from "./components/SplashScreen/SplashScreen.jsx";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = () => {
    window.scrollTo(0, 0);
    setSplashDone(true);
  };

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      <Home />
    </>
  );
}

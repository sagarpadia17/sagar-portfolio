import { useState } from 'react'
import Home from './pages/Home.jsx'
import SplashScreen from './components/SplashScreen/SplashScreen.jsx'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  return (
    <>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <Home />
    </>
  )
}

import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import AthletesPage from './pages/AthletesPage'

function App() {

  const [isLogedIn, setIsLogedIn] = useState(false)

  return (
    <>
      <Header isLogedIn={isLogedIn}></Header>
      <AthletesPage></AthletesPage>
    </>
  )
}

export default App

import React, { useEffect, useRef, useState } from "react"
import "./Home.css"
import Navbar from './components/Navbar/Navbar'
import HomeBanner from "./components/HomeBanner/HomeBanner"
import HomeFilters from "./components/HomeFilters/HomeFilters"
import HomeAds from "./components/HomeAds/HomeAds"
import HomeProducts from "./components/HomeProducts/HomeProducts"
import { useAppContext } from "../../Context/AppContext"
import HomeCart from "./components/HomeCart/HomeCart"
function Home() {
  const {
    cartHook: {
      showCart
    }
  } = useAppContext()
  const homeMarkerRef = useRef<HTMLDivElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  const { mainAdd } = HomeAds()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setNavScrolled(true)
      } else {
        setNavScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <React.Fragment>
      {showCart && <HomeCart />}
      <div className="home-navbar-container"><Navbar navbarScrolled={navScrolled} /></div>
      <div className='home-container'   >
        <HomeBanner />
        <div className="home-ads-space" ref={homeMarkerRef}>
        <p className="ads-title">{mainAdd}</p>
        </div>
        <HomeFilters />
        <HomeProducts />
      </div>

    </React.Fragment>
  )
}

export default Home

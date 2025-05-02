import React, { useEffect, useRef, useState } from "react"
import "./Home.css"
import Navbar from './components/Navbar/Navbar'
import HomeBanner from "./components/HomeBanner/HomeBanner"
import HomeFilters from "./components/HomeFilters/HomeFilters"
import HomeAds from "./components/HomeAds/HomeAds"
import HomeProducts from "./components/HomeProducts/HomeProducts"
function Home() {
  const homeMarkerRef = useRef<HTMLDivElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  const { getRandomAd } = HomeAds()

  useEffect(()=>{
    const handleScroll = () => {
      if(window.scrollY > 400){
        setNavScrolled(true)
      }else{
        setNavScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  },[])
  
  return (
    <React.Fragment>
      <div className="home-navbar-container"><Navbar navbarScrolled={navScrolled} /></div>
      <div className='home-container'   >
        <HomeBanner/>
        <div className="home-ads-space"ref={homeMarkerRef}>
            {getRandomAd()}
        </div>
        <HomeFilters/>
        <HomeProducts/>
      </div>
    </React.Fragment>
  )
}

export default Home

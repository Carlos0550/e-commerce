import React from "react"
import "./Home.css"
import Navbar from './components/Navbar/Navbar'
import HomeBanner from "./components/HomeBanner/HomeBanner"
import HomeFilters from "./components/HomeFilters/HomeFilters"
import HomeAds from "./components/HomeAds/HomeAds"
function Home() {
  const { getRandomAd } = HomeAds()
  return (
    <React.Fragment>
      <div className="home-navbar-container"><Navbar /></div>
      <div className='home-container'>
        <HomeBanner/>
        <div className="home-ads-space">
            {getRandomAd()}
        </div>
        <HomeFilters/>
      </div>
    </React.Fragment>
  )
}

export default Home

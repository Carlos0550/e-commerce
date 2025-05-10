import "./HomeBanner.css"
import Banner1 from "./assets/BannerPC.webp"
import Banner2 from "./assets/BannerMobile.webp"
import { useEffect, useState } from "react";
function HomeBanner() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const res = () => setWidth(window.innerWidth)
        window.addEventListener("resize", res)
        return () => window.removeEventListener("resize", res)
    }, [])


    return (
        <picture className="home-banner">
            <img src={width > 768 ? Banner1.src : Banner2.src} alt="" />
        </picture>
    )
}

export default HomeBanner

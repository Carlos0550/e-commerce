import "./HomeBanner.css"
import Banner1 from "../../../../../../assets/BannerImages/image.png"
import Banner2 from "../../../../../../assets/BannerImages/image2.webp"
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
            <img src={width > 502 ? Banner1 : Banner2} alt="" />
        </picture>
    )
}

export default HomeBanner

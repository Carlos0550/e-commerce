import "./HomeBanner.css"
import Banner1 from "./assets/BannerPC.webp"
import Banner2 from "./assets/BannerMobile.webp"
import { useAppContext } from "../../../../../Context/AppContext";
function HomeBanner() {
    const {
        width
    } = useAppContext()


    return (
        <picture className="home-banner">
            <img src={width > 768 ? Banner1 : Banner2} alt="" />
        </picture>
    )
}

export default HomeBanner

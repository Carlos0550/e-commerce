import "./HomeBanner.css"
import { useEffect, useState } from "react";
function HomeBanner() {
    const [width, setWidth] = useState(window.innerWidth);
    const bannerPC = "https://eotrlzhbkhdkyfhysbqu.supabase.co/storage/v1/object/public/assets//ajMz3d6JQCyR3Yb9YZxaCQ.jpg"
    const bannerMobile = "https://eotrlzhbkhdkyfhysbqu.supabase.co/storage/v1/object/public/assets/nYd_f3DqT-6tRBUKwV3Yqg.webp"
    useEffect(() => {
        const res = () => setWidth(window.innerWidth)
        window.addEventListener("resize", res)
        return () => window.removeEventListener("resize", res)
    }, [])


    return (
        <picture className="home-banner">
            <img src={width > 768 ? bannerPC : bannerMobile} alt="" />
        </picture>
    )
}

export default HomeBanner

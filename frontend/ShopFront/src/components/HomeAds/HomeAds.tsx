import { useCallback, useEffect, useState } from "react"
import "./HomeAds.css"
function HomeAds() {
    const [ads, setAds] = useState<string[]>([
        "¡Maquillajes en tendencia!",
        "Descubrí tu nuevo favorito",
        "Brillá con cada mirada ",
        "Cosmética profesional para vos",
        "Sombras irresistibles para todos los estilos",
        "Labiales que marcan presencia",
        "Ofertas especiales por tiempo limitado",
        "Elegancia en cada detalle",
        "Maquillaje que cuida tu piel",
        "Realzá tu belleza natural"
    ])
    const [mainAdd, setMainAdd] = useState<string>("¡Maquillajes en tendencia!");

    const getRandomAd = useCallback(() => {
        if (!ads.length) return <p></p>;

        const randomIndex = Math.floor(Math.random() * ads.length);
        const randomAd = ads[randomIndex];

        return setMainAdd(randomAd);
    },[])

    useEffect(()=>{
        getRandomAd()
    },[getRandomAd])
    return (
        <p className="ads-title">{mainAdd}</p>
    )
}

export default HomeAds

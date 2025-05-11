import "./Navbar.css"
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { useCartStore } from "../../Stores/cartStore";

interface Props {
    navbarScrolled?: boolean
}
function Navbar({ navbarScrolled }: Props) {
   
    const setShowCart = useCartStore((state) => state.setShowCart)
    const showCart = useCartStore((state) => state.showCart)
    const [width, setWidth] = useState(1200)
    const [contractHeader, setContractHeader] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => setWidth(window.innerWidth), 500)
        const res = () => setWidth(window.innerWidth)
        window.addEventListener("resize", res)
        return () => window.removeEventListener("resize", res)
    }, [])

    const [navScrolled, setNavScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setNavScrolled(true)
            } else {
                setNavScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    const handleNavigate = (target: string) => {
        const environment = process.env.NODE_ENV
        window.location.href = environment === "development"
            ? new URL("http://localhost:5173" + target).href
            : new URL("https://control-panel.cinnamon-makeup.com" + target).href
    }
    const handleOpenCart = () => setShowCart(true)
    return (
        <div className="home-navbar-container">
            <header className={contractHeader && width <= 730 ? 'home-header extended' : 'home-header contracted'}>
                {width <= 730 ? (
                    <>
                        <nav className={navbarScrolled || navScrolled ? "home-nav scrolled" : "home-nav"}>
                            <div className="home-menu-icon" onClick={() => setContractHeader(!contractHeader)}>
                                <IoMenu size={20} />
                            </div>

                            <div className="home-menu-icon cart" onClick={() => handleOpenCart()}>
                                <CiShoppingCart size={20} />
                            </div>
                            <button className="home-menu-authentication" onClick={() => handleNavigate("/authentication")}>Iniciar sesión</button>

                            <ul className='home-nav-list'>
                                <li><a href="/">Inicio</a></li>
                                <li><a href="/faq">Preguntas Frecuentes</a></li>
                            </ul>

                        </nav>
                    </>
                ) : (
                    <>
                        <nav className={navbarScrolled || navScrolled ? "home-nav scrolled" : "home-nav"}>
                            <p className="home-logo">Cinnamon</p>
                            <ul className='home-nav-list'>
                                <li><a href="/">Inicio</a></li>
                                <li><a href="/faq">Preguntas Frecuentes</a></li>
                            </ul>
                            <li className="home-nav-custom-icons">
                                <div className="home-nav-icon"
                                    onClick={() => handleNavigate("/authentication")}
                                >
                                    <CiUser size={25} />
                                </div>

                                <div
                                    className="home-nav-icon cart"
                                    onClick={() => handleOpenCart()}
                                >
                                    <CiShoppingCart size={25} />
                                </div>
                            </li>
                        </nav>
                    </>
                )}
            </header>
        </div>
    )
}

export default Navbar

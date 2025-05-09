import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";
import { useAppContext } from "../../../../Context/AppContext";

interface Props {
    navbarScrolled: boolean
}
function Navbar({ navbarScrolled }: Props) {
    const {
        cartHook: {
            setShowCart,
            showCart
        }
    } = useAppContext()
    const [width, setWidth] = useState(window.innerWidth)
    const [contractHeader, setContractHeader] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        const res = () => setWidth(window.innerWidth)
        window.addEventListener("resize", res)
        return () => window.removeEventListener("resize", res)
    }, [])

    const handleOpenCart = () => setShowCart(!showCart)
    return (
        <div className="home-navbar-container">
        <header className={contractHeader && width <= 730 ? 'home-header extended' : 'home-header contracted'}>
            {width <= 730 ? (
                <>
                    <nav className={navbarScrolled ? "home-nav scrolled" : "home-nav"}>
                        <div className="home-menu-icon" onClick={() => setContractHeader(!contractHeader)}>
                            <IoMenu size={20} />
                        </div>

                        <div className="home-menu-icon cart" onClick={() => handleOpenCart()}>
                            <IconShoppingCart size={20} />
                        </div>
                        <Button mb={10} variant="white" color="red" onClick={() => navigate("/authentication")}>Iniciar sesión</Button>

                        <ul className='home-nav-list'>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
                        </ul>
                        
                    </nav>
                </>
            ) : (
                <>
                    <nav className={navbarScrolled ? "home-nav scrolled" : "home-nav"}>
                        <p className="home-logo">Cinnamon</p>
                        <ul className='home-nav-list'>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
                        </ul>
                        <li className="home-nav-custom-icons">
                                <div className="home-nav-icon"
                                    onClick={() => navigate("/authentication")}
                                >
                                    <IconUser size={25} />
                                </div>

                                <div
                                    className="home-nav-icon cart"
                                    onClick={() => handleOpenCart()}
                                >
                                    <IconShoppingCart size={25} />
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

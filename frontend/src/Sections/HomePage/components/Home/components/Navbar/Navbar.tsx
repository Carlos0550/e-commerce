import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IconShoppingCart, IconUser } from "@tabler/icons-react";

interface Props{
    navbarScrolled: boolean
}
function Navbar({navbarScrolled}: Props) {
    const [width, setWidth] = useState(window.innerWidth)
    const [contractHeader, setContractHeader] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        const res = () => setWidth(window.innerWidth)
        window.addEventListener("resize", res)
        return () => window.removeEventListener("resize", res)
    }, [])
    return (
        <header className={contractHeader && width <= 730 ? 'home-header contracted' : 'home-header'}>
            <nav className={navbarScrolled ? "home-nav scrolled" : "home-nav"}>
                {width <= 730 && (
                    <>
                        <div className="home-menu-icon" onClick={() => setContractHeader(!contractHeader)}>
                            <IoMenu size={20} />
                        </div>

                        <div className="home-menu-icon cart" onClick={() => setContractHeader(!contractHeader)}>
                            <IconShoppingCart size={20} />
                        </div>
                    </>
                )}
                {width <= 730 && (
                    <Button mb={10} variant="white" color="red" onClick={()=> navigate("/authentication")}>Iniciar sesión</Button>
                )}
                <ul className='home-nav-list'>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/">Productos</Link></li>
                    <li><Link to="/">Cómo comprar</Link></li>
                    <li><Link to="/">Contacto</Link></li>
                    <li><Link to="/">Preguntas Frecuentes</Link></li>
                    {width > 730 && <li className="home-nav-custom-icons">
                        <div className="home-nav-icon" onClick={()=> navigate("/authentication")}><IconUser size={25} /></div>

                        <div className="home-nav-icon cart" onClick={() => setContractHeader(!contractHeader)}>
                            <IconShoppingCart size={25} />
                        </div>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar

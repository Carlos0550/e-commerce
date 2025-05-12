import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import "./Layout.css"
function Layout({ children }: { children: React.ReactNode }) {
    const {
        AuthenticationHook: {
            loginData,
            closeSession
        }
    } = useAppContext()

    const HandleScrollInNavMobile = () => {
        if (window.innerWidth < 768) {
            const managerContent = document.querySelector(".manager-right-content");
            setTimeout(() => {
                managerContent?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    }

    const handleNavigate = (target: string) => {
        const environment = import.meta.env.MODE
        window.location.href = environment === "development"
            ? new URL("http://localhost:4321" + target).href
            : new URL("https://shop.cinnamon-makeup.com" + target).href
    }

    return (
        <div className="manager-container">
            <div className="manager-welcome">
                <h1>Hola, {loginData && loginData?.user_name.split(" ")[0]} 👋</h1>
                <Button
                    color="red"
                    onClick={() => closeSession()}
                >
                    Cerrar sesión
                </Button>
            </div>

            <nav className="nav">
                <ul className="nav-list">
                    <li onClick={() => handleNavigate("/")}><a>Página principal</a></li>
                    <li><Link to={"/admin-dashboard/administration"} onClick={HandleScrollInNavMobile}>Administración</Link></li>
                    {loginData.is_master && (<li><Link to={"/admin-dashboard/managers"}>Gestores</Link></li>)}
                    {/* <li><Link to={""}>Despachos</Link></li>
                            <li><Link to={""}>Configuraciones</Link></li> */}
                </ul>
            </nav>

            <div className="manager-content">
                {children}
            </div>
        </div>
    )
}

export default Layout

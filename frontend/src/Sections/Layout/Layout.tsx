import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import "./Layout.css"
function Layout({children}: {children: React.ReactNode}) {
    const {
        AuthenticationHook: {
            loginData
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
    
    return (
        <div className="manager-container">
            <div className="manager__wrapper">
                <div className="manager-left">
                    <div className="manager-welcome">
                        <h1>Hola, {loginData && loginData?.user_name.split(" ")[0]} 👋</h1>
                        <Button
                            color="red"

                        >
                            Cerrar sesión
                        </Button>
                    </div>
                    <div className="manager-resume">
                        <h1>Resumen de cuenta</h1>
                        <div className="resume-boxes">
                            <div className="resume-box">
                                <h3>Productos vendidos (este mes)</h3>
                                <p className="resume-box-p">5</p>
                            </div>

                            <div className="resume-box">
                                <h3>Total de clientes</h3>
                                <p className="resume-box-p">60</p>
                            </div>

                            <div className="resume-box">
                                <h3>Total de ventas (este mes)</h3>
                                <p className="resume-box-p">58000</p>
                            </div>

                            <div className="resume-box">
                                <h3>Productos a despachar</h3>
                                <p className="resume-box-p">3</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="manager-right">
                    <nav className="nav">
                        <ul className="nav-list">
                            <li ><Link to={"/"}>Inicio</Link></li>
                            <li><Link to={"/admin-dashboard/administration"} onClick={HandleScrollInNavMobile}>Administración</Link></li>
                            <li><Link to={""}>Clientes</Link></li>
                            <li><Link to={""}>Despachos</Link></li>
                            <li><Link to={""}>Configuraciones</Link></li>
                        </ul>
                    </nav>

                    <div className="manager-right-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout

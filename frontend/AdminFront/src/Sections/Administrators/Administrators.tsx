import { Button } from "@mantine/core"
import { useAppContext } from "../../Context/AppContext"
import "./Administrators.css"
import dayjs from "dayjs"
import { FaPersonCircleMinus, FaPersonCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { showNotification } from "@mantine/notifications";
function Administrators() {
    const {
        administratorHook: {
            administrators
        },
        AuthenticationHook:{
            loginData
        }
    } = useAppContext()
    const navigate = useNavigate()

    const AdminState = (state: boolean) => {
        if (state) {
            return <p className="administrator-state active">Activo</p>
        } else {
            return <p className="administrator-state pending">Pendiente</p>
        }
    }

    const alreadyRender = useRef(false)
    useEffect(()=>{
        if(alreadyRender.current) return
        alreadyRender.current = true
        if(!loginData.is_master){
            showNotification({
                color: 'red',
                title: 'Error',
                message: 'No tienes permisos para acceder a esta sección.',
                autoClose: 3000,
                position: 'top-right',
            })
            navigate('/')
            return;
        }
    },[])

    return (
        <div className="administrators-container">
            <div className="administrators-info">
                <h3>Administradores</h3>
                {/* <p>Gestioná acá quien puede <strong>gestionar stock</strong>, <strong>categorías</strong>, <strong>banners</strong>, etc.</p> */}
                <p>Sección en desarrollo</p>
            </div>

            {/* <div className="administrators-table-container">
                <table className="administrators-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Fecha de registro</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Super usuario</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {administrators && administrators.map((admin) => (
                            <tr key={admin.manager_id}>
                                <td>{admin.manager_name}</td>
                                <td>{admin.manager_email}</td>
                                <td>{dayjs(admin.created_at).format("DD/MM/YYYY")}</td>
                                <td>{dayjs(admin.created_at).format("HH:mm")}</td>
                                <td>{AdminState(admin.estado)}</td>
                                <td>{admin.is_master ? "Si" : "No"}</td>
                                <td>
                                    {!admin.is_master && (
                                        <div className="administrator-actions">
                                            <Button
                                                leftSection={<FaPersonCircleMinus size={20} />}
                                                color="red"
                                                size="xs"
                                            >Denegar solicitud</Button>

                                            <Button
                                                leftSection={<FaPersonCirclePlus size={20} />}
                                                color="blue"
                                                size="xs"
                                            >Aceptar solicitud</Button>

                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    )
}

export default Administrators

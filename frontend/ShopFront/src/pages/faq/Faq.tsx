import React, { useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import "./Fax.css"
import { Accordion, Button, Flex } from "@mantine/core";
import { FaMailBulk, FaWhatsapp } from "react-icons/fa";

function Faq() {
    const handleGoToWhatsApp = () => {
        window.open("https://wa.me/5403764757599", "_blank")
    }
    const [faqData, setFaqData] = useState([
        {
            emoji: '📦',
            value: '¿Cuánto tarda en llegar mi pedido?',
            description:
                'Por el momento solo hacemos envios dentro de Candelaria. Podés consultar si vivis en otra localidad. El tiempo de entrega depende de tu ubicación. En general, los envíos locales llegan dentro del mismo día habil.',
        },
        {
            emoji: '💳',
            value: '¿Qué métodos de pago aceptan?',
            description:
                'Aceptamos transferencia bancaria o si preferis usar tu tarjeta de crédito o debito, hacemos un link de pago.',
        },
        {
            emoji: '🔁',
            value: '¿Puedo cambiar o devolver un producto?',
            description:
                'Sí, podés realizar cambios o devoluciones dentro de los 2 días de recibido el producto. El artículo debe estar en perfectas condiciones y con su empaque original. Contáctanos para iniciar el proceso.',
        },{
            emoji: "📞",
            value: 'Ante cualquier inconveniente, ¿A quien puedo contactarme?',
            description:
                'Podés contactarnos a nuestro Whatsapp o a nuestro email. Estaremos encantados de ayudarte.',
            children: (
                <Flex gap={"md"} wrap={"wrap"} justify={"flex-start"} align={"center"}>
                    <Button onClick={handleGoToWhatsApp} color="green" leftSection={<FaWhatsapp/>}>WhatsApp</Button>
                    <Button disabled color="dark" leftSection={<FaMailBulk/>}>Email</Button>
                </Flex>
            )
        }
    ])

    const items = faqData.map((item, idx) => (
        <Accordion.Item key={idx} value={item.value}>
            <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
            <Accordion.Panel>
                {item.description}
                {item.children}
            </Accordion.Panel>
            
        </Accordion.Item>
    ));

    return (
        <React.Fragment>
            <Navbar navbarScrolled={true} />
            <div className="faq-container">
                <Accordion className="faq-accordion" variant="separated" defaultValue={faqData[0].value}>
                    {items}
                </Accordion>
            </div>
        </React.Fragment>
    )
}

export default Faq

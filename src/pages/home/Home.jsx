import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx"
import './Home.css'
import { Stack } from "@mui/system";
import { Card, ListItemText } from "@mui/material";

import VerPedido from "../../components/VerModal/VerModal.jsx";
// import PedidoBox from "../../components/Pedido/PedidoBox";

export default function Home() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            }

            const data = await fetch('http://localhost:3001/pedidos/getAllPedidos', requestOptions)
            const pedidos = await data.json();

            for (const pedido of pedidos) {
                const requestOption = {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch(`http://localhost:3001/clientes/getOneClient/${pedido.clienteid}`, requestOption)
                const cliente = await response.json();
                const pedidoClient = Object.assign(cliente, pedido);
                if (!pedidoClient.message) setPedidos(pedidos => [...pedidos, pedidoClient])
            }
        }

        fetchData()
            .catch(err => console.log(err.message));
    }, [])

    const mountPedidos = (value, index) => {
        return <Card key={index} className="boxPedido">
            <ListItemText>Cliente: {value.nome}</ListItemText>
            <ListItemText>Total do valor do pedido: R${value.totalpedido}</ListItemText>
            <ListItemText>Total de produtos do pedido: {value.totalprodutos}</ListItemText>
            <ListItemText>Data do pedido: {value.datapedido.slice(0, 10)}</ListItemText>
            <VerPedido pedido={value}></VerPedido>

        </Card>
    }

    return (
        <div className="homeBody">
            <Header></Header>
            <div className="corpo">
                <h1 className="white">Meus pedidos:</h1>
                {pedidos.length > 0 ? <Stack direction='column' spacing={2} alignItems="center" justifyContent="center" className="stackPedidos"> {pedidos.map((value, index) => mountPedidos(value, index))} </Stack> : <h1>Não foi encontrado nenhum pedido.</h1>}
            </div>
            <Footer></Footer>
        </div>
    )
}
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard/index.css";

export const Sidebar = () => {
    return (
        <section className="sidebar">
            <h1>Storify</h1>
            <Link to="/">Inicio</Link>
            <Link to="/clients">Clientes</Link>
            <Link to="/providers">Proveedores</Link>
            <Link to="/inventory">Inventario</Link>
            <Link to="/shipping">Envios</Link>
            <Link to="/orders">Pedidos</Link>
            <Link to="/login">Salir</Link>
        </section>
    )
}

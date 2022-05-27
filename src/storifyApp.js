import { ThemeProvider } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ClientsPage } from './pages/clients'
import { HomePage } from './pages/home'
import { InventoryPage } from './pages/inventory'
import { LoginPage } from './pages/login'
import { OrdersPage } from './pages/orders'
import { ProvidersPage } from './pages/providers'
import { ShippingsPage } from './pages/shippings'
import { theme } from './styles/themes'

export const StorifyApp = () => {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="clients" element={<ClientsPage />} />
                <Route path="providers" element={<ProvidersPage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="shipping" element={<ShippingsPage />} />
                <Route path="orders" element={<OrdersPage />} />
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
  )
}

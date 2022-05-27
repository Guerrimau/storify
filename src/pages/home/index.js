import { Button } from '@mui/material'
import React from 'react'
import { Sidebar } from '../../components/sidebar'

export const HomePage = () => {
  return (
    <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "250px calc(100vw - 250px)" }}>
        <Sidebar />
        <main className="content">
            <div className="home__messages card">
            </div>
            <div className="home__dates card">
            </div>
            <div className="home__patients card">
            </div>
        </main>
    </div>
)
}

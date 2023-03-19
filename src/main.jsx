import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Favorites from './routes/Favorites'
import PokeInfo from './routes/PokeInfo'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/pokeinfo/:pokemon",
    element: <PokeInfo/>
  },
  {
    path: "/favorites",
    element: <Favorites/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

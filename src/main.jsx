import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Admin from './components/admin/Admin.jsx'
import User from './components/user/User.jsx'
import MeetingsTable from './components/tables/MeetingsTable.jsx'
import SerList from './components/tables/SerList.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <User />
    
  },
  {
    path:"/admin",
    element: <Admin />,
    children: [
      {
        path: '',
        element: <div></div>,
      },
      {
        path: 'ser',
        element: <SerList/>,
        errorElement: <div>contant not found</div>
      },
      {
        path: 'meetings',
        element:<MeetingsTable/>,
        errorElement: <div>contant not found</div>
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

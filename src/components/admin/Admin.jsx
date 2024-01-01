import { observer } from "mobx-react"
import AStore from "../../store/AStore"
import Login from '../logIn/LogIn'
import AdminHomePage from "../adminHomePage/AdminHomePage"
import AdminH from '../headers/AdminH'
import React, { useEffect } from 'react';
const Admin = (observer(() => {
    return (
        <>
        <AdminH/>

            {AStore.isLogin===null ?
                <Login /> :
                <AdminHomePage />
            }
        </>
    )
}))

export default Admin
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home"
import Account from "../pages/account/Account"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path={'/'} />
                <Route element={<Account />} path={'/account'} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
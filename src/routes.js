import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx"
import Account from "./pages/account/Account.jsx"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path={'/'} exact />
                <Route element={<Account />} path={'/account'} exact />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;
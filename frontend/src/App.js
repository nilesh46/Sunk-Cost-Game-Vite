import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Pots from "./pages/pots";
import EachPot from "./pages/eachPot";
import Header from "./components/Header";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { light, dark } from "./config/themization";
import QRCode from "qrcode.react";
import { Initialize, CreatePot } from "./redux/actions/action.ts";
import { useSelector, useDispatch } from "react-redux";

const useDarkMode = () => {
    const [theme, setTheme] = useState(dark);

    const toggleTheme = () => {
        const updatedTheme = theme === dark ? light : dark;
        setTheme(updatedTheme);
    };
    return [theme, toggleTheme];
};

const App = () => {
    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(Initialize());
    }, []);

    const user = useSelector((state) => state.user);
    const [theme, toggleTheme] = useDarkMode();
    const themeConfig = createTheme(theme);

    return (
        <ThemeProvider theme={themeConfig}>
            <Header toggleTheme={toggleTheme} />
            <CssBaseline />
            {/* <h1 style={{ padding: "10px" }}>
                {" "}
                {user.uri && <QRCode value={user.uri} />}
            </h1>
            <button onClick={async () => await CreatePot(user, 5)}></button> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/pots" element={<Pots />} />
                <Route path="/pots/:num" element={<EachPot />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;

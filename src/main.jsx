// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Main from "./pages/Main/Main.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthPage from "./pages/Auth/Auth.jsx";
import SearchPage from "./pages/Search/Search.jsx";
import routerConfig from "./routerConfig";
import { Provider } from 'react-redux';
import { setupStore } from './store/store.js';

const store = setupStore();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <Provider store={store}>
                <Router future={{ v7_startTransition: true }}>
                    <Routes>
                        <Route path={routerConfig[0].path} element={<Main />} />
                        <Route path={routerConfig[1].path} element={<SearchPage />} />
                        <Route path={routerConfig[2].path} element={<AuthPage />} />
                    </Routes>
                </Router>
            </Provider>
        </AuthProvider>
    </StrictMode>
);

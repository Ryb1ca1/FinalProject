// src/config/routerConfig.js
import AuthPage from '../src/pages/Auth/Auth';
import Main from '../src/pages/Main/Main';
import SearchPage from '../src/pages/Search/Search';

const routerConfig = [
    {
        path: '/',
        Component: Main,
    },
    {
        path: '/search',
        Component: SearchPage,
    },
    {
        path: '/login',
        Component: AuthPage,
    },
];

export default routerConfig;

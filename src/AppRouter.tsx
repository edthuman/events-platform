import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./Page";

const router = createBrowserRouter([
    {
        path: "/Login",
        element: <Page page="Login"/>
    },
    {
        path: "/",
        element: <Page page="Showings"/>
    },
    {
        path: "/showings",
        element: <Page page="Showings"/>
    },
    {
        path: "/showing",
        element: <Page page="SingleShowing"/>
    },
    {
        path: "/showing/:showing_id",
        element: <Page page="SingleShowing"/>
    },
    {
        path: "/create-showing",
        element: <Page page="CreateShowing"/>
    },
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;

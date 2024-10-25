import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./Page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Page page="Showings" />,
    },
    {
        path: "/login",
        element: <Page page="Login" />,
    },
    {
        path: "/showing",
        element: <Page page="SingleShowing" />,
    },
    {
        path: "/showing/:showing_id",
        element: <Page page="SingleShowing" />,
    },
    {
        path: "/create-showing",
        element: <Page page="CreateShowing" />,
    },
    {
        path: "/complete",
        element: <Page page="PaymentComplete" />,
    }
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;

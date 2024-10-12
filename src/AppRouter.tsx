import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Showings from "./Showings/Showings";
import Login from "./Login/Login";
import SingleShowing from "./SingleShowing/SingleShowing";
import CreateShowing from "./CreateShowing/CreateShowing";

const router = createBrowserRouter([
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/",
        element: <Showings />,
    },
    {
        path: "/showings",
        element: <Showings />,
    },
    {
        path: "/showing",
        element: <SingleShowing />,
    },
    {
        path: "/showing/:showing_id",
        element: <SingleShowing />,
    },
    {
        path: "/create-showing",
        element: <CreateShowing />,
    },
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;

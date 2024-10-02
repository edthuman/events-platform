import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Showings from "./Showings/Showings";
import Login from "./Login";
import SingleShowing from "./SingleShowing/SingleShowing";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
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
]);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;

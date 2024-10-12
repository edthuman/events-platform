import CreateShowing from "./CreateShowing/CreateShowing";
import Header from "./Header";
import Login from "./Login/Login";
import Showings from "./Showings/Showings";
import SingleShowing from "./SingleShowing/SingleShowing";

type Page = "Login" | "Showings" | "SingleShowing" | "CreateShowing" 

function Page({ page }: { page: Page }) {
    const pages = {
        Login,
        Showings,
        SingleShowing,
        CreateShowing
    }

    const CurrentPage = pages[page]

    return <>
        <Header />
        <CurrentPage />
    </>
}

export default Page
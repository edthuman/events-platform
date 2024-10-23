import CreateShowing from "./CreateShowing/CreateShowing";
import Header from "./Header/Header";
import Login from "./Login/Login";
import PaymentComplete from "./PaymentComplete/PaymentComplete";
import Showings from "./Showings/Showings";
import SingleShowing from "./SingleShowing/SingleShowing";

type Page =
    | "Login"
    | "Showings"
    | "SingleShowing"
    | "CreateShowing"
    | "PaymentComplete";

function Page({ page }: { page: Page }) {
    const pages = {
        Login,
        Showings,
        SingleShowing,
        CreateShowing,
        PaymentComplete,
    };

    const CurrentPage = pages[page];

    return (
        <>
            <Header />
            <CurrentPage />
        </>
    );
}

export default Page;

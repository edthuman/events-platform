function ToTopButton() {
    return <button className="text-grey" onClick={() => window.scrollTo(0, 0)}>
        <p className="text-xl text-off_white w-max mx-auto underline hover:no-underline hover:text-grey">Back to top of page</p>
    </button>
}

export default ToTopButton
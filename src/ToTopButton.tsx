function ToTopButton() {
    return <button className="text-grey" onClick={() => window.scrollTo(0, 0)}>
        <p className="text-xl text-off_white w-max mx-auto py-1 px-2 border hover:text-grey">Back to top of page</p>
    </button>
}

export default ToTopButton
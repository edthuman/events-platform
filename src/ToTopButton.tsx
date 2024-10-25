function ToTopButton() {
    return <button className="text-grey" onClick={() => window.scrollTo(0, 0)}>
        <p className="text-xl text-off_white hover:text-grey w-max mx-auto">Back to top of page</p>
    </button>
}

export default ToTopButton
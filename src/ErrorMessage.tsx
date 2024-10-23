function ErrorMessage({ error }: { error: string }) {
    return <>
        <h1>Error occurred</h1>
        <p>{error}</p>
    </>
}

export default ErrorMessage
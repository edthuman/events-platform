function ErrorMessage({ error }: { error: string }) {
    return <>
        <h2>Error occurred</h2>
        <p>{error}</p>
    </>
}

export default ErrorMessage
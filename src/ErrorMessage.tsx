function ErrorMessage({ error }: { error: string }) {
    return <>
        <h1 className="text-4xl mt-8 mb-6">Error occurred</h1>
        <p className="text-2xl">{error}</p>
    </>
}

export default ErrorMessage
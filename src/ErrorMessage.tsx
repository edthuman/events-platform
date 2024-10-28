function ErrorMessage({ error }: { error: string }) {
    return <>
        <h1 className="text-4xl lg:text-5xl mt-9 mb-6 lg:mb-8">Error occurred</h1>
        <p className="text-2xl lg:text-3xl">{error}</p>
    </>
}

export default ErrorMessage
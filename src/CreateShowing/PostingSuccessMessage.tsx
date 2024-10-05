function PostingSuccessMessage({showingId}: {showingId: string}) {
    return <>
        <h1>Event Posted!</h1>
        <a href={`showing/${showingId}`}>See event page</a>
    </>
}

export default PostingSuccessMessage
function PostingSuccessMessage({showingId}: {showingId: string}) {
    return <>
        <h1>Event Posted!</h1>
        <a href={`showing/${showingId}`} target="_self">See event page</a>
    </>
}

export default PostingSuccessMessage
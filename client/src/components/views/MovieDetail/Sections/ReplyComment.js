import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentLists])

    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    const renderReplyComment = (parentCommentId) =>
    props.commentLists.map((comment, index) => (
        <React.Fragment>
            {
                comment.responseTo === parentCommentId && 
                <div style={{ width: '80%', marginLeft:'40px' }}>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} movieId={props.movieId} />
                    <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} movieId={props.movieId} />
                </div>
            }
        </React.Fragment>
    ))

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'grey' }} onClick={onHandleChange} >
                    View {ChildCommentNumber} more comment(s)
                </p>
            }
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment

import { orderBy } from "lodash";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import AddCommentForm from "../comments/addCommentForm";
import CommentsList from "../comments/commentsList";

const Comments = () => {
    const param = useParams();
    const { userId } = param;
    const [comments, setComment] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComment(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComment([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComment(comments.filter((x) => x.id !== id));
        });
    };
    const sortedComments = orderBy(comments, ["created_at", "desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card md-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;

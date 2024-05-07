import { Comments } from "@/models/Comments";

import './CommentItem.scss'

interface Props extends Comments {
  height: number;
}

const CommentItem = (props: Props) => {
  return (
    <div className="comment-container" style={{height: props.height}}>
      <div className="comment-name">{props.id}</div>
      <div className="comment-body">{props.body}</div>
    </div>
  );
};

export { CommentItem };

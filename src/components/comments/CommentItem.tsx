import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUpIcon } from "lucide-react";
import type { Comment } from "@/types/types";
import { useState } from "react";
import CreateCommentForm from "./CreateCommentForm";
import ReplyItem from "./reply-item";
import { addLikeToComment, deleteLikeFromComment } from "@app/actions";

function CommentItem({
  postId,
  comment,
}: {
  postId: string;
  comment: Comment;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const hasLiked = comment.likes?.some(
    (l) => l.user.id === "cmhf4ca1k0000udrskkmc2yy5"
  );
  const handleLike = async () => {
    try {
      if (hasLiked) {
        return await deleteLikeFromComment(comment);
      }
      await addLikeToComment(comment);
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return (
    <div className="flex flex-col justify-between items-start gap-3 border-l pl-4 mt-3">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{comment.user.username}</span>
      </div>

      <div className="text-gray-700">{comment.content}</div>

      <div className="flex items-center gap-2 mt-1">
        <div className="flex gap-3 text-sm text-gray-500">
          <div>
            {comment.replies && comment.replies?.length
              ? `${comment.replies.length} ${
                  comment.replies.length === 1 ? "reply" : "replies"
                }`
              : `No reply`}
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => handleLike()}
        >
          <ThumbsUpIcon
            className={`w-4 h-4 ${hasLiked ? "text-blue-600" : ""}`}
          />
          {comment.likes?.length ? (
            <span className="ml-1 text-sm">{comment.likes.length}</span>
          ) : null}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowReplyForm((prev) => !prev)}
        >
          Reply
        </Button>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-2">
          {comment.replies.map((reply) => (
            <ReplyItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}

      {showReplyForm && (
        <div className="w-full mt-3 ml-6">
          <CreateCommentForm
            postId={postId}
            parentId={comment.id ?? null}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default CommentItem;

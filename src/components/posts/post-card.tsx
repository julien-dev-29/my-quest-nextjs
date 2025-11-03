"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MessageCircle, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import Comments from "../comments/comments";
import CreateCommentForm from "../comments/CreateCommentForm";
import { Post } from "@/types/types";
import { addLikeToPost, deleteLikeFromPost } from "@app/actions";
import { cn } from "@/lib/utils";

function PostCard({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false);
  const hasLiked = post.likes?.some(
    (l) => l.user.id === "cmhf4ca1k0000udrskkmc2yy5"
  );
  const handleLike = async () => {
    try {
      if (hasLiked) {
        return await deleteLikeFromPost(post);
      }
      await addLikeToPost(post);
    } catch (error) {
      throw new Error(error as string);
    }
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-start space-x-2 items-center">
          <Avatar className="rounded-lg">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
          <div>Jurol</div>
        </div>
      </CardHeader>

      <CardContent>{post.content}</CardContent>

      <CardFooter>
        <div className="flex justify-between w-full items-center">
          <div className="flex gap-3 text-sm text-gray-500">
            <div>
              {post.comments && post.comments.length > 0
                ? `${post.comments.length} comment${
                    post.comments.length === 1 ? "" : "s"
                  }`
                : "No comments"}
            </div>
          </div>

          <div className="space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleLike()}
            >
              <ThumbsUpIcon
                className={cn(`w-4 h-4`, `${hasLiked ? "text-blue-600" : ""}`)}
              />
              {post.likes?.length ? (
                <span className="ml-1 text-sm">{post.likes.length}</span>
              ) : null}
            </Button>
          </div>
        </div>
      </CardFooter>
      {showComments && post.id && (
        <div>
          <Comments post={post} />
          <CreateCommentForm
            postId={post.id}
            parentId={null}
            onCancel={() => setShowComments(false)}
          />
        </div>
      )}
    </Card>
  );
}

export default PostCard;

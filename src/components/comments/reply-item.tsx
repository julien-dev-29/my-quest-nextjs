import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { ThumbsUpIcon } from "lucide-react";
import { Comment } from "@/types/types";

function ReplyItem({ comment }: { comment: Comment }) {
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
        <Button size="sm" variant="ghost" type="button">
          <ThumbsUpIcon className="w-4 h-4" />
          {comment.likes?.length ? (
            <span className="ml-1 text-sm">{comment.likes.length}</span>
          ) : null}
        </Button>
      </div>
    </div>
  );
}

export default ReplyItem;

"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { SendIcon } from "lucide-react";
import PostForm from "./PostForm";

function CreatePostButton() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsVisible((prev) => !prev)}>
        Something to say
        <SendIcon className="w-4 h-4 mr-2" />
      </Button>
      {isVisible && <PostForm setIsVisible={setIsVisible} />}
    </div>
  );
}

export default CreatePostButton;

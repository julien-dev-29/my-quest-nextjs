"use client";

import { Item, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteStory } from "../../actions";
import { Story } from "../../../../generated/prisma/client";
import Link from "next/link";

function StoriesList({ stories }: { stories: Story[] }) {
  const handleDelete = async (storyId: string) => {
    try {
      await deleteStory(storyId); // ✅ Appel d’une server action importée
      toast.success("Story deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete story");
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      {stories.map((story) => (
        <Item key={story.id}>
          <ItemTitle>{story.title}</ItemTitle>
          <Button asChild>
            <Link href={`stories/${story.id}`}>Edit</Link>
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(story.id)}>
            Delete
          </Button>
        </Item>
      ))}
    </div>
  );
}

export default StoriesList;

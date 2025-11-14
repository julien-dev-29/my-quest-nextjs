
import { getStories } from "../stories-actions";
import StoriesList from "./_components/stories-list";
import Toolbar from "./_components/toolbar";

async function StoriesPage() {
  const stories = await getStories();

  return (
    <div className="p-5">
      <Toolbar/>      
      <StoriesList stories={stories}></StoriesList>
    </div>
  );
}

export default StoriesPage;

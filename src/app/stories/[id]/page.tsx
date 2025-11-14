import MyReactFLow from "../_components/my-react-flow";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full h-full">
      <MyReactFLow storyId={id} />
    </div>
  );
}

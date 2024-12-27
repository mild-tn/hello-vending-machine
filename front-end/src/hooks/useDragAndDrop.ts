export const useDragAndDrop = () => {
  const handleDragStart = (
    e: React.DragEvent<HTMLButtonElement>,
    value: string,
    type: string
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ value, type }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLInputElement>,
    callback: (data: { value: unknown; type: unknown }) => void
  ) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    callback(JSON.parse(data));
  };

  return { handleDragStart, handleDragOver, handleDrop };
};

import { CircleFadingPlus } from "lucide-react";

const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      title="newUser"
      type="button"
      onClick={onClick}
      className="flex flex-row justify-center items-center gap-2 p-2 px-4 text-sm bg-sky-500 text-white rounded-sm">
      <CircleFadingPlus />
      <p>زیادکردن</p>
    </button>
  );
};

export default AddButton;

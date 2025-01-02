import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";
const UpdateNoteButton = ({ id }: { id: string }) => {
  return (
    <Button className="invisible group-hover:visible text-3xl rounded-full border border-gray-400 absolute right-0 py-2 px-2 top-0 cursor-pointer my-2 mx-2">
        {id}
      <MdEdit />
    </Button>
  );
};

export default UpdateNoteButton;

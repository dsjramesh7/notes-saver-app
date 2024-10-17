import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/features/pasteSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [value, setValue] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update the paste
      dispatch(updateToPastes(paste));
    } else {
      //delete the paste
      dispatch(addToPastes(paste));
    }

    //clearing after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 justify-between">
        <input
          className="w-[66%] p-2"
          type="text"
          placeholder="Enter your title here.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="">
        <textarea
          className="p-6 min-w-[500px]"
          value={value}
          placeholder="Enter your content here.."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;

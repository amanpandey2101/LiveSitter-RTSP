import { useState } from "react";
import { createOverlay } from "../api";
import PropTypes from "prop-types";
const OverlayManager = ({ fetchOverlays }) => {
  const [overlay, setOverlay] = useState({
    overlay_type: "text",
    content: "",
    position: { x: 0, y: 0 },
    size: { width: 100, height: 100 },
  });

  const handleCreateOverlay = async () => {
    await createOverlay(overlay);
    fetchOverlays();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOverlay((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg max-w-md w-full mx-auto mt-10 text-black">
      <h3 className="text-xl font-semibold mb-4 text-center">Create Overlay</h3>
      <div className="mb-3 ">
        <label className="block text-sm font-medium mb-1">Overlay Type</label>
        <select
          name="overlay_type"
          value={overlay.overlay_type}
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500 "
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div className="mb-3 ">
        <label className="block text-sm font-medium mb-1">Content</label>
        <input
          type="text"
          name="content"
          value={overlay.content}
          onChange={handleInputChange}
          placeholder="Enter text or image URL"
          className="block w-full p-2 border border-gray-300 rounded-md text-white  "
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Position X</label>
        <input
          type="number"
          name="position.x"
          value={overlay.position.x}
          onChange={(e) =>
            setOverlay((prev) => ({
              ...prev,
              position: { ...prev.position, x: e.target.value },
            }))
          }
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Position Y</label>
        <input
          type="number"
          name="position.y"
          value={overlay.position.y}
          onChange={(e) =>
            setOverlay((prev) => ({
              ...prev,
              position: { ...prev.position, y: e.target.value },
            }))
          }
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Width</label>
        <input
          type="number"
          name="size.width"
          value={overlay.size.width}
          onChange={(e) =>
            setOverlay((prev) => ({
              ...prev,
              size: { ...prev.size, width: e.target.value },
            }))
          }
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Height</label>
        <input
          type="number"
          name="size.height"
          value={overlay.size.height}
          onChange={(e) =>
            setOverlay((prev) => ({
              ...prev,
              size: { ...prev.size, height: e.target.value },
            }))
          }
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
        />
      </div>

      <button
        onClick={handleCreateOverlay}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Overlay
      </button>
    </div>
  );
};

OverlayManager.propTypes = {
  fetchOverlays: PropTypes.func.isRequired,
}

export default OverlayManager;

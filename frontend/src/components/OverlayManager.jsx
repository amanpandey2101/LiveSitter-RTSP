import { useState } from "react";
import { createOverlay } from "../api";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify"; 

const OverlayManager = ({ fetchOverlays }) => {
  const [overlay, setOverlay] = useState({
    overlay_type: "text",
    content: "",
    position: { x: 0, y: 0 },
    size: { width: 100, height: 100 },
  });
  const [error, setError] = useState("");

  const handleCreateOverlay = async () => {
    if (!overlay.content || overlay.size.width <= 0 || overlay.size.height <= 0) {
      setError("Please fill out all fields correctly.");
      return;
    }
    
    try {
      const response = await createOverlay(overlay);
      
      toast.success("Overlay created successfully!");
     
      setOverlay({
        overlay_type: "text",
        content: "",
        position: { x: 0, y: 0 },
        size: { width: 100, height: 100 },
      });
      if(response){

        fetchOverlays();
      }
      setError(""); 
    } catch (err) {
      setError("Failed to create overlay. Please try again.");
      console.error(err);
      toast.error("Failed to create overlay. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOverlay((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePositionChange = (name, value) => {
    setOverlay((prev) => ({
      ...prev,
      position: { ...prev.position, [name]: value },
    }));
  };

  const handleSizeChange = (name, value) => {
    setOverlay((prev) => ({
      ...prev,
      size: { ...prev.size, [name]: value },
    }));
  };

  return (
    <>
    <ToastContainer/>
    <div className="p-5 bg-white shadow-lg rounded-lg max-w-md w-full mx-auto mt-10 text-black">
    
      <h3 className="text-xl font-semibold mb-4 text-center">Create Overlay</h3>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Overlay Type</label>
        <select
          name="overlay_type"
          value={overlay.overlay_type}
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
        >
          <option value="text">Text</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Content</label>
        <input
          type={overlay.overlay_type === "image" ? "url" : "text"}
          name="content"
          value={overlay.content}
          onChange={handleInputChange}
          placeholder={overlay.overlay_type === "image" ? "Enter image URL" : "Enter text"}
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-black"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Position X</label>
        <input
          type="number"
          value={overlay.position.x}
          onChange={(e) => handlePositionChange("x", Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Position Y</label>
        <input
          type="number"
          value={overlay.position.y}
          onChange={(e) => handlePositionChange("y", Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Width</label>
        <input
          type="number"
          value={overlay.size.width}
          onChange={(e) => handleSizeChange("width", Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Height</label>
        <input
          type="number"
          value={overlay.size.height}
          onChange={(e) => handleSizeChange("height", Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md text-white bg-amber-500"
          required
        />
      </div>

      <button
        onClick={handleCreateOverlay}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Overlay
      </button>
    </div>
    </>
  );
};

OverlayManager.propTypes = {
  fetchOverlays: PropTypes.func.isRequired,
};

export default OverlayManager;

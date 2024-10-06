import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getOverlays, deleteOverlay, updateOverlay } from '../api';
import { FiTrash } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OverlayTable = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const response = await getOverlays();
      setRowData(response);
    } catch (error) {
      console.error("Error fetching overlays", error);
    }
  };

  const handleUpdateOverlay = async (overlayId, updatedData) => {
    try {
      await updateOverlay(overlayId, updatedData);
      console.log('Overlay updated successfully');
    } catch (error) {
      console.error("Error updating overlay", error);
    }
  };

  const onCellValueChanged = async (event) => {
    const { _id, timestamp, ...updatedData } = event.data; 
    await handleUpdateOverlay(_id, updatedData); 
  };
  

  const handleDeleteOverlay = async (overlayId) => {
    try {
      await deleteOverlay(overlayId);
      fetchOverlays();
      toast.success("Overlay deleted successfully");
    } catch (error) {
      toast.error("Error deleting overlay");
      console.error("Error deleting overlay", error);
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    if (params.columnApi) {
      autoSizeAllColumns(params.columnApi);
    }
  };

  const autoSizeAllColumns = (columnApi) => {
    if (!columnApi) return; 

    const allColumns = columnApi.getAllColumns();
    if (allColumns) {
      const allColumnIds = allColumns.map((column) => column.getId());
      columnApi.autoSizeColumns(allColumnIds);
    }
  };

  const columnDefs = [
    {
        headerName: 'S. No.', 
        valueGetter: (params) => params.node.rowIndex + 1, 
        minWidth: 80, 
        maxWidth: 100, 
      
      },
    { headerName: 'Overlay Type', field: 'overlay_type', editable: true , },
    { headerName: 'Content', field: 'content', editable: true },
    { headerName: 'Position X', field: 'position.x', editable: true },
    { headerName: 'Position Y', field: 'position.y', editable: true },
    { headerName: 'Width', field: 'size.width', editable: true },
    { headerName: 'Height', field: 'size.height', editable: true },
    {
      headerName: 'Actions',
      field: 'actions',
      minWidth: 200,
      cellRenderer: (params) => (
        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={() => handleDeleteOverlay(params.data._id)}
        >
          <FiTrash size={14} />
        </button>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine w-[80%]">
      <ToastContainer />
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onCellValueChanged={onCellValueChanged}
        domLayout="autoHeight"
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default OverlayTable;

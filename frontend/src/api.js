import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getOverlays = async () => {
  const response = await axios.get(`${API_URL}/overlays`);
  return response.data;
};


export const createOverlay = async (overlay) => {
  const response = await axios.post(`${API_URL}/overlays`, overlay);
  return response.data;
};

export const updateOverlay = async (overlayId, overlay) => {
  const response = await axios.put(`${API_URL}/overlays/${overlayId}`, overlay);
  return response.data;
};

export const deleteOverlay = async (overlayId) => {
  const response = await axios.delete(`${API_URL}/overlays/${overlayId}`);
  return response.data;
};

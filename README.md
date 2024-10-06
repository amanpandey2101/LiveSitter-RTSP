# User Documentation for Livestream Overlays Application

## Table of Contents

1. [Introduction](#introduction)
2. [System Requirements](#system-requirements)
3. [Setup Instructions](#setup-instructions)
   - [Clone the Repository](#clone-the-repository)
   - [Install Backend Dependencies](#install-backend-dependencies)
   - [Install Frontend Dependencies](#install-frontend-dependencies)
   - [Configure Environment Variables](#configure-environment-variables)
   - [Run the Application](#run-the-application)
4. [Using the Application](#using-the-application)
   - [Inputting the RTSP URL](#inputting-the-rtsp-url)
   - [Managing Overlays](#managing-overlays)
5. [Troubleshooting](#troubleshooting)
6. [Contact Support](#contact-support)

## Introduction

The Livestream Overlays application allows users to display overlays on a video stream sourced from an RTSP URL. Users can create, view, update, and delete overlays to enhance their video presentation. The application consists of a Flask backend and a Vite React frontend.

## System Requirements

- **Backend**: 
  - Python (version 3.7 or above)
  - Flask
- **Frontend**: 
  - Node.js (version 14 or above)
  - Vite
- A modern web browser (Chrome, Firefox, Safari, etc.)
- Access to an RTSP stream

## Setup Instructions

### Clone the Repository

1. Open your terminal or command prompt.
2. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/amanpandey2101/LiveSitter-RTSP.git
   ```

### Install Backend Dependencies

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install the necessary dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a .env file in the backend directory and inclde the MongoDB connection string in MONGO_URI env variable :
   ```bash
    MONGO_URI = mongodb://localhost:27017/livestream_overlay
    ```
### Install Frontend Dependencies

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### Configure Environment Variables

1. Create a `.env` file in the backend directory.
2. Add the necessary environment variables for the Flask application (e.g., database connection strings, secret keys). Refer to the sample `.env.example` for guidance.

### Run the Application

1. Start the Flask backend:
   ```bash
   cd Backend
   python app.py  # Using this will also run ffmpeg command  fro RTSP streaming
   ```
   - The backend will run on `http://localhost:5000`.

2. Start the Vite React frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```
   - The frontend will  run on `http://localhost:5173` and automatically play a rtsp video using my RTSP stream link.

## Using the Application

### Inputting the RTSP URL

1. On the main page of the application, you will find a field to input the RTSP URL.
2. Enter the RTSP URL in the following format inside the app.py RTSP_URL variable:
   ```
   rtsp://username:password@your-rtsp-stream-url
   ```
   **Example**: 
   ```
   rtsp://rtspstream:784bd2de3ce0a097fabce629900d686a@zephyr.rtsp.stream/movie
   ```


### Managing Overlays

#### Adding an Overlay

1. Click on the "Add Overlay" button.
2. Fill in the overlay details:
   - **Overlay Type**: Choose between "Text" or "Image."
   - **Content**: Enter the text or the URL of the image.
   - **Position**: Specify the x and y coordinates for the overlay.
   - **Size**: Set the width and height for the overlay.
3. Click "Save" to create the overlay. It will appear on the video stream.

#### Viewing Overlays

- Overlays will be displayed on the video stream according to the position and size specified during creation.

#### Updating an Overlay

1. Click on the overlay you want to update.
2. Modify the necessary fields.
3. Click "Save" to apply the changes.

#### Deleting an Overlay

1. Select the row from the table that you want to delete
2. Click on the delete Trash icon in the Action column.
3. The overlay will be removed from the video stream.

## Troubleshooting

- **Video Not Playing**: Ensure that the RTSP URL is correct and that your network allows streaming from that source.
- **Overlays Not Displaying**: Check the position and size settings for the overlays. Adjust them as necessary.
- **Backend Issues**: Check the Flask server logs for any error messages.



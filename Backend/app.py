from flask import Flask, send_from_directory
from flask_cors import CORS
from overlay_controller import overlay_bp
import subprocess
import os
import logging

logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)

#Replace with RTSP URL
RTSP_URL = 'rtsp://rtspstream:784bd2de3ce0a097fabce629900d686a@zephyr.rtsp.stream/movie'

app.register_blueprint(overlay_bp)
@app.route('/')
def home():
    return {"message": "LiveStream overlay API"}


@app.route('/hls/<path:filename>')
def serve_hls(filename):
    hls_dir = os.path.join(os.getcwd(), 'hls')
    return send_from_directory(hls_dir, filename)

def start_stream():
    current_dir = os.getcwd()
    hls_dir = os.path.join(current_dir, 'hls')  
    logging.debug(f"Current working directory: {current_dir}")
    logging.debug(f"HLS directory: {hls_dir}")


    try:
        if not os.path.exists(hls_dir):
            os.makedirs(hls_dir)
            logging.info("HLS directory created.")
        else:
            logging.info("HLS directory already exists.")
    except Exception as e:
        logging.error(f"Error creating HLS directory: {e}")
        return  
    if not os.path.exists(hls_dir):
        os.makedirs(hls_dir)

  
    output_file = os.path.join(hls_dir, 'stream.m3u8')

  
    command = [
        'ffmpeg', '-y',
        '-i', RTSP_URL,
        '-c:v', 'libx264',
        '-f', 'hls',
        '-hls_time', '4',  
        '-hls_list_size', '5',  
        '-hls_flags', 'delete_segments', 
        '-hls_segment_filename', os.path.join(hls_dir, 'segment_%03d.ts'),
        output_file
    ]


    subprocess.Popen(command)
    try:
        print("Starting FFmpeg process...")
        subprocess.Popen(command)
        print("FFmpeg process started.")
    except Exception as e:
        print(f"Error starting FFmpeg: {e}")

if __name__ == '__main__':
    start_stream()  
    app.run(debug=True, host='localhost', port=5000, use_reloader=False)

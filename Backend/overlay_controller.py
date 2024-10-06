from flask import Blueprint , request, jsonify
from bson.objectid import ObjectId
from config import overlays_collection

overlay_bp = Blueprint('overlay_bp', __name__)

@overlay_bp.route('/overlays', methods=['POST'])
def create_overlay():
    data = request.json 
    overlay = {
        "overlay_type": data.get("overlay_type"),
        "content": data.get("content"),
        "position": data.get("position", {"x": 0, "y": 0}),
        "size": data.get("size", {"width": 100, "height": 100}),
    }
    result = overlays_collection.insert_one(overlay)
    return jsonify({"success": True, "overlay_id":str(result.inserted_id)}), 201

@overlay_bp.route('/overlays', methods=['GET'])
def get_overlay():
    overlays = list(overlays_collection.find())
    for overlay in overlays:
        overlay["_id"] = str(overlay["_id"])
    return jsonify(overlays), 200

@overlay_bp.route('/overlays/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    data = request.json
    updated_overlay = {
        "$set": {
            "overlay_type": data.get("overlay_type"),
            "content": data.get("content"),
            "position": data.get("position", {"x": 0, "y": 0}),
            "size": data.get("size", {"width": 100, "height": 100}),
        }
    }
    result = overlays_collection.update_one({"_id": ObjectId(overlay_id)}, {"$set":updated_overlay})
    if result.modified_count == 1:
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False, "message": "Overlay not found"}), 404

@overlay_bp.route('/overlays/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    overlays_collection.delete_one({"_id": ObjectId(overlay_id)})
    return jsonify({"success": True}), 200
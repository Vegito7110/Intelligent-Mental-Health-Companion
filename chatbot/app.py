from flask import Flask, request, jsonify
import joblib

# Load the trained model and responses from the files
try:
    model = joblib.load('chatbot_model.pkl')
    responses = joblib.load('responses.pkl')
except FileNotFoundError:
    print("Error: Model files not found. Please run 'python train.py' first.")
    exit()

app = Flask(__name__)

# This is the main API endpoint
@app.route('/predict', methods=['POST'])
def predict_intent():
    # Check if the request has a JSON body with a 'message' field
    if not request.json or 'message' not in request.json:
        return jsonify({"error": "No 'message' field in request body"}), 400

    user_message = request.json['message']

    try:
        # Predict the intent of the message using the loaded model
        predicted_intent = model.predict([user_message])[0]
        
        # Get the appropriate response from the loaded responses dictionary
        bot_response = responses.get(predicted_intent, "I'm not sure how to respond to that.")
    
        # Return the response as a JSON object
        return jsonify({"bot_response": bot_response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Simple route to check if the server is running
@app.route('/', methods=['GET'])
def home():
    return "Mental Health Chatbot API is running!"

if __name__ == '__main__':
    # Run the web server
    # For local testing, you can use port 5000
    # For your teammates to access it, you will need to expose it publicly with a tool like ngrok
    app.run(debug=True, port=5000)
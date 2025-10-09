import requests
import json

api_url = "http://127.0.0.1:5000/predict"
message_data = {"message": "I am feeling really sad."}

response = requests.post(api_url, json=message_data)

print(response.json())
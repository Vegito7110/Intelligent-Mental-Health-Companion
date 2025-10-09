print("Starting the training script...")
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
import string

# Download NLTK data (do this once)
try:
    nltk.data.find('corpora/wordnet')
    nltk.data.find('corpora/stopwords')
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('tokenizers/punkt_tab/english/') # Check for the punkt_tab resource
except:
    print("Downloading necessary NLTK data...")
    nltk.download('wordnet')
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('punkt_tab') # Download the punkt_tab tokenizer




# Define your data with intents and example sentences
data = {
    "feeling_sad": [
        "I'm feeling really down today.",
        "I feel so low and hopeless.",
        "I can't get out of bed.",
        "I'm depressed.",
        "I feel sad."
    ],
    "feeling_anxious": [
        "I'm so stressed out.",
        "I'm having a panic attack.",
        "My anxiety is really bad.",
        "I'm worried about the future.",
        "I feel anxious."
    ],
    "crisis": [
        "I want to hurt myself.",
        "I can't go on.",
        "I feel like ending it all.",
        "I have no reason to live.",
        "I want to die."
    ],
    "requesting_advice": [
        "How can I relax?",
        "Tell me a coping skill.",
        "What should I do when I'm stressed?",
        "Give me some advice."
    ],
    "general_chat": [
        "Hello there.",
        "How are you?",
        "Tell me a joke.",
        "What's up?",
        "Hi."
    ]
}

# Pre-defined responses for each intent
responses = {
    "crisis": "Please reach out to a professional immediately. You can call or text the 988 Suicide & Crisis Lifeline anytime in the US and Canada. You are not alone, and help is available.",
    "feeling_sad": "I'm so sorry you're feeling this way. Remember to be kind to yourself. Maybe try a short walk or listen to a calming song.",
    "feeling_anxious": "Anxiety can be overwhelming. Try the 5-4-3-2-1 grounding technique: list 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    "requesting_advice": "Breathing exercises can be very helpful. Try this: breathe in for four counts, hold for four, and breathe out for six. Repeat this a few times.",
    "general_chat": "Hello! I'm here to listen. How are you feeling today?"
}

# Prepare the data for training
all_messages = []
all_intents = []
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english') + list(string.punctuation))

def preprocess_text(text):
    tokens = nltk.word_tokenize(text.lower())
    filtered_tokens = [
        lemmatizer.lemmatize(word) for word in tokens if word not in stop_words
    ]
    return " ".join(filtered_tokens)

for intent, messages in data.items():
    for message in messages:
        all_messages.append(preprocess_text(message))
        all_intents.append(intent)

# Create and train the model
model_pipeline = make_pipeline(TfidfVectorizer(), MultinomialNB())
model_pipeline.fit(all_messages, all_intents)

# Save the trained model and responses to files
joblib.dump(model_pipeline, 'chatbot_model.pkl')
joblib.dump(responses, 'responses.pkl')

print("Model trained and saved successfully! You can now run the app.py file.")
import streamlit as st
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from transformers import pipeline

# Load models
reservation_assistant = pipeline("conversational", model="microsoft/DialoGPT-medium")
feedback_analyzer = pipeline("sentiment-analysis")
concierge_assistant = pipeline("text-generation", model="gpt2")


# Read data from CSV files
reservation_data = pd.read_csv('reservations.csv')  # Path to your reservations CSV file
feedback_data = pd.read_csv('feedback.csv')  # Path to your feedback CSV file
hotel_data = pd.read_csv('Hotels.csv')  # Path to your available hotels CSV file

# Define get_personalized_recommendation function
def get_personalized_recommendation(customer_name, reservation_data):
    user_reservations = reservation_data[reservation_data['customer_name'] == customer_name]
    
    if user_reservations.empty:
        return "No previous reservations found for personalization."
    
    # Example: Recommend based on the most recent reservation
    last_reservation = user_reservations.iloc[-1]
    recommendations = f"Based on your last stay at {last_reservation['hotel_name']}, we recommend the following for your next visit: ..."
    return recommendations

# Define function to handle new reservations
def make_reservation(customer_name, hotel_name, reservation_date, room_type):
    new_reservation = {
        "customer_name": customer_name,
        "hotel_name": hotel_name,
        "reservation_date": str(reservation_date),
        "room_type": room_type
    }
    global reservation_data
    new_reservation_df = pd.DataFrame([new_reservation])
    reservation_data = pd.concat([reservation_data, new_reservation_df], ignore_index=True)
    reservation_data.to_csv('reservations.csv', index=False)
    return "Your reservation has been made successfully."

# Analyze feedback function
def analyze_feedback(feedback_list):
    df = pd.DataFrame(feedback_list)
    df['sentiment'] = df['feedback_text'].apply(lambda x: feedback_analyzer(x)[0]['label'] if isinstance(x, str) else 'unknown')
    return df

# Get local recommendations function
def get_local_recommendations(preferences):
    recommendations = [
        {"place": "Seafood Restaurant", "type": "dining"},
        {"place": "City Park", "type": "attraction"},
        {"place": "Historic Museum", "type": "activity"}
    ]
    vectorizer = CountVectorizer().fit_transform([preferences] + [rec["place"] for rec in recommendations])
    vectors = vectorizer.toarray()
    cosine_matrix = cosine_similarity(vectors)
    similar_recommendations = cosine_matrix[0][1:]
    top_recommendations = sorted(zip(recommendations, similar_recommendations), key=lambda x: x[1], reverse=True)
    return [rec[0] for rec in top_recommendations]

# Streamlit UI
st.title("Hospitality AI Assistant")

st.header("1. Reservation Assistance")
customer_name = st.text_input("Enter your name:")
if customer_name:
    st.write(get_personalized_recommendation(customer_name, reservation_data))

    st.subheader("Make a New Reservation")
    hotel_name = st.selectbox("Select a hotel", hotel_data['hotel_name'].unique())
    reservation_date = st.date_input("Select reservation date")
    room_type = st.selectbox("Select room type", ["Single", "Double", "Suite"])
    
    if st.button("Confirm Reservation"):
        confirmation = make_reservation(customer_name, hotel_name, reservation_date, room_type)
        st.write(confirmation)


st.header("2. Guest Feedback Analysis")
if st.button("Analyze Feedback"):
    feedback_df = analyze_feedback(feedback_data.to_dict('records'))
    st.write(feedback_df)

st.header("3. Concierge Service")
preferences = st.text_input("Enter your preferences for dining, attractions, or activities:")
if preferences:
    recommendations = get_local_recommendations(preferences)
    st.write("Here are some recommendations based on your preferences:")
    for rec in recommendations:
        st.write(f"- {rec['place']} ({rec['type']})")

# Example chatbot interaction for Concierge
st.header("Chat with Concierge")
concierge_input = st.text_input("Ask the concierge for recommendations or information:")
if concierge_input:
    concierge_response = concierge_assistant(concierge_input, max_length=50)
    st.write(concierge_response[0]["generated_text"])


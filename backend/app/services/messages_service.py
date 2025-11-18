
def get_conversations(patient_id: int):
    return [
        {"id": 1, "doctor": "Dr. Emily Carter", "specialty": "General Physician",
         "lastMessage": "Your test results are ready", "time": "10:30 AM", "unread": 2}
    ]


def get_messages(conversation_id: int):
    return [
        {"id": 1, "sender": "doctor", "text": "Hello! I've reviewed your test results.", "time": "10:15 AM"},
        {"id": 3, "sender": "patient", "text": "Thank you doctor.", "time": "10:20 AM"},
    ]

# Simularemos datos

def get_patient_invoices(patient_id: int):
    return [
        {
            "id": "INV-2024-001",
            "date": "2024-03-15",
            "service": "General Consultation",
            "doctor": "Dr. Emily Carter",
            "amount": 150.00,
            "status": "paid",
        },
        {
            "id": "INV-2024-003",
            "date": "2024-03-05",
            "service": "X-Ray Scan",
            "doctor": "Radiology",
            "amount": 320.00,
            "status": "pending",
        },
    ]

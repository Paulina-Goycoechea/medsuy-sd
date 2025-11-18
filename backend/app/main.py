from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.patient_appointments import router as patient_appointments_router
from app.routes.patient_studies import router as patient_studies_router
from app.routes.patient_medication import router as patient_medications_router
from app.routes.patient_billing import router as patient_billing_router
from app.routes.patient_messages import router as patient_messages_router
from app.routes.patient_dashboard import router as patient_dashboard_router


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Routers
app.include_router(patient_appointments_router)
app.include_router(patient_studies_router)
app.include_router(patient_medications_router)
app.include_router(patient_billing_router)
app.include_router(patient_messages_router)
app.include_router(patient_dashboard_router)

@app.get("/")
def root():
    return {"message": "Backend funcionando 🚀"}

@app.get("/health")
def health():
    return {"status": "ok"}

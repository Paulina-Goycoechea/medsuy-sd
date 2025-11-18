from app.db import AsyncSessionLocal
from app.models import RecetaMedicamento, Receta, Medicamento
from sqlalchemy import select

async def get_patient_medications(patient_id: int):
    async with AsyncSessionLocal() as session:
        query = (
            select(RecetaMedicamento, Medicamento, Receta)
            .join(Receta, RecetaMedicamento.receta_id == Receta.id)
            .join(Medicamento, RecetaMedicamento.medicamento_id == Medicamento.id)
            .where(Receta.paciente_id == patient_id)
        )
        result = await session.execute(query)
        return result.fetchall()

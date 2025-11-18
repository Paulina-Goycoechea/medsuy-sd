from app.db import AsyncSessionLocal
from app.models import Estudio
from sqlalchemy import select

async def get_patient_studies(patient_id: int):
    async with AsyncSessionLocal() as session:
        query = select(Estudio).where(Estudio.paciente_id == patient_id)
        result = await session.execute(query)
        return result.scalars().all()

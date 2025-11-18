from datetime import datetime
from app.db import AsyncSessionLocal
from app.models import Consulta, Medico, Paciente
from sqlalchemy import select

async def get_upcoming_appointments(patient_id: int):
    async with AsyncSessionLocal() as session:
        query = (
            select(Consulta)
            .where(Consulta.paciente_id == patient_id)
            .where(Consulta.fecha_hora >= datetime.now())
            .order_by(Consulta.fecha_hora)
        )
        result = await session.execute(query)
        return result.scalars().all()


async def get_past_appointments(patient_id: int):
    async with AsyncSessionLocal() as session:
        query = (
            select(Consulta)
            .where(Consulta.paciente_id == patient_id)
            .where(Consulta.fecha_hora < datetime.now())
            .order_by(Consulta.fecha_hora.desc())
        )
        result = await session.execute(query)
        return result.scalars().all()


async def book_appointment(patient_id: int, consulta_id: int):
    async with AsyncSessionLocal() as session:
        consulta = await session.get(Consulta, consulta_id)

        if not consulta:
            raise Exception("Consulta no encontrada")

        if consulta.paciente_id is not None:
            raise Exception("El turno ya está reservado")

        consulta.paciente_id = patient_id
        await session.commit()
        return consulta

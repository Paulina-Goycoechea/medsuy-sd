from app.db import AsyncSessionLocal
from app.models import Consulta, Estudio, RecetaMedicamento
from sqlalchemy import select
from datetime import datetime

async def get_dashboard(patient_id: int):
    async with AsyncSessionLocal() as session:

        # Próximos turnos
        upcoming_q = (
            select(Consulta)
            .where(Consulta.paciente_id == patient_id)
            .where(Consulta.fecha_hora >= datetime.now())
        )
        upcoming = (await session.execute(upcoming_q)).scalars().all()

        # Estudios pendientes
        pending_q = (
            select(Estudio)
            .where(Estudio.paciente_id == patient_id)
        )
        pending = (await session.execute(pending_q)).scalars().all()

        # Medicaciones activas
        meds_q = (
            select(RecetaMedicamento)
        )
        meds = (await session.execute(meds_q)).scalars().all()

        return {
            "upcomingAppointments": len(upcoming),
            "pendingStudies": len(pending),
            "activeMedications": len(meds)
        }

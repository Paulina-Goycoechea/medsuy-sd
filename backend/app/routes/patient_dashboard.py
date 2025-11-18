from __future__ import annotations

from datetime import datetime, date

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models import Paciente, Consulta, Estudio, Receta, RecetaMedicamento, Medicamento

router = APIRouter(prefix="/api/patient", tags=["Paciente - Dashboard"])


class DashboardSummary(BaseModel):
    upcoming_appointments: int
    pending_studies: int
    active_medications: int


async def _get_paciente_or_404(
    session: AsyncSession,
    paciente_id: int,
) -> Paciente:
    result = await session.execute(
        select(Paciente).where(Paciente.usuario_id == paciente_id, Paciente.is_activo.is_(True))
    )
    paciente = result.scalar_one_or_none()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return paciente


@router.get("/{paciente_id}/dashboard", response_model=DashboardSummary)
async def get_dashboard(
    paciente_id: int,
    session: AsyncSession = Depends(get_session),
):
    await _get_paciente_or_404(session, paciente_id)

    now = datetime.utcnow()
    today = date.today()

    # turnos futuros reservados
    stmt_appointments = select(Consulta).where(
        Consulta.paciente_id == paciente_id,
        Consulta.fecha_hora >= now,
        Consulta.estado == "reservado",
        Consulta.is_activo.is_(True),
    )
    res_app = await session.execute(stmt_appointments)
    upcoming_appointments = len(res_app.scalars().all())

    # estudios pendientes (fecha futura)
    stmt_studies = select(Estudio).where(
        Estudio.paciente_id == paciente_id,
        Estudio.is_activo.is_(True),
        Estudio.fecha > today,
    )
    res_st = await session.execute(stmt_studies)
    pending_studies = len(res_st.scalars().all())

    # medicamentos activos (recetas vigentes)
    stmt_meds = (
        select(Receta, RecetaMedicamento, Medicamento)
        .join(RecetaMedicamento, RecetaMedicamento.receta_id == Receta.id)
        .join(Medicamento, Medicamento.id == RecetaMedicamento.medicamento_id)
        .where(
            Receta.paciente_id == paciente_id,
            Receta.is_activo.is_(True),
            Medicamento.is_activo.is_(True),
            (Receta.hasta.is_(None)) | (Receta.hasta >= today),
        )
    )
    res_meds = await session.execute(stmt_meds)
    active_medications = len(res_meds.all())

    return DashboardSummary(
        upcoming_appointments=upcoming_appointments,
        pending_studies=pending_studies,
        active_medications=active_medications,
    )

from __future__ import annotations
from datetime import date
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models import Estudio, Paciente, Medico, Usuario

router = APIRouter(prefix="/api/patient", tags=["Paciente - Studies"])


class StudyItem(BaseModel):
    id: int
    name: str
    status: str
    date_ordered: date
    time: Optional[str] = None
    doctor: str

    class Config:
        from_attributes = True


async def _get_paciente_or_404(session: AsyncSession, paciente_id: int) -> Paciente:
    stmt = select(Paciente).where(
        Paciente.usuario_id == paciente_id,
        Paciente.is_activo.is_(True)
    )
    result = await session.execute(stmt)
    paciente = result.scalar_one_or_none()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return paciente


@router.get("/{paciente_id}/studies", response_model=List[StudyItem])
async def get_studies(
    paciente_id: int,
    session: AsyncSession = Depends(get_session),
):
    """Lista de estudios del paciente."""
    await _get_paciente_or_404(session, paciente_id)
    today = date.today()

    stmt = (
        select(Estudio, Medico, Usuario)
        .join(Medico, Medico.usuario_id == Estudio.medico_id)
        .join(Usuario, Usuario.id == Medico.usuario_id)
        .where(Estudio.paciente_id == paciente_id)
        .order_by(Estudio.fecha.desc())
    )

    result = await session.execute(stmt)
    rows = result.all()

    studies: List[StudyItem] = []

    for estudio, medico, usuario_medico in rows:
        doctor_name = f"{usuario_medico.nombre} {usuario_medico.apellido}"

        if estudio.fecha > today:
            status = "pending"
        elif estudio.fecha == today:
            status = "completed"
        else:
            status = "results-available"

        studies.append(
            StudyItem(
                id=estudio.id,
                name=estudio.nombre,
                status=status,
                date_ordered=estudio.fecha,
                time=estudio.hora.strftime("%H:%M") if estudio.hora else None,
                doctor=doctor_name,
            )
        )

    return studies

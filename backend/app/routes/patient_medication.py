from __future__ import annotations

from datetime import date
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models import (
    Paciente,
    Receta,
    RecetaMedicamento,
    Medicamento,
)

router = APIRouter(prefix="/api/patient", tags=["Paciente - Medications"])


class MedicationItem(BaseModel):
    id: int
    name: str
    dosage: str | None = None
    location: str | None = None
    status: str

    class Config:
        orm_mode = True


async def _get_paciente_or_404(
    session: AsyncSession,
    paciente_id: int,
) -> Paciente:
    result = await session.execute(
        select(Paciente).where(
            Paciente.usuario_id == paciente_id,
            Paciente.is_activo.is_(True)
        )
    )
    paciente = result.scalar_one_or_none()
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return paciente


@router.get("/{paciente_id}/medications", response_model=List[MedicationItem])
async def get_medications(
    paciente_id: int,
    session: AsyncSession = Depends(get_session),
):
    """
    Medicamentos activos (derivados de recetas).
    El estado se simula:
      - 'ready'       si la receta está vigente (hoy dentro del rango)
      - 'processing'  si la receta empieza en el futuro
      - 'picked-up'   si la receta ya venció
    """
    await _get_paciente_or_404(session, paciente_id)

    stmt = (
        select(Receta, RecetaMedicamento, Medicamento)
        .join(RecetaMedicamento, RecetaMedicamento.receta_id == Receta.id)
        .join(Medicamento, Medicamento.id == RecetaMedicamento.medicamento_id)
        .where(
            Receta.paciente_id == paciente_id,
            Receta.is_activo.is_(True),
            Medicamento.is_activo.is_(True),
        )
        .order_by(Receta.desde)
    )

    result = await session.execute(stmt)
    rows = result.all()

    today = date.today()
    meds: List[MedicationItem] = []

    for receta, rec_med, medicamento in rows:

        if receta.desde > today:
            status = "processing"
        elif receta.hasta is None or receta.hasta >= today:
            status = "ready"
        else:
            status = "picked-up"

        meds.append(
            MedicationItem(
                id=medicamento.id,
                name=medicamento.nombre,
                dosage=receta.frecuencia,
                location="Pickup at main clinic",  # simulado
                status=status,
            )
        )

    return meds

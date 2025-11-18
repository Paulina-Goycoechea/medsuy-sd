from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models import Paciente, Compra, Medicamento

router = APIRouter(prefix="/api/patient", tags=["Paciente - Billing"])


class InvoiceItem(BaseModel):
    id: str
    date: str
    service: str
    provider: str
    amount: float
    status: str

    class Config:
        orm_mode = True


class BillingSummary(BaseModel):
    total_paid: float
    total_pending: float
    total_overdue: float


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


@router.get("/{paciente_id}/billing/invoices", response_model=List[InvoiceItem])
async def get_invoices(
    paciente_id: int,
    session: AsyncSession = Depends(get_session),
):
    """
    Simula facturas en base a compras de medicamentos.
    Por simplicidad, todas se marcan como 'paid'.
    """
    await _get_paciente_or_404(session, paciente_id)

    stmt = (
        select(Compra, Medicamento)
        .join(Medicamento, Medicamento.id == Compra.medicamento_id)
        .where(
            Compra.paciente_id == paciente_id,
            Compra.is_activo.is_(True),
        )
        .order_by(Compra.fecha_hora.desc())
    )

    result = await session.execute(stmt)
    rows = result.all()

    invoices: List[InvoiceItem] = []
    for idx, (compra, med) in enumerate(rows, start=1):
        amount = float(med.precio) * compra.cantidad
        invoices.append(
            InvoiceItem(
                id=f"INV-{compra.id}",
                date=compra.fecha_hora.date().isoformat(),
                service=f"Compra de {med.nombre}",
                provider="Farmacia MedSUY",
                amount=amount,
                status="paid",
            )
        )

    return invoices


@router.get("/{paciente_id}/billing/summary", response_model=BillingSummary)
async def get_billing_summary(
    paciente_id: int,
    session: AsyncSession = Depends(get_session),
):
    """Resumen simplificado: todo se considera 'paid'."""
    invoices = await get_invoices(paciente_id, session)  # reuse

    total_paid = sum(inv.amount for inv in invoices)
    # simulamos sin pendientes ni vencidos
    return BillingSummary(
        total_paid=total_paid,
        total_pending=0.0,
        total_overdue=0.0,
    )

from __future__ import annotations
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Index,
    Integer,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .paciente import Paciente
    from .medicamento import Medicamento


class Compra(Base):
    __tablename__ = "compra"
    __table_args__ = (
        CheckConstraint("cantidad > 0", name="chk_compra_cantidad"),
        Index("idx_compra_paciente", "paciente_id"),
        Index("idx_compra_medicamento", "medicamento_id"),
        Index("idx_compra_fecha", "fecha_hora"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    paciente_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("paciente.usuario_id"),
        nullable=False,
    )
    medicamento_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("medicamento.id"),
        nullable=False,
    )
    cantidad: Mapped[int] = mapped_column(Integer, nullable=False)
    fecha_hora: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        server_default=func.now(),
    )
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    paciente: Mapped["Paciente"] = relationship(
        back_populates="compras",
    )
    medicamento: Mapped["Medicamento"] = relationship(
        back_populates="compras",
    )

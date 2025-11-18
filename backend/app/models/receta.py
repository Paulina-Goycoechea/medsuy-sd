from __future__ import annotations
from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Date,
    ForeignKey,
    Index,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .medico import Medico
    from .paciente import Paciente
    from .receta_medicamento import RecetaMedicamento


class Receta(Base):
    __tablename__ = "receta"
    __table_args__ = (
        CheckConstraint(
            "(hasta IS NULL) OR (hasta >= desde)",
            name="chk_receta_rango",
        ),
        Index("idx_receta_medico_paciente", "medico_id", "paciente_id"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    medico_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("medico.usuario_id"),
        nullable=False,
    )
    paciente_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("paciente.usuario_id"),
        nullable=False,
    )
    desde: Mapped[date] = mapped_column(Date, nullable=False)
    hasta: Mapped[date | None] = mapped_column(Date)
    frecuencia: Mapped[str | None] = mapped_column(String(100))
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    medico: Mapped["Medico"] = relationship(
        back_populates="recetas",
    )
    paciente: Mapped["Paciente"] = relationship(
        back_populates="recetas",
    )
    medicamentos: Mapped[list["RecetaMedicamento"]] = relationship(
        back_populates="receta",
        cascade="all, delete-orphan",
    )

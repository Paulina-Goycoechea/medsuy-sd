from __future__ import annotations
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    Index,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .sucursal import Sucursal
    from .medico import Medico
    from .paciente import Paciente


class Consulta(Base):
    __tablename__ = "consulta"
    __table_args__ = (
        UniqueConstraint("sucursal_id", "fecha_hora", "sala", name="uq_consulta_slot"),
        Index("idx_consulta_sucursal", "sucursal_id"),
        Index("idx_consulta_medico", "medico_id"),
        Index("idx_consulta_paciente", "paciente_id"),
        Index("idx_consulta_fecha", "fecha_hora"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    sucursal_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("sucursal.id"),
        nullable=False,
    )
    medico_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("medico.usuario_id"),
        nullable=False,
    )
    paciente_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("paciente.usuario_id"),
        nullable=True,
    )
    fecha_hora: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    sala: Mapped[str] = mapped_column(String(50), nullable=False)
    especialidad: Mapped[str | None] = mapped_column(String(100))
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    sucursal: Mapped["Sucursal"] = relationship(
        back_populates="consultas",
    )
    medico: Mapped["Medico"] = relationship(
        back_populates="consultas",
    )
    paciente: Mapped["Paciente | None"] = relationship(
        back_populates="consultas",
    )

from __future__ import annotations
from datetime import date, time
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, Date, ForeignKey, Index, Time, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .medico import Medico
    from .paciente import Paciente
    from .sucursal import Sucursal


class Estudio(Base):
    __tablename__ = "estudio"
    __table_args__ = (
        Index("idx_estudio_medico", "medico_id"),
        Index("idx_estudio_paciente", "paciente_id"),
        Index("idx_estudio_fecha", "fecha", "hora"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(150), nullable=False)
    fecha: Mapped[date] = mapped_column(Date, nullable=False)
    hora: Mapped[time] = mapped_column(Time, nullable=False)
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
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    medico: Mapped["Medico"] = relationship(
        back_populates="estudios",
    )
    paciente: Mapped["Paciente"] = relationship(
        back_populates="estudios",
    )
    sucursales: Mapped[list["Sucursal"]] = relationship(
        secondary="sucursal_estudio",
        back_populates="estudios",
    )

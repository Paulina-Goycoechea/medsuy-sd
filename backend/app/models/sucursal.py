from __future__ import annotations
from datetime import time
from typing import TYPE_CHECKING

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    String,
    Time,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .consulta import Consulta
    from .estudio import Estudio


class Sucursal(Base):
    __tablename__ = "sucursal"
    __table_args__ = (
        UniqueConstraint("nombre", name="uq_sucursal_nombre"),
        CheckConstraint("hora_desde < hora_hasta", name="chk_sucursal_horas"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(150), nullable=False)
    direccion: Mapped[str] = mapped_column(String(200), nullable=False)
    hora_desde: Mapped[time] = mapped_column(Time, nullable=False)
    hora_hasta: Mapped[time] = mapped_column(Time, nullable=False)
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    consultas: Mapped[list["Consulta"]] = relationship(
        back_populates="sucursal",
    )
    estudios: Mapped[list["Estudio"]] = relationship(
        secondary="sucursal_estudio",
        back_populates="sucursales",
    )

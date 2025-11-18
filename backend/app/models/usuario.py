from __future__ import annotations
from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, Date, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base
from .types import rol_usuario_enum

if TYPE_CHECKING:
    from .admin import Admin
    from .medico import Medico
    from .paciente import Paciente


class Usuario(Base):
    __tablename__ = "usuario"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    apellido: Mapped[str] = mapped_column(String(100), nullable=False)
    cedula: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(150), nullable=False)
    fecha_nac: Mapped[date] = mapped_column(Date, nullable=False)
    celular: Mapped[str | None] = mapped_column(String(20))
    rol: Mapped[str] = mapped_column(rol_usuario_enum, nullable=False)
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    # Subtipos 1:1
    admin: Mapped["Admin | None"] = relationship(
        back_populates="usuario",
        uselist=False,
    )
    medico: Mapped["Medico | None"] = relationship(
        back_populates="usuario",
        uselist=False,
    )
    paciente: Mapped["Paciente | None"] = relationship(
        back_populates="usuario",
        uselist=False,
    )

from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .usuario import Usuario
    from .consulta import Consulta
    from .estudio import Estudio
    from .compra import Compra
    from .receta import Receta


class Paciente(Base):
    __tablename__ = "paciente"

    usuario_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("usuario.id", ondelete="CASCADE"),
        primary_key=True,
    )
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    usuario: Mapped["Usuario"] = relationship(
        back_populates="paciente",
    )

    consultas: Mapped[list["Consulta"]] = relationship(
        back_populates="paciente",
    )
    estudios: Mapped[list["Estudio"]] = relationship(
        back_populates="paciente",
    )
    compras: Mapped[list["Compra"]] = relationship(
        back_populates="paciente",
    )
    recetas: Mapped[list["Receta"]] = relationship(
        back_populates="paciente",
    )

from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, ForeignKey, Text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .usuario import Usuario
    from .consulta import Consulta
    from .estudio import Estudio
    from .receta import Receta


class Medico(Base):
    __tablename__ = "medico"

    usuario_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("usuario.id", ondelete="CASCADE"),
        primary_key=True,
    )
    # TEXT[] NOT NULL DEFAULT '{}'
    especialidades: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
    )
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    usuario: Mapped["Usuario"] = relationship(
        back_populates="medico",
    )

    # 1:N
    consultas: Mapped[list["Consulta"]] = relationship(
        back_populates="medico",
    )
    estudios: Mapped[list["Estudio"]] = relationship(
        back_populates="medico",
    )
    recetas: Mapped[list["Receta"]] = relationship(
        back_populates="medico",
    )

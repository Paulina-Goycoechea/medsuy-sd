from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .receta import Receta
    from .medicamento import Medicamento


class RecetaMedicamento(Base):
    __tablename__ = "receta_medicamento"

    receta_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("receta.id", ondelete="CASCADE"),
        primary_key=True,
    )
    medicamento_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("medicamento.id"),
        primary_key=True,
    )
    # aquí podrías agregar dosis/indicaciones específicas

    receta: Mapped["Receta"] = relationship(
        back_populates="medicamentos",
    )
    medicamento: Mapped["Medicamento"] = relationship(
        back_populates="recetas",
    )

from __future__ import annotations
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .compra import Compra
    from .receta_medicamento import RecetaMedicamento


class Medicamento(Base):
    __tablename__ = "medicamento"
    __table_args__ = (
        UniqueConstraint("nombre", name="uq_medicamento_nombre"),
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(150), nullable=False)
    precio: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    recetas: Mapped[list["RecetaMedicamento"]] = relationship(
        back_populates="medicamento",
    )
    compras: Mapped[list["Compra"]] = relationship(
        back_populates="medicamento",
    )

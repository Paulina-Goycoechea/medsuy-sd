from __future__ import annotations

from sqlalchemy import BigInteger, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.db import Base


class SucursalEstudio(Base):
    __tablename__ = "sucursal_estudio"

    sucursal_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("sucursal.id", ondelete="CASCADE"),
        primary_key=True,
    )
    estudio_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("estudio.id", ondelete="CASCADE"),
        primary_key=True,
    )

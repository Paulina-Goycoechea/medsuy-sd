from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base

if TYPE_CHECKING:
    from .usuario import Usuario


class Admin(Base):
    __tablename__ = "admin"

    usuario_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("usuario.id", ondelete="CASCADE"),
        primary_key=True,
    )
    is_activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    usuario: Mapped["Usuario"] = relationship(
        back_populates="admin",
    )

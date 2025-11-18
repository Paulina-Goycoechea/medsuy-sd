from app.db import Base  # para poder hacer Base.metadata.create_all si quisieras

from .usuario import Usuario
from .admin import Admin
from .medico import Medico
from .paciente import Paciente
from .sucursal import Sucursal
from .consulta import Consulta
from .estudio import Estudio
from .sucursalEstudio import SucursalEstudio
from .medicamento import Medicamento
from .compra import Compra
from .receta import Receta
from .receta_medicamento import RecetaMedicamento

__all__ = [
    "Base",
    "Usuario",
    "Admin",
    "Medico",
    "Paciente",
    "Sucursal",
    "Consulta",
    "Estudio",
    "SucursalEstudio",
    "Medicamento",
    "Compra",
    "Receta",
    "RecetaMedicamento",
]

from sqlalchemy.dialects.postgresql import ENUM

# Tipo ENUM compartido para el rol del usuario.
# En la base ya lo creaste con el script SQL, por eso create_type=False
rol_usuario_enum = ENUM(
    "admin",
    "medico",
    "paciente",
    name="rol_usuario",
    create_type=True,
)

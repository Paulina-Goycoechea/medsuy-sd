FROM python:3.11-slim

WORKDIR /worker

# Copiar requirements propios del worker
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copiar el script del worker
COPY worker.py .

CMD ["python", "worker.py"]

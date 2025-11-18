from __future__ import annotations

from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session

router = APIRouter(prefix="/api/patient", tags=["Paciente - Messages"])


class ConversationItem(BaseModel):
    id: int
    doctor: str
    specialty: str
    last_message: str
    time: str
    unread: int
    avatar: str


class MessageItem(BaseModel):
    id: int
    sender: str
    text: str
    time: str


class SendMessageRequest(BaseModel):
    text: str


@router.get("/{paciente_id}/messages/conversations", response_model=List[ConversationItem])
async def get_conversations(
    paciente_id: int,
    session: AsyncSession = Depends(get_session),
):
    return [
        ConversationItem(
            id=1,
            doctor="Dr. Emily Carter",
            specialty="General Physician",
            last_message="Your test results are ready",
            time="10:30 AM",
            unread=2,
            avatar="EC",
        ),
        ConversationItem(
            id=2,
            doctor="Dr. Michael Brown",
            specialty="Cardiologist",
            last_message="Please schedule a follow-up",
            time="Yesterday",
            unread=0,
            avatar="MB",
        ),
    ]


@router.get("/{paciente_id}/messages/{conversation_id}", response_model=List[MessageItem])
async def get_messages(
    paciente_id: int,
    conversation_id: int,
    session: AsyncSession = Depends(get_session),
):
    return [
        MessageItem(
            id=1,
            sender="doctor",
            text="Hello! I've reviewed your test results.",
            time="10:15 AM",
        ),
        MessageItem(
            id=2,
            sender="doctor",
            text="Your blood work looks good overall.",
            time="10:16 AM",
        ),
        MessageItem(
            id=3,
            sender="patient",
            text="Thank you doctor. Should I be concerned?",
            time="10:20 AM",
        ),
    ]


@router.post("/{paciente_id}/messages/{conversation_id}", response_model=MessageItem)
async def send_message(
    paciente_id: int,
    conversation_id: int,
    body: SendMessageRequest,
    session: AsyncSession = Depends(get_session),
):
    if not body.text.strip():
        raise HTTPException(status_code=400, detail="El mensaje no puede estar vacío")

    now_str = datetime.utcnow().strftime("%I:%M %p")

    return MessageItem(
        id=int(datetime.utcnow().timestamp()),
        sender="patient",
        text=body.text,
        time=now_str,
    )

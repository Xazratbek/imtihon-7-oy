from celery import shared_task
from apps.ai.models import AiGeneration
from .utils import call_ai

@shared_task
def generate_response(data: dict, generation_id: int) -> dict:
    generation = AiGeneration.objects.get(pk=generation_id)
    prompt = (
        f"Mavzu: {data['topic']}\nHujjat turi: {data['doc_type']}\nHajm: {data['size']}\n"
        + (f"Qo'shimcha talablar: {data['details']}\n" if data.get("details") else "")
        + "\nShu mavzu bo'yicha to'liq matn yoz (kirish, asosiy qism, xulosa bilan)."
    )
    try:
        content = call_ai(prompt, system="Sen talabalar uchun referat/konspekt yozuvchi yordamchisan.")
    except Exception:
        generation.status = AiGeneration.FAILED
        generation.save(update_fields=["status"])
        raise

    generation.content = content
    generation.status = AiGeneration.COMPLETED
    generation.save(update_fields=["content", "status"])
    return {"id": generation.id, "content": content, "is_public": generation.is_public}

@shared_task
def generate_summary(text: str, generation_id: int):
    generation = AiGeneration.objects.get(pk=generation_id)
    prompt = (
        "Quyidagi matn asosida batafsil xulosa yoz. Har bir bo'lim keng va tushunarli yoritilsin "
        "(qisqa jumlalar bilan cheklanma, kerak bo'lsa misollar va tushuntirishlar qo'sh). "
        "Javobni aynan shu formatda ber:\n\n"
        "Asosiy mavzu: (matn nimadan iboratligini 3-4 gapda batafsil tushuntir)\n\n"
        "Muhim tushunchalar: (kamida 5-7 ta asosiy tushuncha/atama, har biri qisqacha izoh bilan)\n\n"
        "Batafsil xulosa: (matnning asosiy g'oyalari, argumentlari va xulosalarini 6-8 gapda, "
        "bo'limlarga ajratib, chuqur tushuntir)\n\nMatn:\n" + text
    )
    try:
        summary = call_ai(prompt, system="Sen talabalar uchun batafsil va tushunarli konspekt yozuvchi yordamchisan.")
    except Exception:
        generation.status = AiGeneration.FAILED
        generation.save(update_fields=["status"])
        raise

    generation.content = summary
    generation.status = AiGeneration.COMPLETED
    generation.save(update_fields=["content", "status"])
    return {"id": generation.id, "material": generation.material_id, "summary": summary, "is_public": generation.is_public}

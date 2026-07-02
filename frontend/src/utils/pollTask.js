import api from "../api/client";

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000;

// task_id bilan /ai/tasks/{id}/ ni har 2 soniyada so'raydi, SUCCESS/FAILURE bo'lguncha.
// Qaytargan funksiyani chaqirish polling'ni to'xtatadi (unmount yoki yangi so'rov boshlanganda).
export function pollTask(taskId, { onSuccess, onError }) {
  const startedAt = Date.now();

  const interval = setInterval(async () => {
    if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
      clearInterval(interval);
      onError("Kutish vaqti tugadi (5 daqiqa), keyinroq qayta urinib ko'ring");
      return;
    }
    try {
      const { data } = await api.get(`/ai/tasks/${taskId}/`);
      if (data.state === "SUCCESS") {
        clearInterval(interval);
        onSuccess(data.result);
      } else if (data.state === "FAILURE") {
        clearInterval(interval);
        onError(typeof data.result === "string" ? data.result : "AI xatolik qaytardi");
      }
      // PENDING/STARTED/RETRY -> hali tayyor emas, kutishda davom etamiz
    } catch {
      clearInterval(interval);
      onError("Holatni tekshirishda xatolik yuz berdi");
    }
  }, POLL_INTERVAL_MS);

  return () => clearInterval(interval);
}

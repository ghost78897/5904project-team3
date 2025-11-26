// src/utils/bookboyChat.ts

const COZE_API_URL = 'https://api.coze.cn/open_api/v2/chat';
const COZE_BOT_ID = '7568709481517973544';
// ⚠️ 真实项目不要把 Token 放前端，这里只是按你现在的结构保持一致
const COZE_TOKEN =
  'pat_s4oWJJcJdz5NIzGXQBpJdg4o7X3oBPA2AI7dm6MggrrJgzcJbqGHyRbQ9lC7Vrwx';

export interface PresetQuestion {
  question: string;
  answer: string;
}

// 和 BookBoyPage 里的 presetQuestions 结构一致：
// Record<分类名, PresetQuestion[]>
export type PresetQuestionsMap = Record<string, PresetQuestion[]>;

// 调用 Coze API，返回机器人回复文本
export async function callCozeAPI(query: string): Promise<string> {
  const payload = {
    conversation_id: '',
    bot_id: COZE_BOT_ID,
    user: 'web_user_123',
    query,
    stream: false
  };

  const response = await fetch(COZE_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${COZE_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Coze API error: ${response.status} ${text}`);
  }

  const json = await response.json();

  const messages = json.data?.messages ?? json.messages;

  if (!Array.isArray(messages)) {
    throw new Error('Coze API 返回中没有 messages 字段');
  }

  // 1. 优先从 content 里找 msg_type === "answer"
  for (const m of messages) {
    const raw = m.content;
    if (typeof raw !== 'string') continue;

    try {
      const parsed = JSON.parse(raw);
      if (parsed.msg_type === 'answer') {
        if (typeof parsed.content === 'string') return parsed.content;
        if (typeof parsed.data === 'string') return parsed.data;
      }
    } catch {
      // 不是 JSON（纯文本），那就当成正常回答兜底使用
      if ((m.role === 'assistant' || m.type === 'answer') && typeof raw === 'string') {
        return raw;
      }
    }
  }

  // 2. 兜底：找第一个 assistant 的纯文本消息
  const plain = messages.find(
    (m: any) =>
      (m.role === 'assistant' || m.type === 'answer') &&
      typeof m.content === 'string'
  );
  if (plain) return plain.content;

  throw new Error('没有找到机器人回复内容');
}

// 本地预设答案兜底函数
export function getPresetAnswerFromLocal(
  question: string,
  preset: PresetQuestionsMap
): string | null {
  // 这里显式告诉 TS：Object.values 返回的是 PresetQuestion[][]
  for (const category of Object.values(preset) as PresetQuestion[][]) {
    const match = category.find(
      (q) => q.question.toLowerCase() === question.toLowerCase()
    );
    if (match) return match.answer;
  }
  return null;
}

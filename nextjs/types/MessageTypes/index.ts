// types.ts
export type Role = 'agent' | 'user';

export interface Message {
    id: string;              // 唯一識別
    role: Role;              // 'agent' 或 'user'
    content: string;         // 對話文字內容
    isStreaming?: boolean;   // 是否正在流式生成 (僅 Agent 可能為 true)
}
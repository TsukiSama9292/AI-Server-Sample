from langchain_ollama import ChatOllama
from ai_sample.core.settings import setting
import json
from langchain.prompts import ChatPromptTemplate
from ai_sample.prompt.chatTemplate import chatTemplate
from langchain.schema.output_parser import StrOutputParser

async def chatbot(
    question: str,
):
    """
    這個函數是用於調用 AI 聊天機器人的核心邏輯。
    該機器人無記憶功能，僅根據當前問題生成回答。
    """
    model = ChatOllama(
        model="gemma3:1b-it-qat",
        temperature=1.0,
        top_p=1.0,
        max_tokens=8192,
        base_url=setting.ollama_api_url,
        keep_alive=300,
    )
    messages = ChatPromptTemplate.from_messages(chatTemplate)
    chain = messages | model | StrOutputParser()
    input_dict = {"question": question}
    generator = chain.astream(input_dict)
    
    async for msg in generator:
        if msg is None or msg == "":
            continue
        yield f"data:{json.dumps({'context': msg, 'status': 'streaming'}, ensure_ascii=False)}\n\n"

    yield f"data:{json.dumps({'context': '', 'status': 'done'}, ensure_ascii=False)}\n\n"
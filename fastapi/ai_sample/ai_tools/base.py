from langchain_community.utilities import SearxSearchWrapper
from langchain_core.tools import tool
from ai_sample.core.settings import setting

# 依照搜尋速度進行排序
web_engine = ["bing", "google", "duckduckgo", "yahoo", "brave"]
news_engine = ["bing news", "duckduckgo news", "google news", "yahoo news", "brave news"]
science_engine = ["google scholar", "arxiv"]
social_engine = ["mastodon hashtags", "mastodon users", "lemmy communities", "lemmy users", "lemmy comments", "lemmy posts", "reddit"]

def get_search_engine(engine_type: str):
    """
    根據引擎類型返回對應的搜尋引擎列表。
    """
    if engine_type == "web":
        return web_engine
    elif engine_type == "news":
        return news_engine
    elif engine_type == "science":
        return science_engine
    elif engine_type == "social":
        return social_engine
    else:
        raise ValueError(f"Unknown engine type: {engine_type}")

def get_search(engine_type: str, query: str, num_results: int = 3):
    engine = get_search_engine(engine_type)
    search = SearxSearchWrapper(
        searx_host = setting.searxng_url,
        engines = engine,
    )
    results = search.results(
        query,
        num_results=num_results,
    )
    # 過濾掉 snippet 為空的項目
    return [r for r in results if r.get("snippet", "").strip()]
import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { ...options, signal });

        // 如果 fetch 被中止，會在 await 時被丟出錯誤 → catch 中判斷
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        // "AbortError" 代表 fetch 已被手動取消，不應該當成錯誤處理
        if (err.name === "AbortError") return;
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // cleanup：中止舊的請求
    return () => {
      controller.abort();
    };
  }, [url]); // url 改變就重新執行

  return { data, loading, error };
}

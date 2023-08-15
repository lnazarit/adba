import { useEffect, useState } from "react";
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function useLang(locale) {
  const [messages, setMessages] = useState(null)
  useEffect(() => {
    import(`../messages/${locale}.json`).then((e) => {
      setMessages(e.default)
    });
  }, [locale])
  return {messages};
}

export {useDebounce, useDocumentTitle, useLang}

'use client';

import { memo, useRef, useEffect, useState, useCallback, useMemo } from 'react';

// https://stackoverflow.com/questions/63267099/how-set-displayname-to-a-react-stateless-component-with-memo
// https://stackoverflow.com/questions/73362190/usage-of-react-memo-inside-components-with-prop-functions
// https://zh-hans.react.dev/reference/react/useCallback#:~:text=%E5%9C%A8%20JavaScript%20%E4%B8%AD%EF%BC%8Cfunction%20()%20%7B%7D%20%E6%88%96%E8%80%85%20()%20%3D%3E%20%7B%7D%20%E6%80%BB%E6%98%AF%E4%BC%9A%E7%94%9F%E6%88%90%E4%B8%8D%E5%90%8C%E7%9A%84%E5%87%BD%E6%95%B0%E3%80%82
// memo and useCallback should be used together
const Clock = memo(function clock({ onClick }: { onClick: () => string }) {
  const time = onClick();
  return <div suppressHydrationWarning>{time}</div>;
});

export default function Home() {
  const [render, setRender] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const getTime = useCallback(() => {
    const time = new Date().getTime().toString();
    return time;
  }, []);

  // 作为属性返回
  const clockUi = useMemo(() => {
    return <div>{new Date().getTime().toString()}</div>;
  }, []);

  useEffect(() => {
    setHasMounted(true);
    console.log('render home component');
  }, []);

  // https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <button onClick={() => setRender(!render)}>
        更新状态 -- {JSON.stringify(render)}
      </button>

      <h2>useMemo</h2>
      <div suppressHydrationWarning>{clockUi}</div>

      <h2>useCallback and React.memo</h2>
      <Clock onClick={getTime} />
    </>
  );
}

import * as React from 'react';

export default function FakeLink({inline, style, children}) {
  const toggle = inline ? 'inline' : 'flex';

  return (
    <div style={{
      display: toggle, justifyContent: 'left', color: '#1273BA', cursor: 'pointer', ...style
    }}>
      {children}
    </div>
  );
}

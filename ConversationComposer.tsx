'use client';

import { useState } from 'react';

export function ConversationComposer({ conversationId }: { conversationId: string }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    const res = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: text })
    });
    setLoading(false);
    if (res.ok) {
      setText('');
      window.location.reload();
    }
  }

  return (
    <form onSubmit={submit} className="flex gap-3">
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your message" className="flex-1 rounded-2xl border px-4 py-3" />
      <button disabled={loading} className="rounded-2xl bg-brand px-5 py-3 font-semibold text-white">
        Send
      </button>
    </form>
  );
}

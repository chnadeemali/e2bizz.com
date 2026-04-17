export function AdSlot({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-dashed bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Ad placement</p>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
      <div className="mt-4 rounded-2xl bg-slate-50 py-10 text-sm text-slate-400">Google AdSense / sponsor unit</div>
    </div>
  );
}

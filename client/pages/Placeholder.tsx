export function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700">Coming soon</div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mx-auto mt-2 max-w-prose text-foreground/70">{description}</p>}
      </div>
    </div>
  );
}

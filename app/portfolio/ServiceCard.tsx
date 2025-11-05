import React from "react";

export default function ServiceCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-neutral-900 text-white">
          {icon}
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-neutral-600">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" /> {it}
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-neutral-100 opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}

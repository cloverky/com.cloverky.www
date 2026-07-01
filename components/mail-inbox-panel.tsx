"use client";

import { useEffect, useRef, useState } from "react";
import { Inbox, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchInbox, type InboxItem } from "@/lib/mail-api";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MailItem({ item }: { item: InboxItem }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      className={cn(
        "w-full text-left rounded-xl border border-border/50 bg-card/60 px-4 py-3",
        "transition hover:border-accent/30 hover:bg-accent/5",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-accent">{item.from_email}</p>
          <p className="mt-0.5 truncate text-sm font-medium text-foreground">
            {item.subject ?? "(제목 없음)"}
          </p>
        </div>
        <span className="shrink-0 text-[10px] text-muted-foreground">
          {formatTime(item.received_at)}
        </span>
      </div>
      {expanded && item.body && (
        <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground border-t border-border/40 pt-2">
          {item.body}
        </p>
      )}
    </button>
  );
}

export function MailInboxPanel({ open, onOpenChange }: Props) {
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  async function load() {
    setLoading(true);
    const data = await fetchInbox();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    if (open) load();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className={cn(
        "fixed z-50 flex flex-col",
        "bottom-20 right-4 sm:right-6",
        "w-[min(360px,calc(100vw-2rem))]",
        "max-h-[70vh]",
        "rounded-2xl border border-border/70 bg-card shadow-2xl",
        "ring-1 ring-white/[0.05]",
      )}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Inbox className="h-4 w-4 text-accent" />
          수신함
          {items.length > 0 && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
              {items.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:text-foreground disabled:opacity-40"
            aria-label="새로고침"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:text-foreground"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 목록 */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">불러오는 중…</p>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">수신된 메일이 없습니다.</p>
        ) : (
          items.map((item) => <MailItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

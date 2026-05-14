"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Upload, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const EXPECTED_FILENAME = "타이타닉.csv";

type UploadOk = {
  kind: "ok";
  name: string;
  size: number;
  lineCount: number;
  nameMatches: boolean;
};

type UploadErr = { kind: "error"; message: string };

type Status = UploadOk | UploadErr | null;

function readCsvFile(file: File): Promise<UploadOk | UploadErr> {
  const lower = file.name.toLowerCase();
  if (!lower.endsWith(".csv")) {
    return Promise.resolve({
      kind: "error",
      message: "CSV 파일(.csv)만 업로드할 수 있습니다.",
    });
  }

  return file.text().then((text) => {
    const lines = text.length === 0 ? 0 : text.split(/\r?\n/).length;
    const nameMatches = file.name === EXPECTED_FILENAME;
    return {
      kind: "ok",
      name: file.name,
      size: file.size,
      lineCount: lines,
      nameMatches,
    };
  });
}

function isLocalDevHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

type TitanicCsvUploadSectionProps = {
  /**
   * true면 localhost + 경로(/) 제한을 건너뜁니다.
   * 타이타닉 전용 페이지에서 업로드 UI를 항상 보일 때 사용합니다.
   */
  bypassLocalGuard?: boolean;
};

export function TitanicCsvUploadSection({
  bypassLocalGuard = false,
}: TitanicCsvUploadSectionProps) {
  const pathname = usePathname();
  const [localRootOk, setLocalRootOk] = useState(false);

  useEffect(() => {
    if (bypassLocalGuard) {
      setLocalRootOk(true);
      return;
    }
    setLocalRootOk(
      pathname === "/" && isLocalDevHost(window.location.hostname),
    );
  }, [pathname, bypassLocalGuard]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

  const applyFile = useCallback(async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setStatus(null);
    try {
      const result = await readCsvFile(file);
      setStatus(result);
    } finally {
      setBusy(false);
    }
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    void applyFile(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    void applyFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDragOver(false);
  };

  if (!localRootOk) return null;

  return (
    <section
      id={bypassLocalGuard ? "titanic-csv-upload" : "titanic-csv"}
      className={cn(
        "border-b py-20",
        bypassLocalGuard
          ? "border-neutral-200 bg-neutral-50/40"
          : "border-border/50 bg-background",
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            타이타닉.csv 업로드
          </h2>
          <p className="mt-2 text-muted-foreground">
            파일 선택 또는 드래그 앤 드롭으로 CSV를 등록할 수 있습니다.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FolderOpen className="h-5 w-5 text-accent" />
                파일에서 선택
              </CardTitle>
              <CardDescription>
                버튼을 눌러 탐색기에서{" "}
                <span className="font-medium text-foreground">
                  {EXPECTED_FILENAME}
                </span>
                를 고릅니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={onInputChange}
                disabled={busy}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full border-border hover:bg-secondary"
                disabled={busy}
                onClick={() => inputRef.current?.click()}
              >
                CSV 파일 선택
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Upload className="h-5 w-5 text-accent" />
                드래그 앤 드롭
              </CardTitle>
              <CardDescription>
                CSV 파일을 아래 영역으로 끌어다 놓으면 업로드됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    inputRef.current?.click();
                  }
                }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={cn(
                  "flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors",
                  dragOver
                    ? "border-accent bg-accent/10"
                    : "border-border/80 bg-muted/20 hover:border-accent/50 hover:bg-muted/40",
                  busy && "pointer-events-none opacity-60",
                )}
                onClick={() => !busy && inputRef.current?.click()}
              >
                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  여기에 파일을 놓거나 클릭하여 선택
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {EXPECTED_FILENAME} 권장
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {status?.kind === "error" && (
          <p className="mt-6 text-center text-sm text-destructive">
            {status.message}
          </p>
        )}

        {status?.kind === "ok" && (
          <div className="mt-6 rounded-lg border border-border bg-muted/30 px-4 py-3 text-center text-sm text-foreground">
            <p className="font-medium">업로드 처리 완료</p>
            <p className="mt-1 text-muted-foreground">
              파일명: {status.name} · 크기: {(status.size / 1024).toFixed(1)}{" "}
              KB · 줄 수: {status.lineCount}
            </p>
            {!status.nameMatches && (
              <p className="mt-2 text-amber-600 dark:text-amber-500">
                권장 파일명은 <strong>{EXPECTED_FILENAME}</strong> 입니다.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

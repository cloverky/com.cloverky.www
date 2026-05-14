import { TitanicCsvUploadSection } from "@/components/titanic-csv-upload-section";

export default function TitanicPage() {
  return (
    <main className="min-h-screen bg-white pt-32 text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <h1 className="mb-12 text-center text-5xl font-bold tracking-tight md:text-7xl">
          타이타닉 홈
        </h1>
        <TitanicCsvUploadSection bypassLocalGuard />
      </div>
    </main>
  );
}

import { TitanicCsvUploadSection } from "@/components/titanic-csv-upload-section";

export default function LessonPage() {
  return (
    <main className="min-h-screen bg-background pt-24 text-foreground sm:pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-4xl px-4 pb-24 sm:px-6">
        <h1 className="mb-10 text-center text-4xl font-bold tracking-tight sm:mb-12 sm:text-5xl md:text-6xl">
          lesson
        </h1>
        <TitanicCsvUploadSection bypassLocalGuard splitDropAndButton />
      </div>
    </main>
  );
}

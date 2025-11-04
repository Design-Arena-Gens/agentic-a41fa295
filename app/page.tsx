import { fetchLatestNews } from "@/lib/fetchNews";
import { buildScriptBundle } from "@/lib/scriptBuilder";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  month: "short",
  day: "numeric",
  timeZoneName: "short"
});

function summarizeSnippet(snippet: string, fallback: string): string {
  if (snippet.length === 0) return fallback;
  const cleaned = snippet.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 240) return cleaned;
  return `${cleaned.slice(0, 237).trimEnd()}...`;
}

export default async function Page(): Promise<JSX.Element> {
  const latestNews = await fetchLatestNews();
  const bundle = buildScriptBundle(latestNews);
  const updatedAt = formatter.format(new Date());

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="gradient-border">
        <div className="relative overflow-hidden bg-slate-900/90 p-8">
          <div className="absolute inset-y-0 right-[-20%] h-full w-[60%] rotate-12 bg-gradient-to-br from-tech-blue/40 via-space-purple/40 to-pink-500/40 blur-3xl" />
          <div className="relative flex flex-col gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-fuchsia-300">
              TechSpace AI
            </span>
            <h1 className="text-4xl font-bold leading-tight text-slate-50 md:text-5xl">
              Daily Tech & Space News Short
            </h1>
            <p className="max-w-3xl text-base text-slate-300 md:text-lg">
              Autonomous briefing compiled from Google News within the past 24 hours. Perfect
              for a punchy YouTube Short under 60 seconds.
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Updated {updatedAt}
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="flex flex-col gap-5 rounded-3xl border border-white/5 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
          <div>
            <h2 className="text-xl font-semibold text-slate-50">Narration Script</h2>
            <p className="mt-2 text-sm text-slate-400">
              Ready to record. Runs under a minute at an energetic 150–160 wpm pace.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm leading-relaxed text-slate-200">
            {bundle.narration}
          </div>
        </article>

        <article className="flex flex-col gap-5 rounded-3xl border border-white/5 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
          <div>
            <h2 className="text-xl font-semibold text-slate-50">Publishing Toolkit</h2>
            <p className="mt-2 text-sm text-slate-400">
              Drop these into YouTube for title, hashtags, and visual direction.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Title
              </h3>
              <p className="mt-1 rounded-xl border border-white/10 bg-slate-950/60 p-4 text-slate-100">
                {bundle.title}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Hashtags
              </h3>
              <p className="mt-1 flex flex-wrap gap-2">
                {bundle.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Thumbnail Text
              </h3>
              <p className="mt-1 rounded-xl border border-white/10 bg-slate-950/60 p-4 text-slate-100">
                {bundle.thumbnailText}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Visual Prompts
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-sm text-slate-300">
                {bundle.visualPrompts.map((prompt, index) => (
                  <li key={`${prompt}-${index}`}>{prompt}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/5 bg-slate-900/80 p-6 shadow-xl shadow-black/30">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-50">Headline Rundown</h2>
          <span className="rounded-full bg-space-purple/30 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-fuchsia-200">
            {latestNews.length > 0 ? `${latestNews.length} stories` : "No fresh feeds"}
          </span>
        </div>

        {latestNews.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">
            Nothing breaking in the last 24 hours that matched the filters. Check back soon!
          </p>
        ) : (
          <ul className="mt-6 space-y-6">
            {latestNews.map((item) => (
              <li
                key={item.link}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                  <span className="rounded-full bg-tech-blue/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-tech-blue">
                    {item.source}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  {summarizeSnippet(
                    item.snippet,
                    "Fresh development with limited public details. Highlight key facts in narration."
                  )}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <span>
                    Published{" "}
                    {item.publishedAt.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                  <a
                    href={item.link}
                    className="rounded-full border border-tech-blue/40 bg-tech-blue/10 px-3 py-1 font-medium text-tech-blue transition hover:bg-tech-blue/20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source on Google News
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

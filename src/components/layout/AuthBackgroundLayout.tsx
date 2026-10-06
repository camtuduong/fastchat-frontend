import authBg from "@/assets/auth/auth-bg.png";

export default function AuthBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:bg-navbar bg-sidebar min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="border-border bg-card mx-auto flex min-h-[calc(100svh-2rem)] max-w-6xl overflow-hidden rounded-lg border shadow-[0_24px_70px_-35px_rgba(17,18,20,0.35)]">
        <aside className="bg-navbar relative hidden min-h-[620px] w-[46%] overflow-hidden md:block">
          <img
            src={authBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="bg-navbar/55 absolute inset-0" />
          <div className="relative flex h-full flex-col justify-between p-8 text-white lg:p-10">
            <div className="flex items-center gap-3">
              <span className="text-navbar flex size-9 items-center justify-center rounded-lg bg-white text-sm font-bold">
                F
              </span>
              <span className="text-lg font-semibold tracking-tight">
                FastChat
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-white/70">
              <span className="h-px w-8 bg-white/60" />
              PRIVATE CONVERSATIONS
            </div>
          </div>
        </aside>

        <main className="bg-background flex min-w-0 flex-1 items-center justify-center">
          <div className="w-full max-w-md px-6 py-4 sm:px-10 sm:py-6 lg:px-14">
            <div className="mb-5 flex items-center gap-3 md:hidden">
              <span className="bg-navbar flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white">
                F
              </span>
              <span className="text-foreground text-lg font-semibold tracking-tight">
                FastChat
              </span>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

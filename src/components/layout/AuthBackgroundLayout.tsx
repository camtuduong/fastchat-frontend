import authBg from "@/assets/auth/auth-bg.png";
export default function AuthBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-(--color-cream)">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-5xl rounded-lg bg-white p-1 shadow-lg">
          <div className="flex w-2/3 items-center justify-center">
            <img
              src={authBg}
              alt="Authentication Background"
              className="h-auto w-full rounded-lg object-contain"
            />
          </div>

          <div className="flex w-1/3 items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

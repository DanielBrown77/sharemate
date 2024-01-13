import Link from "next/link";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid place-items-center h-screen">{children}</div>
      <Link href="/">
        <div
          style={{ position: "absolute", top: "18px", right: "18px", cursor: "pointer" }}
          className="text-sm">
          취소
        </div>
      </Link>
    </>
  );
}

import AuthForm from "./auth-form";

export default function Home() {
  return (
    <div className="flex space-x-4" style={{ padding: "50px 0 100px 0" }}>
      <div className="basis-1/2">
        <h1 className="text-5xl font-extrabold dark:text-white py-2">Sharemate</h1>
        <p>
          쉐어하우스 멤버, 룸메이트와 함께 사용하는 공유 생활 관리 서비스. Sharemate로 편리하게 공동
          가계부, 일정 공유, 블로그 등 공유하세요.
        </p>
      </div>
      <div className="basis-1/2 auth-widget">
        <AuthForm />
      </div>
    </div>
  );
}

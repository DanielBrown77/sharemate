"use client";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function Space({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div id="space-content" className="w-full h-full grid place-content-center">
      <div className="flex flex-col gap-3 h-fit">
        <Button
          onClick={() => router.push("/onboarding")}
          label="Space 생성하기"
          severity="success"
        />
        <Button label="초대 알림 확인" severity="secondary" />
      </div>
    </div>
  );
}

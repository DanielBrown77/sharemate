"use client";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import SpaceNameForm from "./spacename-form";
import InviteForm from "./invite-form";

// declare types
type Values = {
  [key: string]: string;
};
type Content = {
  title: string;
  desc: string;
};
type Contents = {
  [key: string]: Content;
  name: Content;
  invite: Content;
};
const contents: Contents = {
  name: { title: "쉐어스페이스 생성", desc: "쉐어스페이스에 대한 상세 정보를 입력하세요." },
  invite: { title: "친구 초대하기", desc: "공동생활을 하고 있는 친구들을 초대하세요." },
};
//

export default function OnBoardingTemp({ session }: { session: Session | null }) {
  let stage: string = "name";
  const [values, setValues] = useState<Values | null>({});
  console.log("values :", values);

  if (values?.name) {
    stage = "invite";
  }

  const { title, desc } = contents[stage];

  return (
    <div>
      <div className="grid justify-items-center">
        <h4 className="text-2xl font-bold dark:text-white">{title}</h4>
        <p className="mb-3 text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
      {stage === "name" ? <SpaceNameForm setValues={setValues} /> : <InviteForm />}
    </div>
  );
}

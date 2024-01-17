"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createSpace(prevState: any, formData: FormData) {
  const value = formData.get("spacename");
  console.log(`space_name : ${value}`);

  if (value === "") return { message: "" };

  const schema = z
    .string({ required_error: "Name is required" })
    .min(3, { message: "최소 3자 이상의 이름으로 지어주세요." });

  const result = schema.safeParse(value);
  if (!result.success) {
    console.log(result.error.issues);
    const { message } = result.error.issues[0];
    return { message };
  }

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  try {
    const { data, error } = await supabase
      .from("spaces")
      .insert([
        {
          name: value,
          creator: user?.id as string,
        },
      ])
      .select();
    console.log("space 생성 성공 !");
    console.log(data);
    if (error) throw error;
  } catch (error) {
    console.log(error);
    return { code: "insert_err", message: "처리 중 문제 발생" };
  }

  redirect("/space");
}

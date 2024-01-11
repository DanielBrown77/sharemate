"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) console.log("error :", error);
  };

  return (
    <>
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        appearance={{ theme: ThemeSupa }}
        theme="default"
        showLinks={false}
        providers={[]}
        redirectTo="http://localhost:3000/auth/callback"
      />
      <Divider />
      <Button
        className="w-full"
        label="Google Login"
        size="small"
        icon="pi pi-google"
        onClick={googleLogin}
      />
    </>
  );
}

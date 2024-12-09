import { saveSession } from "@/utils/session";
import { redirect } from "next/navigation";

export async function LoginAction(formData: FormData) {
    'use server';
    const { email, password } = Object.fromEntries(formData);

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const { access_token } = await response.json();
        await saveSession(access_token);
        redirect('/doctors');
    }
}

export function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <form className="m-4 flex flex-col h-screen items-center justify-center p-4 w-full max-w-[400px]" action={LoginAction}>
        <div className="flex-col w-full ">
          <h1 className="text-2xl font-bold text-center">Hello there!</h1>
          <div className="flex-col w-full mt-6">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border p-4 rounded-lg "
              placeholder="user@exemple.com"
              type="email"
              name="email"
            />
          </div>
          <div className="flex-col w-full mt-6">
            <label className="block" htmlFor="email">
              Password
            </label>
            <input
              className="w-full border p-4 rounded-lg"
              placeholder="***********"
              type="password"
              name="password"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-foreground text-background p-4 rounded-lg bg-green-400 hover:bg-green-500 text-white font-bold"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

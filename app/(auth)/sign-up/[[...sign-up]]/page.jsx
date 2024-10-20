import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <SignUp appearance={{
          elements: {
            rootBox: "w-full",
            card: "shadow-none",
          },
        }} />
      </div>
    </div>
  );
}

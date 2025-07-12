"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import BeeMascot from "../../components/BeeMascot";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^@\s]+@[^@\s]+\.edu$/.test(email)) {
      setError("Please use a valid .edu email address.");
      return;
    }
    setLoading(true);
    const res = await signIn("email", { email, redirect: false, callbackUrl: "/dashboard" });
    setLoading(false);
    if (res?.error) {
      setError("Could not send sign-in link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campusYellow via-white to-campusBlue">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-campusBlue flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-campusYellow flex items-center justify-center shadow-md mb-2">
            <BeeMascot className="w-14 h-14" />
          </div>
          <h1 className="text-3xl font-extrabold text-campusBlue mb-1 text-center">Sign in to BorrowBuzz</h1>
          <p className="text-campusNavy text-center text-base mb-2">UMich students only. Use your <span className="font-bold">.edu</span> email to get a magic sign-in link.</p>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="youruniqname@umich.edu"
            className="border border-campusBlue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-campusYellow text-campusNavy"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-campusBlue text-white font-bold py-2 rounded hover:bg-campusNavy transition"
            disabled={loading}
          >
            {loading ? "Sending magic link..." : "Send Magic Link"}
          </button>
        </form>
        <div className="mt-6 text-campusBlue text-xs text-center">Need a whisk? List it in 30s after you sign in!<br />Go Blue! &mdash; BorrowBuzz</div>
      </div>
    </div>
  );
} 
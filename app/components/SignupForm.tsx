"use client";
import React, { useState } from "react";

const SignupForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^@\s]+@[^@\s]+\.edu$/.test(email)) {
      setError("Please use a valid .edu email address.");
      return;
    }
    setSuccess(true);
    // TODO: send to backend or mailing list
  };

  if (success) {
    return (
      <div className="text-center text-campusNavy">
        <div className="text-2xl font-bold mb-2">🎉 Thanks for signing up!</div>
        <div className="text-campusBlue">We'll let you know when BorrowBuzz launches at your campus.</div>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        className="border border-campusBlue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-campusYellow"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder=".edu Email Address"
        className="border border-campusBlue rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-campusYellow"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-campusBlue text-white font-bold py-2 rounded hover:bg-campusNavy transition"
      >
        Notify Me
      </button>
    </form>
  );
};

export default SignupForm; 
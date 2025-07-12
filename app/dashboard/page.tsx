import BeeMascot from "../components/BeeMascot";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-campusYellow/10">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border-t-8 border-campusBlue flex flex-col items-center">
        <BeeMascot className="w-16 h-16 mb-4" />
        <h1 className="text-2xl font-extrabold text-campusBlue mb-2 text-center">Welcome to your Dashboard!</h1>
        <p className="text-campusNavy mb-4 text-center">
          You’re signed in. Start listing, browsing, or booking items on campus.
        </p>
        <div className="text-campusBlue text-xs text-center">Go Blue! &mdash; BorrowBuzz</div>
      </div>
    </div>
  );
} 
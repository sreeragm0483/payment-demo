export default function Failure() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
        <h1 className="text-4xl font-bold mb-6 text-red-700">Failure</h1>
        <p className="text-lg text-red-600">Something went wrong with your donation. Please try again.</p>
        <a href="/donate" className="mt-4 text-blue-500 hover:underline">Try again</a>
      </div>
    );
  }
  
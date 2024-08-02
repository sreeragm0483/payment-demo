export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Success!</h1>
      <p className="text-lg text-green-600">Thank you for your donation!</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Go back to home
      </a>
    </div>
  );
}

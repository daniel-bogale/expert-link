import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hackaton</h1>
        <p className="text-xl mb-8">Your amazing application starts here</p>
        <div className="space-x-4">
          <Link 
            href="/login" 
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Health Dashboard</h1>
        <div>
          <a href="/login" className="text-blue-600 hover:underline mr-4">Login</a>
          <a href="/signup" className="text-blue-600 hover:underline">Signup</a>
        </div>
      </div>
    </nav>
  );
}
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Content area */}
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome! This is a placeholder. Next steps: list of applications + filters.
        </p>
      </main>
    </div>
  );
};

export default App;
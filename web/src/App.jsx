import Navbar from "./components/Navbar";
import ApplicationsPage from "./features/applications/pages/ApplicationsPage";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Content area */}
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <ApplicationsPage/>
      </main>
    </div>
  );
};

export default App;
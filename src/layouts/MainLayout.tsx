import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white">
            Desde el main layout
          </h1>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow-md">
        <Outlet />
      </main>
    </div>
  );
};

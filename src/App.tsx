import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import Dashboard from "./Features/Dashboard/Dashboard";
import FutureProjection from "./Features/FutureProjection/DashboardFutureProjection";
import Goals from "./Features/Goals/Goals";
import Reports from "./Features/Reports/Reports";
import AppSideBar from "./Features/SideBar/AppSideBar";
import { ToastContainer } from "./Features/Warnings/ToastContainer";

// Layout da pagina (Principal)
function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen ">
        <AppSideBar />
        <div className="flex-1 pb-20 ">
          <ToastContainer />
         
          <Outlet/>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Rotas que levam para as outras paginas
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard/>}/> 
          <Route path="/FutureProjection" element={<FutureProjection/>} />
          <Route path="/Comparison" element={<div className="text-white text-3xl m-10">em progresso...</div>} />
          <Route path="/Goals" element={<Goals/>} />
          <Route path="/Reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

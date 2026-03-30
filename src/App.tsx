import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";
import MainComparison from "./Features/Main/MainComparison";
import MainDashboard from "./Features/Main/MainDashboard";
import MainFutureProjection from "./Features/Main/MainFutureProjection";
import MainGoals from "./Features/Main/MainGoals";
import MainReports from "./Features/Main/MainReports";
import AppSideBar from "./Features/SideBar/AppSideBar";
import { ToastContainer } from "./Features/Warnings/ToastContainer";

// Layout da pagina (Principal)
function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen ">
        <AppSideBar />
        <div className="flex-1 pb-20 ">
          <ToastContainer />

          <Outlet />
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
          <Route index element={<MainDashboard />} />
          <Route path="/FutureProjection" element={<MainFutureProjection />} />
          <Route path="/Comparison" element={<MainComparison />} />
          <Route path="/Goals" element={<MainGoals />} />
          <Route path="/Reports" element={<MainReports />} />
        </Route>
      </Routes>
    </Router>
  );
}

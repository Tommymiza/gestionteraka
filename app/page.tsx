import MapInteractive from "@/components/carte";
import FormationDashboard from "@/components/dashboard/formation";
import Dashboard from "@/layout/Dashboard/Dashboard";

export default function Home() {
  return (
    <Dashboard>
      <MapInteractive />
      <FormationDashboard />
    </Dashboard>
  );
}

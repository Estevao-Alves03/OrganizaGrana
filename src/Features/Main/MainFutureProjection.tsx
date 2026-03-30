import DashboardFutureProjection from "../FutureProjection/DashboardFutureProjection";
import DividedExpenses from "../FutureProjection/DividedExpenses";
import ExtraExpenses from "../FutureProjection/ExtraExpenses";


export default function MainFutureProjection() {
  return (
    <div>
       <DashboardFutureProjection/>
       <ExtraExpenses/>
       <DividedExpenses/>
    </div>
  )
}
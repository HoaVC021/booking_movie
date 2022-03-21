// import Chart from "../../components/chart/Chart";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./dashboard.css";
import Chart from "../../components/Chart/Chart"
import {userData} from "../../dummyData";
import FeaturedInfo from "../../components/FeatureInfo/FeatureInfo";
// import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
export default function DashBoard() {
  return (
    <div className="dashboard">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      {/* <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div> */}
    </div>
  );
}

import { Route, Routes } from "react-router-dom";
import AnnouncementsTable from "./pages/announcementsTable/AnnouncementsTable";
import AnnouncementPage from "./pages/announcementPage/AnnouncementPage";
import { ROUTE_ANNOUNCEMENTS } from "./common/constants";

const AppRoots = () => {
  return (
    <Routes>
      <Route path={ROUTE_ANNOUNCEMENTS} element={<AnnouncementsTable />} />
      <Route path={`${ROUTE_ANNOUNCEMENTS}/:id`} element={<AnnouncementPage />} />
    </Routes>
  );
}
export default AppRoots
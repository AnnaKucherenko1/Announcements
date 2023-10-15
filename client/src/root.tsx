import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnouncementsTable from "./pages/announcementsTable/AnnouncementsTable";
import AnnouncementPage from "./pages/announcementPage/AnnouncementPage";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/announcements' element={<AnnouncementsTable />} />
        <Route path='/announcements/:id' element={<AnnouncementPage />} />
      </Routes>
    </Router>
  );
}
export default Root
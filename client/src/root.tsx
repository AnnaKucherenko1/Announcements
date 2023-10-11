import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnouncementsTable from "./pages/announcementsTable/AnnouncementsTable";
import Announcement from "./pages/announcement/Announcement";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AnnouncementsTable />} />
        <Route path='/announcements/:id' element={<Announcement />} />
      </Routes>
    </Router>
  );
}
export default Root
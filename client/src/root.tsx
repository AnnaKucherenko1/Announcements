import { Route, Routes } from "react-router-dom";
import Announcement from "./pages/announcement/Announcement";
import AnnouncementsTable from "./pages/announcementsTable/AnnouncementsTable";

const Root = () => {
  return (
    <Routes>
      <Route path='/' element={<AnnouncementsTable />} />
      <Route path='/announcements/:id' element={<Announcement />} />
    </Routes>
  )
}
export default Root
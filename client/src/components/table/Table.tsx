import { useNavigate } from "react-router-dom";
import { Data } from "../../types";
import { LiaPenSolid } from 'react-icons/lia';
import { useAnnouncementContext } from "../../hooks/contextHook";
import { useCallback } from "react";
import { formatDate, formatDateAndTime } from "../../common/utils";
import './table.css'
import { ROUTE_ANNOUNCEMENTS } from "../../common/constants";

type TableProps = {
  currentItems: Data[];
}
const Table: React.FC<TableProps> = ({ currentItems }) => {
  const navigate = useNavigate();
  const announcementContext = useAnnouncementContext();

  const handleEditClick = useCallback((id: number, announcement: Data) => {
    if (!announcementContext) {
      return;
    }

    (announcementContext.setSelectedAnnouncement as (announcement: Data | null) => void)(announcement);
    navigate(`${ROUTE_ANNOUNCEMENTS}/${id}`);
  }, [announcementContext, navigate]);

  if (!announcementContext) {
    return null;
  }

  return (
    <table className="table-style">
      <thead>
        <tr className="td-style">
          <th className="th-style">Title</th>
          <th className="th-style">Publication date</th>
          <th className="th-style">Last update</th>
          <th className="th-style">Categories</th>
          <th className="th-style"></th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((announcement: Data) => (
          <tr key={announcement._id} className="td-style">
            <td className="td-text-style">{announcement.title}</td>
            <td className="td-text-style">{formatDateAndTime(announcement.publicationDate)}</td>
            <td className="td-text-style">{formatDate(announcement.lastUpdate)}</td>
            <td className="td-text-style">{announcement.categories.join(', ')}</td>
            <td className="pen" onClick={() => handleEditClick(announcement._id as number, announcement)}><LiaPenSolid /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default Table
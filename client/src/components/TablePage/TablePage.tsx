import { useNavigate } from "react-router-dom";
import { Data } from "../../types";
import { LiaPenSolid } from 'react-icons/lia';
import { useAnnouncementContext } from "../../hooks/contextHook";
import { useCallback } from "react";

type TablePageProps = {
  currentItems: Data[];
}
const TablePage: React.FC<TablePageProps> = ({ currentItems }) => {
  const navigate = useNavigate();
  const announcementContext = useAnnouncementContext();

  const handleEditClick = useCallback((id: number) => {
    if (!announcementContext) {
      return;
    }

    const selectedAnnouncement = currentItems.find((announcement) => announcement.id === id);

    if (selectedAnnouncement) {
      (announcementContext.setSelectedAnnouncement as (announcement: Data | null) => void)(selectedAnnouncement);
    }
    navigate(`/announcements/${id}`);
  }, [currentItems, announcementContext, navigate]);

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
          <tr key={announcement.id} className="td-style">
            <td className="td-text-style">{announcement.title}</td>
            <td className="td-text-style">{announcement.publicationDate}</td>
            <td className="td-text-style">{announcement.lastUpdate}</td>
            <td className="td-text-style">{announcement.categories.join(', ')}</td>
            <td onClick={() => handleEditClick(announcement.id as number)}><LiaPenSolid /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default TablePage
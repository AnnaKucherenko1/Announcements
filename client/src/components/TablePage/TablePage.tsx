import { useNavigate } from "react-router-dom";
import { Data } from "../../types";
import { LiaPenSolid } from 'react-icons/lia';

type TablePageProps = {
  currentItems: Data[];
}
const TablePage: React.FC<TablePageProps> = ({ currentItems }) => {
  const navigate = useNavigate()
  const handleEditClick = (id: number) => {
    navigate(`/announcements/${id}`)
  }
  return (
    <table className="table-style">
      <thead>
        <tr className="td-style">
          <th className="th-style">Title</th>
          <th className="th-style">Publication Date</th>
          <th className="th-style">Last Update</th>
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
            <td onClick={() => handleEditClick(announcement.id)}><LiaPenSolid /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default TablePage
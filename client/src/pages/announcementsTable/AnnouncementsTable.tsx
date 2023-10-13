import { useEffect, useState } from 'react';
import { fetchData } from '../../services';
import './announcementsTable.css';
import TablePage from '../../components/tablePage/TablePage';
import { Data } from '../../types';

const AnnouncementsTable = () => {
  const [announcements, setAnnouncements] = useState<Data[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function apiCall() {
      try {
        const data = await fetchData();
        setAnnouncements(data);
      } catch (error) {
        //TODO: add toast with error
      }
    }

    apiCall();
  }, []);

  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = announcements.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <h2 className='title'>Announcements</h2>

      <TablePage currentItems={currentItems} />
      <div className='td-style btns'>
        <div className='span-text'>
          Page {currentPage} of {totalPages}
        </div>
        <button className='button' onClick={handlePrevPage} disabled={currentPage === 1}>
          {`<`}
        </button>
        <button className='button' onClick={handleNextPage} disabled={currentPage === totalPages}>
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsTable;

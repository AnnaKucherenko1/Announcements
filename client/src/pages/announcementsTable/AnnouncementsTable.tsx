import { useEffect, useMemo, useState } from 'react';
import './announcementsTable.css';
import TablePage from '../../components/tablePage/TablePage';
import { Data } from '../../types';
import {
  GET_ANNOUNCEMENTS,
  GET_NUMBER_OF_ALL,
} from '../../graphql/queriesDeclarations';
import { useQuery } from '@apollo/client';
import ToastError from '../../components/modalError/ModalError';

const AnnouncementsTable = () => {
  const [announcements, setAnnouncements] = useState<Data[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { loading, error, data } = useQuery(GET_ANNOUNCEMENTS, {
    variables: { page: currentPage, perPage: itemsPerPage },
  });
  const { data: numberOfAllData } = useQuery(GET_NUMBER_OF_ALL);

  useEffect(() => {
    if (data) {
      setAnnouncements(data.getAnnouncementsByPage);
    }
    if (error) {
      setModalOpen(true);
      setToastMessage(`${error.message}. Please try again.`);
    }
  }, [data, currentPage, error]);


  const totalPages = useMemo(() => {
    return numberOfAllData?.getNumberOfAll
      ? Math.ceil(numberOfAllData.getNumberOfAll / itemsPerPage)
      : 1;
  }, [numberOfAllData, itemsPerPage]);

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

      {loading ? (
        <div className='loading-indicator'>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <TablePage currentItems={announcements} />
          <div className='td-style btns'>
            <div className='span-text'>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className='button'
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            <button
              className='button'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </button>
          </div>
        </>
      )}
      {modalOpen && (
        <ToastError
          modalOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          toastMessage={toastMessage}
        />
      )}
    </div>
  );
};

export default AnnouncementsTable;

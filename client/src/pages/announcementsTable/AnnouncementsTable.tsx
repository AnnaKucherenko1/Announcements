import { useEffect, useMemo, useState } from 'react';
import './announcementsTable.css';
import Table from '../../components/table/Table';
import { Data } from '../../types';
import {
  GET_ANNOUNCEMENTS,
  GET_NUMBER_OF_ALL,
} from '../../graphql/queriesDeclarations';
import { useQuery } from '@apollo/client';
import ToastError from '../../components/modalError/ModalError';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '../../common/constants';

const AnnouncementsTable = () => {
  const [announcements, setAnnouncements] = useState<Data[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const { loading, error, data } = useQuery(GET_ANNOUNCEMENTS, {
    variables: { page: currentPage, perPage: ITEMS_PER_PAGE },
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
      ? Math.ceil(numberOfAllData.getNumberOfAll / ITEMS_PER_PAGE)
      : 1;
  }, [numberOfAllData]);

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
          <Table currentItems={announcements} />
          <div className='btns'>
            <div className='span-text'>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className={`buttonNextss ${currentPage === FIRST_PAGE ? 'disabled' : 'button'}`}
              onClick={handlePrevPage}
            >
              {'<'}
            </button>
            <button
              className={`buttonNextss ${currentPage === totalPages ? 'disabled' : 'button'}`}
              onClick={handleNextPage}
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

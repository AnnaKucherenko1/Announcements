import { useAnnouncementContext } from '../../hooks/contextHook';
import Select from 'react-select';
import './announcementPage.css';
import { useEffect, useState } from 'react';
import ToastError from '../../components/modalError/ModalError';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_ANNOUNCEMENT } from '../../graphql/queriesDeclarations';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_ANNOUNCEMENT } from '../../graphql/mutationDeclarations';

import { CATEGORY_OPTIONS, REGEX_INPUT_FORMAT, ROUTE_ANNOUNCEMENTS } from '../../common/constants';
import { Category, FormValues } from '../../types';
import { formatDateTo_MM_DD_YYYY, toISOString, validateForm } from '../../common/utils';


const AnnouncementPage = () => {
  const selectedAnnouncement = useAnnouncementContext();
  const announcement = selectedAnnouncement?.selectedAnnouncement;
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANNOUNCEMENT, {
    variables: { _id: id },
    fetchPolicy: 'no-cache',
  });
  const [formValues, setFormValues] = useState<FormValues>({
    title: announcement?.title || '',
    content: '',
    categories:
      announcement?.categories.map((category: string) => {
        return {
          label: category,
          value: category,
        };
      }) ?? [],
    publicationDate: formatDateTo_MM_DD_YYYY(announcement?.publicationDate as string) || '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [editAnnouncement] = useMutation(EDIT_ANNOUNCEMENT);
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !error && data) {
      setFormValues((prevValues) => ({
        ...prevValues,
        content: data.getAnnouncement.content,
      }));
    }
  }, [loading, error, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'publicationDate') {
      if (REGEX_INPUT_FORMAT.test(value)) {
        setFormValues({
          ...formValues,
          [name]: value,
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (newValue: Category[]) => {
    setFormValues({
      ...formValues,
      categories: newValue,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const saveChanges = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    const { hasError, errors } = validateForm(formValues);

    if (!hasError) {
      handleEditAnnouncement(formValues)
    } else {
      const errorMessages = Object.values(errors).filter(
        (error) => error !== ''
      );
      const errorMessage = errorMessages.join('; ');
      showErrorToUser(errorMessage);
    }
  };

  const handleEditAnnouncement = async (formValues: FormValues) => {
    try {
      const now = new Date();
      const categoryValues = formValues.categories.map((category) => category.value);

      await editAnnouncement({
        variables: {
          _id: id,
          updatedAnnouncement: {
            title: formValues.title,
            content: formValues.content,
            categories: categoryValues,
            publicationDate: toISOString(formValues.publicationDate),
            lastUpdate: now.toISOString(),
          },
        },
      });

      navigate(ROUTE_ANNOUNCEMENTS)
      console.log('Announcement edited successfully');

    } catch (error) {
      showErrorToUser('Error editing announcement, please try again');
      console.error('Error editing announcement', error);
    }
  };

  const showErrorToUser = (message: string) => {
    setToastMessage(message);
    setModalOpen(true);
  };

  return (
    <div className='form'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='container'>
          <h2 className='title-announcement'>Edit the announcement</h2>
          <form onSubmit={saveChanges}>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label fw-bold'>
                Title
              </label>
              <input
                type='text'
                value={formValues.title}
                name='title'
                id='title'
                className='form-control'
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='content' className='form-label fw-bold'>
                Content
              </label>
              <textarea
                name='content'
                value={formValues.content}
                id='content'
                className='form-control'
                style={{ height: '35vh', resize: 'none' }}
                onChange={handleTextareaChange}
              ></textarea>
            </div>
            <div className='mb-3'>
              <label htmlFor='categories' className='form-label fw-bold'>
                Category
              </label>
              <p className='description'>Select category so readers know what your announcement is about.</p>
              <Select
                options={CATEGORY_OPTIONS}
                isMulti
                defaultValue={formValues.categories}
                onChange={(e) => handleCategoryChange(e as Category[])}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='publicationDate' className='form-label fw-bold'>
                Publication Date
              </label>
              <input
                type='text'
                value={formValues.publicationDate}
                name='publicationDate'
                id='publicationDate'
                className='form-control'
                onChange={handleInputChange}
              />
            </div>
            <button
              type='submit'
              className='btn float-end btn-style'
              style={{ borderRadius: '40px', backgroundColor: 'rgb(255,182,74)' }}
            >
              Publish
            </button>
          </form>
        </div>
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

export default AnnouncementPage;

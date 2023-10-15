import { useAnnouncementContext } from '../../hooks/contextHook';
import Select from 'react-select';
import './announcementPage.css';
import { useEffect, useState } from 'react';
import ToastError from '../../components/modalError/ModalError';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_ANNOUNCEMENT } from '../../graphql/queriesDeclarations';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_ANNOUNCEMENT } from '../../graphql/mutationDeclarations';
import { CATEGORY_OPTIONS } from '../../common/constants';
import { FormValues, NewErrors } from '../../types';
import { formatDateTo_MM_DD_YYYY, toISOString } from '../../common/utils';


const AnnouncementPage = () => {
  const selectedAnnouncement = useAnnouncementContext();
  const announcement = selectedAnnouncement?.selectedAnnouncement;
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANNOUNCEMENT, {
    variables: { _id: id },
  });
  const [formValues, setFormValues] = useState({
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
  const [errors, setErrors] = useState({});
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

  const validateForm = (values: FormValues) => {
    const newErrors: NewErrors = {
      title: '',
      content: '',
      categories: '',
      publicationDate: '',
    };
    if (!values.title) {
      newErrors.title = 'Title is required';
    }
    if (!values.content) {
      newErrors.content = 'Content is required';
    }
    if (values.categories.length === 0) {
      newErrors.categories = 'Select at least one category';
    }
    if (!/^\d{1,2}\/\d{1,2}\/\d{4} \d{2}:\d{2}$/.test(values.publicationDate)) {
      newErrors.publicationDate =
        'Publication Date must be in the format DD/MM/YYYY HH:mm';
    }
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  // useEffect(() => {
  //   validateForm(formValues);
  // }, [formValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'publicationDate') {
      if (/^\d{0,2}\/\d{0,2}\/\d{0,4} \d{0,2}:\d{0,2}$/.test(value)) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCategoryChange = (newValue: any) => {
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
    const isFormValid = validateForm(formValues);

    if (isFormValid) {
      handleEditAnnouncement(formValues)

    } else {
      const errorMessages = Object.values(errors).filter(
        (error) => error !== ''
      );
      const errorMessage = errorMessages.join('\n');
      setToastMessage(errorMessage);
      setModalOpen(true);
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

      navigate('/announcements')
      console.log('Announcement edited successfully');

    } catch (error) {
      console.error('Error editing announcement', error);
    }
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
                onChange={handleCategoryChange}
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

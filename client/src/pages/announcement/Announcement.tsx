import { useAnnouncementContext } from '../../hooks/contextHook';
import Select from 'react-select';
import './announcement.css';
import { useState } from 'react';

const categoryOptions = [
  { label: 'City', value: 'City' },
  { label: 'Culture', value: 'Culture' },
  { label: 'Community Events', value: 'Community Events' },
  { label: 'Kids & Family', value: 'Kids & Family' },
  { label: 'Crime & Safety', value: 'Crime & Safety' },
  { label: 'Emergencies', value: 'Emergencies' },
  { label: 'Discounts & Benefits', value: 'Discounts & Benefits' },
  { label: 'For Seniors', value: 'For Seniors' },
  { label: 'Health', value: 'Health' },
];

const Announcement = () => {
  const selectedAnnouncement = useAnnouncementContext();
  const announcement = selectedAnnouncement?.selectedAnnouncement;
  const [formValues, setFormValues] = useState({
    title: announcement?.title || '',
    content: announcement?.content || '',
    categories: announcement?.categories.map((category: string) => {
      return {
        label: category,
        value: category,
      };
    }) ?? [],
    publicationDate: announcement?.publicationDate || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
    console.log('saved');
  };

  return (
    <div className='form'>
      <div className='container'>
        <h1 className='mt-5'>Edit the announcement</h1>
        <form onSubmit={saveChanges}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
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
            <label htmlFor='content' className='form-label'>
              Content
            </label>
            <textarea
              name='content'
              value={formValues.content}
              id='content'
              className='form-control'
              style={{ height: '40vh', resize: 'none' }}
              onChange={handleTextareaChange}
            ></textarea>
          </div>
          <div className='mb-3'>
            <label htmlFor='categories' className='form-label'>
              Categories
            </label>
            <Select
              options={categoryOptions}
              isMulti
              defaultValue={formValues.categories}
              onChange={handleCategoryChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='publicationDate' className='form-label'>
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
            className='btn btn-warning float-end btn-style'
            style={{ borderRadius: '40px' }}
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Announcement;

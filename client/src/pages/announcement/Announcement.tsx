import { useAnnouncementContext } from '../../hooks/contextHook';
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldInputProps,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import './announcement.css';
import { optiontype } from '../../types';

const categoryOptions: readonly optiontype[] = [
  { label: 'City', value: 'city' },
  { label: 'Culture', value: 'culture' },
  { label: 'Community Events', value: 'community-events' },
  { label: 'Kids & Family', value: 'kids-family' },
  { label: 'Crime & Safety', value: 'crime-safety' },
  { label: 'Emergencies', value: 'emergencies' },
  { label: 'Discounts & Benefits', value: 'discounts-benefits' },
  { label: 'For Seniors', value: 'for-seniors' },
  { label: 'Health', value: 'health' },
];

const Announcement = () => {
  const selectedAnnouncement = useAnnouncementContext();
  console.log(selectedAnnouncement);
  const announcement = selectedAnnouncement?.selectedAnnouncement;
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    publicationDate: Yup.string().required('Publication Date is required'),
    lastUpdate: Yup.string().required('Last Update is required'),
    categories: Yup.array().min(1, 'Select at least one category'),
    content: Yup.string().required('Content is required'),
  });
  const saveChanges = (data: {
    categories: (optiontype | null)[];
    title: string;
    publicationDate: string;
    lastUpdate: string;
    content: string;
  }) => {
    console.log(data);
    // const updatedAnnouncement = {
    //   ...announcement,
    //   title,
    //   publicationDate,
    //   lastUpdate ===> today date,
    //   categories: selectedCategories,
    //   content,
    // };
  };

  return (
    <div className='form'>
      <div className='container'>
        <h1 className='mt-5'>Edit the announcement</h1>
        <Formik
          initialValues={{
            title: announcement?.title || '',
            publicationDate: announcement?.publicationDate || '',
            lastUpdate: announcement?.lastUpdate || '',
            categories: announcement?.categories
              ? announcement.categories.map((category: string | null) => {
                if (category === null) {
                  return null;
                }
                const selectedOption = categoryOptions.find(
                  (option) => option.value === category
                );
                return selectedOption ? selectedOption : null;
              })
              : [],
            content: announcement?.content || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const filteredCategories = values.categories.filter(
              (category) => category !== null
            );
            saveChanges({ ...values, categories: filteredCategories });
          }}
        >
          {() => (
            <Form>
              <div className='mb-3'>
                <label htmlFor='title' className='form-label'>
                  Title
                </label>
                <Field
                  type='text'
                  name='title'
                  id='title'
                  className='form-control'
                />
                <ErrorMessage name='title' component='div' className='error' />
              </div>
              <div className='mb-3'>
                <label htmlFor='content' className='form-label'>
                  Content
                </label>
                <Field
                  as='textarea'
                  name='content'
                  id='content'
                  className='form-control'
                  style={{
                    height: '40vh',
                    resize: 'none',
                  }}
                />
                <ErrorMessage
                  name='content'
                  component='div'
                  className='error'
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='categories' className='form-label'>
                  Categories
                </label>
                <Field name='categories'>
                  {({
                    field,
                    form,
                  }: {
                    field: FieldInputProps<string[]>;
                    form: FormikProps<string[]>;
                  }) => {
                    const initialSelectedOptions = announcement?.categories
                      ? announcement.categories.map(
                        (category: string | null) => {
                          if (category === null) {
                            return null;
                          }
                          const selectedOption = categoryOptions.find(
                            (option) => option.value === category
                          );
                          return selectedOption ? selectedOption : null;
                        }
                      )
                      : [];

                    const selectedOptions = (
                      field.value || initialSelectedOptions
                    ).map((category: string) => {
                      const selectedOption = categoryOptions.find(
                        (option) => option.value === category
                      );
                      return selectedOption ? selectedOption : null;
                    });

                    return (
                      <Select
                        {...field}
                        options={categoryOptions}
                        isMulti
                        value={selectedOptions}
                        onChange={(selectedOptions) =>
                          form.setFieldValue(
                            'categories',
                            selectedOptions.map((option) => option?.value)
                          )
                        }
                      />
                    );
                  }}
                </Field>
                <div className='mb-3'>
                  <label htmlFor='publicationDate' className='form-label'>
                    Publication Date
                  </label>
                  <Field
                    type='text'
                    name='publicationDate'
                    id='publicationDate'
                    className='form-control'
                  />
                  <ErrorMessage
                    name='publicationDate'
                    component='div'
                    className='error'
                  />
                </div>
                <ErrorMessage
                  name='categories'
                  component='div'
                  className='error'
                />
              </div>

              <button
                type='submit'
                className='btn btn-warning float-end btn-style'
                style={{ borderRadius: '40px' }}
              >
                Publish
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Announcement;

import { describe, test, expect } from '@jest/globals';
import { formatDateAndTime, formatDate, formatDateTo_MM_DD_YYYY, toISOString, validateForm } from './utils';

describe('Date Formatting Functions', () => {
  test('formatDateAndTime should format date and time', () => {
    const isoDateString = '2023-08-11T04:58:00';
    const formatted = formatDateAndTime(isoDateString);
    expect(formatted).toBe('Aug 11, 2023 04:58');
  });

  test('formatDate should format date', () => {
    const isoDateString = '2023-08-11T04:58:00';
    const formatted = formatDate(isoDateString);
    expect(formatted).toBe('Aug 11, 2023');
  });

  test('formatDateTo_MM_DD_YYYY should format date to MM/DD/YYYY HH:mm', () => {
    const inputDate = '08/11/2023 04:58';
    const formatted = formatDateTo_MM_DD_YYYY(inputDate);
    expect(formatted).toBe('08/11/2023 04:58');
  });

  test('toISOString should convert formatted date to ISO string', () => {
    const inputDate = '02/25/2023 11:50';
    const isoString = toISOString(inputDate);
    expect(isoString).toBe('2023-02-25T10:50:00.000Z');
  });
});

describe('Form Validation Function', () => {
  test('validateForm should return no errors for valid input', () => {
    const validInput = {
      title: 'Valid Title',
      content: 'Valid Content',
      categories: [{ label: 'Category', value: 'Category' }],
      publicationDate: '01/01/2023 12:00',
    };

    const { hasError, errors } = validateForm(validInput);

    expect(hasError).toBe(false);
    expect(errors).toEqual({
      title: '',
      content: '',
      categories: '',
      publicationDate: '',
    });
  });

  test('validateForm should return errors for missing or invalid input', () => {
    const invalidInput = {
      title: '',
      content: '',
      categories: [],
      publicationDate: 'invalid_date_format',
    };

    const { hasError, errors } = validateForm(invalidInput);

    expect(hasError).toBe(true);
    expect(errors).toEqual({
      title: 'Title is required',
      content: 'Content is required',
      categories: 'Select at least one category',
      publicationDate: 'Publication Date must be in the format DD/MM/YYYY HH:mm',
    });
  });
});
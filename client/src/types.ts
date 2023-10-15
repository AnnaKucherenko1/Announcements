export type Data = {
  title: string,
  publicationDate: string,
  lastUpdate: string,
  categories: string[],
  content: string,
  _id?: number
}
export type optionType = {
  value: string;
  label: string;
};

export type Category = {
  label: string; 
  value: string;
}

export type FormValues = {
  title: string; 
  content: string; 
  categories: Category[]; 
  publicationDate: string;
}

export type NewErrors = {
  title: string;
  content: string;
  categories: string;
  publicationDate: string;
}
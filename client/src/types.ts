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
export type FormValues = {
  title: string; 
  content: string; 
  categories: { label: string; value: string; }[]; 
  publicationDate: string;
}
export type NewErrors = {
  title: string;
  content: string;
  categories: string;
  publicationDate: string;
}
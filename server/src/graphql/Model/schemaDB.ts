import { Document } from 'mongoose';
import mongoose from './db';
import { ObjectId } from 'mongodb';

export type AnnouncementType = Document & {
  _id: ObjectId;
  title: string;
  publicationDate: string | null;
  lastUpdate: string | null;
  categories: string[];
  content: string;
};

const announcementSchema = new mongoose.Schema<AnnouncementType>({
  title: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    default: null,
    required: false,
  },
  lastUpdate: {
    type: String,
    default: null,
    required: false,
  },
  categories: {
    type: [String],
    default: [],
    required: true,
  },
  content: {
    type: String,
    default: null,
    required: true,
  },
});

export const Announcement = mongoose.model('Announcement', announcementSchema);
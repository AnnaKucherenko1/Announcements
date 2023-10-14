

import { Announcement } from './schemaDB';

async function getAnnouncementsByPage(page: number, perPage: number) {
  try {
    const skip = (page - 1) * perPage;
    const announcements = await Announcement.find({}).skip(skip).limit(perPage);

    return announcements;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export { getAnnouncementsByPage };
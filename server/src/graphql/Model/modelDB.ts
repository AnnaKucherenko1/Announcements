

import { Announcement } from './schemaDB';

async function getAnnouncement(_id: string) {
  try {
    const announcement = await Announcement.findById(_id);
    return announcement;
  } catch (error) {
    console.error(error);
    return error;
  }
};

async function getAnnouncementsByPage(page: number, perPage: number) {
  try {
    const skip = (page - 1) * perPage;
    const announcements = await Announcement.find({})
      .sort({ id: 1 }) 
      .skip(skip)
      .limit(perPage);

    return announcements;
  } catch (error) {
    console.error(error);
    return error;
  }
};

async function getNumberOfAll() {
  try {
    const count = await Announcement.countDocuments({});
    return count;
  } catch (error) {
    console.error(error);
    return error;
  }
};

async function editAnnouncement(_id: string, updatedAnnouncement: any) {
  try {
    const announcement = await Announcement.findByIdAndUpdate(_id, updatedAnnouncement, { new: true });
    if (!announcement) {
      return {
        success: false,
        message: 'Announcement not found',
        updatedAnnouncement: null,
      };
    }
    updatedAnnouncement._id = _id;
    return {
      success: true,
      message: 'Announcement updated successfully',
      updatedAnnouncement: updatedAnnouncement,
    };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export { getAnnouncementsByPage, getNumberOfAll, getAnnouncement, editAnnouncement};
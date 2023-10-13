import { useContext } from "react";
import { AnnouncementContext } from "../context/AnnouncementProvider";

export const useAnnouncementContext = () => {
  const context = useContext(AnnouncementContext);

  if (context === undefined) {
    throw new Error('useAnnouncementContext must be used within an AnnouncementProvider');
  }

  return context;
};
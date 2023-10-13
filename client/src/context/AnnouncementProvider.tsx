import React, { ReactNode, createContext, useState } from 'react';
import { Data } from '../types';

type AnnouncementContextData = {
  selectedAnnouncement: Data | null;
  setSelectedAnnouncement: ((announcement: Data | null) => void) | undefined;
}

export const AnnouncementContext = createContext<AnnouncementContextData | null>(null);

export const AnnouncementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Data | null>(null);

  return (
    <AnnouncementContext.Provider value={{ selectedAnnouncement, setSelectedAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

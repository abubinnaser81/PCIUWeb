import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { DepartmentContent } from '@/hooks/useDepartmentContent';

interface EditModeContextType {
  isEditMode: boolean;
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  content: DepartmentContent;
  updateContent: (section: string, value: any) => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({
  children,
  content,
  onContentChange,
}: {
  children: ReactNode;
  content: DepartmentContent;
  onContentChange: (section: string, value: any) => void;
}) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode: true,
        activeSection,
        setActiveSection,
        content,
        updateContent: onContentChange,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

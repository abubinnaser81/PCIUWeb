import { ReactNode, useRef, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableSectionProps {
  sectionKey: string;
  label: string;
  children: ReactNode;
}

export default function EditableSection({ sectionKey, label, children }: EditableSectionProps) {
  const editMode = useEditMode();
  if (!editMode) return <>{children}</>;

  const { activeSection, setActiveSection } = editMode;
  const isActive = activeSection === sectionKey;

  return (
    <div
      className={cn(
        'relative group transition-all duration-200',
        'hover:outline hover:outline-2 hover:outline-primary/50 hover:outline-offset-2 rounded-sm',
        isActive && 'outline outline-2 outline-primary outline-offset-2'
      )}
    >
      {/* Hover label */}
      <div
        className={cn(
          'absolute -top-7 left-2 z-50 flex items-center gap-1.5 px-2 py-1 rounded-t-md text-xs font-medium cursor-pointer transition-opacity',
          'bg-primary text-primary-foreground shadow-md',
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
        onClick={(e) => {
          e.stopPropagation();
          setActiveSection(isActive ? null : sectionKey);
        }}
      >
        <Pencil className="h-3 w-3" />
        {label}
      </div>
      {children}
    </div>
  );
}

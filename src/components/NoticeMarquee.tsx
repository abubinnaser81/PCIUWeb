import { useState } from "react";
import { X, AlertCircle, Calendar, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const notices = [
  {
    type: "Deadline",
    icon: AlertCircle,
    text: "Tuition fee payment due: 30 Oct 2025",
    color: "destructive",
  },
  {
    type: "Exam",
    icon: GraduationCap,
    text: "Midterm schedule published for Fall 2025",
    color: "accent",
  },
  {
    type: "Holiday",
    icon: Calendar,
    text: "Campus closed on Victory Day",
    color: "secondary",
  },
];

const NoticeMarquee = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-accent text-accent-foreground py-3 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <Link 
            to="/notices" 
            className="font-semibold text-sm uppercase tracking-wide whitespace-nowrap hover:underline"
          >
            Notices
          </Link>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-8 animate-slide-in">
              {notices.map((notice, index) => {
                const Icon = notice.icon;
                return (
                  <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                    <Badge
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white font-medium"
                    >
                      {notice.type}
                    </Badge>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{notice.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss notices"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeMarquee;

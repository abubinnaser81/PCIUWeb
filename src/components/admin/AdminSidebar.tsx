import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  ExternalLink,
  Image,
  Activity,
  LayoutTemplate,
  GraduationCap,
  Newspaper,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const navItems = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Homepage', href: '/admin/homepage', icon: Home },
  { title: 'Faculty', href: '/admin/faculty', icon: GraduationCap },
  { title: 'News.com', href: '/admin/journal', icon: Newspaper },
  { title: 'Pages', href: '/admin/pages', icon: FileText },
  { title: 'Media', href: '/admin/media', icon: Image },
  { title: 'Templates', href: '/admin/templates', icon: LayoutTemplate },
  { title: 'Activity', href: '/admin/activity', icon: Activity },
  { title: 'Users', href: '/admin/users', icon: Users },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut, user } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-primary text-primary-foreground flex flex-col transition-all duration-300 border-r border-primary-foreground/10",
        collapsed ? "w-[68px]" : "w-60"
      )}
    >
      {/* Header */}
      <div className="p-3 border-b border-primary-foreground/10 flex items-center justify-between min-h-[60px]">
        {!collapsed && (
          <div className="overflow-hidden">
            <h2 className="font-bold text-sm tracking-wide">PCIU Admin</h2>
            <p className="text-[10px] text-primary-foreground/60 truncate">{user?.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-primary-foreground hover:bg-primary-foreground/10 h-8 w-8 flex-shrink-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href ||
            (item.href !== '/admin' && location.pathname.startsWith(item.href));

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-sm",
                isActive
                  ? "bg-primary-foreground/15 text-primary-foreground font-medium"
                  : "text-primary-foreground/65 hover:bg-primary-foreground/8 hover:text-primary-foreground"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-primary-foreground/10 space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-primary-foreground/65 hover:bg-primary-foreground/8 hover:text-primary-foreground transition-colors",
            collapsed && "justify-center"
          )}
        >
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span>View Site</span>}
        </a>
        <Button
          variant="ghost"
          onClick={signOut}
          className={cn(
            "w-full justify-start text-primary-foreground/65 hover:bg-primary-foreground/8 hover:text-primary-foreground h-9 text-sm",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span className="ml-2.5">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}

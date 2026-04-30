import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  BarChart2, 
  Settings, 
  Layers, 
  Bell,
  Search,
  ChevronDown,
  LayoutGrid,
  Menu,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, collapsed = false, onToggleCollapse }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Financial Analysis', id: 'financial-analysis', active: true },
    { icon: BarChart2, label: 'Market Comps', id: 'market-comps' },
    { icon: Layers, label: 'Report', id: 'report' },
  ];

  return (
    <div className={`${collapsed ? 'w-16' : 'w-60'} flex flex-col py-4 bg-[#1e2d24] text-white/70 h-full z-50 transition-all duration-300 border-r border-white/10 ${className}`}>
      <div className={`mb-6 flex items-center ${collapsed ? 'px-3 justify-center' : 'px-4 justify-between'}`}>
        {!collapsed && (
          <>
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <LayoutGrid className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="ml-3 mr-auto font-bold text-white text-base tracking-tight">ValueBuddy</span>
          </>
        )}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            title={collapsed ? 'Open menu' : 'Close menu'}
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="flex flex-col gap-1 w-full px-2.5">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`relative flex items-center py-2.5 px-3.5 rounded-xl transition-all cursor-pointer group ${
              item.active 
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' 
                : 'text-white/70 hover:bg-white/5 hover:text-white'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-emerald-400' : ''}`} />
            {!collapsed && <span className="ml-3 text-sm font-semibold whitespace-nowrap">
              {item.label}
            </span>}
            {item.active && (
              <div className="absolute left-0 top-3 bottom-3 w-1 bg-emerald-400 rounded-r" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-auto flex flex-col gap-2 px-2.5">
        <div className={`flex items-center py-2.5 rounded-xl text-white/70 hover:bg-white/5 hover:text-white cursor-pointer transition-all ${collapsed ? 'px-2 justify-center' : 'px-3.5'}`}>
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="ml-3 text-sm font-semibold">Settings</span>}
        </div>
        
        <div className={`flex items-center py-2.5 bg-white/5 rounded-xl border border-white/10 mx-1 ${collapsed ? 'px-2 justify-center' : 'px-3.5'}`}>
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner">
            LO
          </div>
          {!collapsed && <div className="ml-3 flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate">Louis Owner</span>
            <span className="text-[11px] text-white/40 truncate">Admin Account</span>
          </div>}
        </div>
      </div>
    </div>
  );
};

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, onMenuClick }) => {
  return (
    <header className={`h-10 flex items-center justify-between px-3 sm:px-4 border-b border-gray-200 bg-white ${className}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1 text-gray-500 hover:bg-gray-100 rounded"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-gray-500 text-sm overflow-hidden">
          <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center shrink-0">
            <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[8px] uppercase font-bold tracking-widest text-gray-400 leading-tight">Company</span>
            <span className="text-gray-900 font-semibold truncate text-[11px] leading-tight">Default Account</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-8 pr-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs w-44 lg:w-56 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-full">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-1 text-gray-500 hover:bg-gray-100 rounded-full">
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 pl-2 sm:pl-3 border-l border-gray-200">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[11px] shrink-0">
            U
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar
        className="hidden lg:flex"
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
      />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div 
            className="h-full"
            onClick={e => e.stopPropagation()}
          >
            <Sidebar className="w-64" />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-1 sm:p-1.5">
          {children}
        </main>
      </div>
    </div>
  );
};

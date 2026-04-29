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
  User,
  LayoutGrid,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Financial Analysis', id: 'financial-analysis', active: true },
    { icon: BarChart2, label: 'Market Comps', id: 'market-comps' },
    { icon: Layers, label: 'Report', id: 'report' },
  ];

  return (
    <div className={`w-64 flex flex-col py-6 bg-[#1e2d24] text-white/50 h-full z-50 ${className}`}>
      <div className="mb-10 px-6 flex items-center">
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <LayoutGrid className="w-6 h-6 text-emerald-400" />
        </div>
        <span className="ml-3 font-bold text-white text-base tracking-tight">ValueBuddy</span>
      </div>
      
      <div className="flex flex-col gap-1 w-full px-3">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`relative flex items-center py-3 px-4 rounded-xl transition-all cursor-pointer group ${
              item.active 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'text-white/40 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-emerald-400' : ''}`} />
            <span className="ml-3 font-semibold whitespace-nowrap">
              {item.label}
            </span>
            {item.active && (
              <div className="absolute left-0 top-3 bottom-3 w-1 bg-emerald-400 rounded-r" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-auto flex flex-col gap-4 px-3">
        <div className="flex items-center py-3 px-4 rounded-xl text-white/40 hover:bg-white/5 hover:text-white cursor-pointer transition-all">
          <Settings className="w-5 h-5 shrink-0" />
          <span className="ml-3 font-semibold">Settings</span>
        </div>
        
        <div className="flex items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/10 mx-1">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner">
            LO
          </div>
          <div className="ml-3 flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate">Louis Owner</span>
            <span className="text-[11px] text-white/40 truncate">Admin Account</span>
          </div>
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
    <header className={`h-12 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 bg-white ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-gray-500 text-sm overflow-hidden">
          <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center shrink-0">
            <BarChart2 className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex flex-col truncate">
            <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 leading-tight">Company</span>
            <span className="text-gray-900 font-bold truncate text-xs leading-tight">Default Account</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm w-48 lg:w-64 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button className="md:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full">
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l border-gray-200">
          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs shrink-0">
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

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />
      
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
        <main className="flex-1 overflow-y-auto p-1.5 sm:p-2">
          {children}
        </main>
      </div>
    </div>
  );
};

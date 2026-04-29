import React from 'react';
import { 
  MoreHorizontal, 
  ChevronRight,
  Shield,
  List,
  User,
  Users,
  ChevronDown,
  Download,
  Save,
  FileText,
  Check,
  BarChart2
} from 'lucide-react';

interface WorkflowTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Stepper = () => {
  const steps = [
    { name: 'Intake', status: 'completed' },
    { name: 'Application', status: 'completed' },
    { name: 'Financial Analysis', status: 'active' },
    { name: 'LOI', status: 'pending' },
    { name: 'Credit Memo', status: 'pending' },
    { name: 'Closing', status: 'pending' },
    { name: 'Closed', status: 'pending' },
    { name: 'Not Eligible', status: 'pending' },
  ];

  const getIcon = (step: any) => {
    if (step.status === 'completed') return <Check className="w-3 h-3 text-white" />;
    if (step.status === 'active') return <Check className="w-3 h-3 text-white" />;
    if (step.name === 'Credit Memo') return <BarChart2 className="w-3 h-3 text-gray-400" />;
    if (step.name === 'Closing') return <FileText className="w-3 h-3 text-gray-400" />;
    return <Check className="w-3 h-3 text-gray-400" />;
  };

  return (
    <div className="py-4 flex items-center justify-center overflow-x-auto no-scrollbar border-b border-gray-100 mb-2">
      <div className="flex items-center gap-4 min-w-max px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.name}>
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                step.status === 'completed' ? 'bg-green-500' :
                step.status === 'active' ? 'bg-blue-500 text-white shadow-md' :
                'bg-gray-100 text-gray-400'
              }`}>
                {getIcon(step)}
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${
                step.status === 'completed' ? 'text-gray-900' :
                step.status === 'active' ? 'text-blue-600' :
                'text-gray-400'
              }`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-[1px] transition-colors duration-200 ${
                step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const WorkflowTabs = ({ activeTab, onTabChange }: WorkflowTabsProps) => {
  const tabs = [
    { number: 1, name: 'Financial Analysis' },
    { number: 2, name: 'Valuation' },
  ];

  return (
    <div className="mt-4 border-b border-gray-100 pb-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-center gap-6">
        {/* Center: Tabs */}
        <div className="flex items-center justify-center gap-4 md:gap-12">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.name}>
              <div 
                onClick={() => onTabChange(tab.name)}
                className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all cursor-pointer ${
                  activeTab === tab.name 
                    ? 'bg-[#1e2d24] text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  activeTab === tab.name ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {tab.number}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">{tab.name}</span>
              </div>
              {index < tabs.length - 1 && <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DashboardHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardHeader = ({ activeTab, onTabChange }: DashboardHeaderProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1e2d24] flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg">
            LO
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-gray-900 truncate tracking-tight">#387785855895</h1>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded whitespace-nowrap uppercase tracking-wider border border-emerald-100">Term Loan</span>
            </div>
            <div className="text-xs text-gray-500 truncate font-medium">
              Assigned to <span className="font-bold text-gray-900">Loan Officer</span> (Principal Partner)
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 gap-1">
             <button className="p-2 hover:bg-white hover:shadow-sm rounded-md text-gray-500 transition-all"><List className="w-4 h-4" /></button>
             <button className="p-2 hover:bg-white hover:shadow-sm rounded-md text-gray-500 transition-all"><Shield className="w-4 h-4" /></button>
             <button className="p-2 hover:bg-white hover:shadow-sm rounded-md text-gray-500 transition-all"><User className="w-4 h-4" /></button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#6d28d9] text-[#6d28d9] bg-purple-50 rounded-lg text-xs font-bold hover:bg-purple-100 whitespace-nowrap transition-all shadow-sm">
             <Users className="w-4 h-4" />
             Loan Officers
             <ChevronDown className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <Stepper />
      
      <WorkflowTabs activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

import React, { useState } from 'react';
import { AppLayout } from './components/AppLayout';
import { DashboardHeader } from './components/DashboardHeader';
import { FinancialGrid } from './components/FinancialGrid';
import { ValuationGrid } from './components/ValuationGrid';

function App() {
  const [activeWorkflowTab, setActiveWorkflowTab] = useState('Financial Analysis');
  const [projectedCommonSizingBasisLabel, setProjectedCommonSizingBasisLabel] = useState('Average');

  const renderContent = () => {
    switch (activeWorkflowTab) {
      case 'Financial Analysis':
        return <FinancialGrid onProjectedCommonSizingBasisChange={setProjectedCommonSizingBasisLabel} />;
      case 'Valuation':
        return <ValuationGrid projectedCommonSizingBasisLabel={projectedCommonSizingBasisLabel} />;
      default:
        return <FinancialGrid onProjectedCommonSizingBasisChange={setProjectedCommonSizingBasisLabel} />;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full gap-0.5 max-w-full lg:max-w-[1600px] mx-auto px-2 md:px-0">
        <DashboardHeader activeTab={activeWorkflowTab} onTabChange={setActiveWorkflowTab} />
        <div className="flex-1 min-h-0">
          {renderContent()}
        </div>
      </div>
    </AppLayout>
  );
}

export default App;

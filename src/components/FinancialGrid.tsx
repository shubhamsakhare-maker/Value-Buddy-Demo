import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  CheckCircle2, 
  RefreshCw,
  Save
} from 'lucide-react';
import { MOCK_DATA, INCOME_DATA, PROFORMA_COLUMNS, INCOME_COLUMNS, FinancialRow, YearColumn } from '../data/mockFinancialData';

const Row = ({ row, expandedRows, toggleRow, columns, level = 0, latestYear, includedValues, onIncludedValueChange, isProforma }: { 
  row: FinancialRow, 
  expandedRows: Set<string>, 
  toggleRow: (id: string) => void,
  columns: YearColumn[],
  level?: number,
  latestYear: string,
  includedValues: Record<string, string>,
  onIncludedValueChange: (id: string, value: string) => void,
  isProforma: boolean
}) => {
  const isExpanded = expandedRows.has(row.id);
  const hasChildren = row.children && row.children.length > 0;
  const isDocumentRow = level === 4;

  const getRowStyle = () => {
    if (row.name.toLowerCase().includes('total') || row.name.toLowerCase().includes('net')) {
      return 'bg-emerald-50/10 font-bold text-gray-900 border-y border-gray-200';
    }
    if (level === 0) return 'bg-gray-50 font-semibold text-gray-900 border-y border-gray-200';
    if (level === 1) return 'bg-white font-medium text-gray-700 border-b border-gray-100';
    return 'bg-white font-normal text-gray-600 border-b border-gray-50';
  };

  return (
    <>
      <tr className={`transition-colors hover:bg-gray-50/50 ${getRowStyle()}`}>
        <td className={`py-2 px-4 sticky left-0 z-10 min-w-[200px] sm:min-w-[300px] border-r border-gray-100 ${level === 0 ? 'bg-gray-50' : 'bg-white'}`} style={{ paddingLeft: `${level * 20 + 16}px` }}>
          <div className="flex items-center gap-2">
            {isDocumentRow ? (
              <FileText className="w-3.5 h-3.5 text-gray-400" />
            ) : hasChildren ? (
              <button onClick={() => toggleRow(row.id)} className="p-1 hover:bg-gray-200/50 rounded transition-colors">
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-gray-500" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-500" />}
              </button>
            ) : (
              <div className="w-5.5" />
            )}
            <span className="text-xs truncate">
              {row.name}
            </span>
          </div>
        </td>
        {columns.map((col) => {
          const val = row.values[col.year];
          const includedInValue = (row.values['included_in_value'] as string) || 'Yes';
          const isAdjustmentFactor = col.year === 'adjustment_factor';
          const isAdjustmentColumn = col.year === 'adjustment' || col.year === 'adjustment_factor' || col.year === 'adjustment_book_value';
          const isPercentage = col.year.includes('ratio') || col.year.includes('margin') || col.year.includes('cs');
          const isMetadataRow = row.id.startsWith('meta-');
          const isDays = row.id === 'meta-days';
          const isNumeric = typeof val === 'number';

          const hasEye = (row.id === 'doc-6' && (col.year === '2022' || col.year === '2023')) || 
                        (row.id === 'doc-3' && col.year === '2024');

          return (
            <td key={col.year} className={`py-2 px-4 text-right text-xs border-l border-gray-100 min-w-[120px] sm:min-w-[140px] ${isMetadataRow ? 'bg-gray-50/30 text-gray-500 italic' : ''}`}>
              <div className="flex items-center justify-end gap-1">
                {isProforma && col.year === 'included_in_value' ? (
                  <select 
                    value={includedInValue}
                    onChange={(e) => onIncludedValueChange(row.id, e.target.value)}
                    className="bg-white border border-gray-200 rounded px-2 py-1 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer hover:border-emerald-300 w-full max-w-[70px]"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="-">-</option>
                  </select>
                ) : isProforma && isAdjustmentFactor ? (
                  <span className="font-semibold text-gray-700">
                    {includedInValue === '-' ? '0%' : `${val}%`}
                  </span>
                ) : val === '-' || val === '' || (isNumeric && val === 0 && !isAdjustmentColumn) ? (
                  <span className="text-gray-300">-</span>
                ) : isNumeric ? (
                  <>
                    <span className={`${val === 0 && !isAdjustmentColumn ? 'text-gray-400' : ''}`}>
                      {isAdjustmentFactor ? `${(val as number).toFixed(0)}%` : isPercentage ? `${(val as number).toFixed(2)}%` : isDays ? val : `$${(val as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </span>
                    {hasEye && <Eye className="w-3 h-3 text-emerald-400" />}
                  </>
                ) : (
                  <span className="text-gray-600">{val}</span>
                )}
              </div>
            </td>
          );
        })}
        <td className="py-2 px-4 text-right sticky right-0 bg-white z-10 w-10"></td>
      </tr>
      {isExpanded && hasChildren && row.children?.map(child => (
        <Row 
          key={child.id} 
          row={child} 
          expandedRows={expandedRows} 
          toggleRow={toggleRow} 
          columns={columns} 
          level={level + 1} 
          latestYear={latestYear}
          includedValues={includedValues}
          onIncludedValueChange={onIncludedValueChange}
          isProforma={isProforma}
        />
      ))}
    </>
  );
};

interface FinancialGridProps {
  onProjectedCommonSizingBasisChange?: (label: string) => void;
}

export const FinancialGrid = ({ onProjectedCommonSizingBasisChange }: FinancialGridProps) => {
  const [activeTab, setActiveTab] = useState('Proforma Balance Sheet');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['assets-group', 'total-current-assets', 'cash-equivalents', 'inventory-group', 'liabilities-group', 'equity-group']));
  const [latestYear, setLatestYear] = useState('interim');
  const [includedValues, setIncludedValues] = useState<Record<string, string>>({});
  const [commonSizingAverageBasis, setCommonSizingAverageBasis] = useState('all');
  const [projectedCommonSizingBasis, setProjectedCommonSizingBasis] = useState('cs_avg');
  const [ttmBaseYear, setTtmBaseYear] = useState('tr3');

  const isProforma = activeTab === 'Proforma Balance Sheet';

  const commonSizingAverageOptions = [
    { value: 'historical', label: '2022-2024', columns: ['cs1', 'cs2', 'cs3'] },
    { value: 'historical_interim', label: '2022-2024 + Interim', columns: ['cs1', 'cs2', 'cs3', 'cs4'] },
    { value: 'all', label: 'All Columns', columns: ['cs1', 'cs2', 'cs3', 'cs4', 'cs5'] }
  ];

  const projectedCommonSizingOptions = [
    { value: 'cs1', label: '2022' },
    { value: 'cs2', label: '2023' },
    { value: 'cs3', label: '2024' },
    { value: 'cs4', label: 'Interim' },
    { value: 'cs5', label: 'Annualized' },
    { value: 'cs_avg', label: 'Average' }
  ];

  const ttmBaseYearOptions = [
    { value: 'tr1', label: '2022' },
    { value: 'tr2', label: '2023' },
    { value: 'tr3', label: '2024' }
  ];

  const handleIncludedValueChange = (id: string, value: string) => {
    setIncludedValues(prev => ({ ...prev, [id]: value }));
  };

  const handleProjectedCommonSizingBasisChange = (value: string) => {
    setProjectedCommonSizingBasis(value);
    const selectedOption = projectedCommonSizingOptions.find(option => option.value === value);
    onProjectedCommonSizingBasisChange?.(selectedOption?.label ?? value);
  };

  const activeColumns = useMemo(() => {
    return isProforma ? PROFORMA_COLUMNS : INCOME_COLUMNS;
  }, [isProforma]);

  const activeData = useMemo(() => {
    return isProforma ? MOCK_DATA : INCOME_DATA;
  }, [isProforma]);

  // Recursively calculate adjustments for the Balance Sheet
  const enrichedData = useMemo(() => {
    if (!isProforma) {
      const averageNumericValues = (values: Record<string, string | number>, columns: string[]) => {
        const numericValues = columns
          .map(column => values[column])
          .filter((value): value is number => typeof value === 'number');

        if (numericValues.length === 0) return values.cs_avg ?? 0;
        return numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length;
      };
      const commonSizingAverageColumns = commonSizingAverageOptions.find(option => option.value === commonSizingAverageBasis)?.columns ?? ['cs1', 'cs2', 'cs3', 'cs4', 'cs5'];

      const interimDays = 212;
      const ttmDaysByYear: Record<string, number> = { tr1: 365, tr2: 365, tr3: 366 };
      const remainingDays = 365 - interimDays;
      const calculateTtm = (values: Record<string, string | number>) => {
        const interimValue = values.interim;
        const selectedYearValue = values[ttmBaseYear];
        if (typeof interimValue !== 'number' || typeof selectedYearValue !== 'number') return values.ttm ?? 0;

        return interimValue + (selectedYearValue * remainingDays / (ttmDaysByYear[ttmBaseYear] || 365));
      };

      const revenueRow = activeData.find(row => row.id === 'revenue-group');
      const revenueTtm = revenueRow ? calculateTtm(revenueRow.values) : 0;
      const revenueTtmValue = typeof revenueTtm === 'number' ? revenueTtm : 0;

      const processIncomeRow = (row: FinancialRow): FinancialRow => {
        const children = row.children?.map(processIncomeRow);
        const values = { ...row.values };
        const isMetadataRow = row.id.startsWith('meta-');

        if (!isMetadataRow) {
          values.cs_avg = averageNumericValues(values, commonSizingAverageColumns);
          values.cs6 = values[projectedCommonSizingBasis] ?? values.cs6;
          values.ttm = calculateTtm(values);

          if (typeof values.ttm === 'number' && revenueTtmValue !== 0) {
            values.ttm_cs = (values.ttm / revenueTtmValue) * 100;
          }
        }

        return {
          ...row,
          children,
          values
        };
      };

      return activeData.map(processIncomeRow);
    }

    const processRow = (row: FinancialRow): FinancialRow => {
      const incl = includedValues[row.id] || (row.values['included_in_value'] as string) || 'Yes';
      const lVal = (row.values[latestYear] as number) || 0;
      
      // Dynamic factor: Yes -> 0%, No -> 100%
      const currentFactorValue = incl === 'Yes' ? 0 : (incl === 'No' ? 100 : 0);
      
      let adjustment = 0;
      let children: FinancialRow[] = [];

      if (row.children && row.children.length > 0) {
        children = row.children.map(processRow);
        // Parent row: sum of children adjustments
        adjustment = children.reduce((sum, child) => sum + (child.values['adjustment'] as number || 0), 0);
      } else {
        // Leaf row: logic
        if (incl === 'Yes') {
          // adjustment = ( latest Year x Factor value x (-1))
          adjustment = lVal * (currentFactorValue / 100) * -1;
        } else if (incl === 'No') {
          // adjustment = ( latest Year x (-1))
          adjustment = lVal * -1;
        } else {
          adjustment = 0;
        }
      }

      // Special handling for Variance row
      if (row.id === 'variance') {
        // This is a bit of a hack since we don't have global state here easily,
        // but for the mock it works if we assume the seed data's relative dependencies.
        // Actually, let's just use the seed's logic or sum up.
      }

      return {
        ...row,
        children: children.length > 0 ? children : undefined,
        values: {
          ...row.values,
          'included_in_value': incl,
          'adjustment_factor': currentFactorValue,
          'adjustment': adjustment,
          'adjustment_book_value': lVal + adjustment
        }
      };
    };

    let data = activeData.map(processRow);

    // After calculating all main groups, update Variance if it exists
    const assetsRow = data.find(r => r.id === 'assets-group');
    const liabRow = data.find(r => r.id === 'liabilities-group');
    const equityRow = data.find(r => r.id === 'equity-group');

    if (assetsRow && liabRow && equityRow) {
      const assetsAdj = assetsRow.values['adjustment'] as number || 0;
      const liabAdj = liabRow.values['adjustment'] as number || 0;
      const equityAdj = equityRow.values['adjustment'] as number || 0;
      
      data = data.map(r => {
        if (r.id === 'variance') {
          const adj = assetsAdj - (liabAdj + equityAdj);
          return {
            ...r,
            values: {
              ...r.values,
              'adjustment': adj,
              'adjustment_book_value': 0 // Variance book value is always 0
            }
          };
        }
        return r;
      });
    }

    return data;
  }, [activeData, isProforma, includedValues, latestYear, commonSizingAverageBasis, projectedCommonSizingBasis, ttmBaseYear]);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedRows(newExpanded);
  };


  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full max-w-full shadow-sm">
      {/* Grid Toolbar */}
      <div className="p-3 border-b border-gray-100 bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-1 p-1 bg-gray-100/50 rounded-xl overflow-x-auto no-scrollbar whitespace-nowrap">
            {['Proforma Balance Sheet', 'Projected Income Statement'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-[#1e2d24] text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-xs font-bold">
               <CheckCircle2 className="w-4 h-4" />
               All Items Classified
            </div>
            
            <div className="relative flex-1 sm:flex-none min-w-[140px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Statement..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Plus className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Add Year</span>
            </button>
            
            <div className="hidden sm:block h-6 w-[1px] bg-gray-200 mx-1" />
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Show Documents</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
           <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5 py-1 px-2 bg-gray-100 rounded text-gray-700"><FileText className="w-3.5 h-3.5" /> Business</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Accept</span>
           </div>
           
           <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-xs text-gray-400 font-medium italic">Last saved • <span className="text-gray-600 font-bold">Apr 22, 2026, 2:34 PM</span></span>
              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                    <Eye className="w-4 h-4 text-emerald-500" /> Scenario
                 </button>
                 <button className="flex items-center gap-2 px-4 py-1.5 bg-[#1e2d24] text-white text-xs font-bold rounded-lg shadow-lg hover:bg-[#2a433a] transition-all">
                    <Save className="w-4 h-4" /> Save
                 </button>
                 <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                    <RefreshCw className="w-4 h-4 text-emerald-500" /> Refresh
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto relative">
        <table className="w-full border-collapse text-left min-w-full">
          <thead className="sticky top-0 z-20 shadow-sm">
            <tr className="bg-gray-50 text-gray-700">
              <th className="py-3 px-4 font-bold text-xs min-w-[200px] sm:min-w-[300px] sticky left-0 bg-gray-50 z-30 border-r border-gray-200 uppercase tracking-wider">
                Statement Type
              </th>
              {activeColumns.map(col => (
                <th key={col.year} className="py-3 px-4 min-w-[120px] sm:min-w-[140px] border-l border-gray-200">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">{col.label || col.year}</span>
                      {isProforma && col.year === 'adjustment' && (
                        <select 
                          value={latestYear}
                          onChange={(e) => setLatestYear(e.target.value)}
                          className="bg-white border border-gray-200 rounded px-2 py-1 text-[10px] normal-case font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-sm transition-all hover:border-emerald-300"
                        >
                          <option value="tax_return_1">Tax Return (2022)</option>
                          <option value="tax_return_2">Tax Return (2023)</option>
                          <option value="tax_return_3">Tax Return (2024)</option>
                          <option value="interim">Interim (2025)</option>
                        </select>
                      )}
                      {!isProforma && col.year === 'cs_avg' && (
                        <select
                          value={commonSizingAverageBasis}
                          onChange={(e) => setCommonSizingAverageBasis(e.target.value)}
                          className="bg-white border border-gray-200 rounded px-2 py-1 text-[10px] normal-case font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-sm transition-all hover:border-emerald-300 max-w-[110px]"
                          title="Select common sizing years for average"
                        >
                          {commonSizingAverageOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      )}
                      {!isProforma && col.year === 'cs6' && (
                        <select
                          value={projectedCommonSizingBasis}
                          onChange={(e) => handleProjectedCommonSizingBasisChange(e.target.value)}
                          className="bg-white border border-gray-200 rounded px-2 py-1 text-[10px] normal-case font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-sm transition-all hover:border-emerald-300 max-w-[110px]"
                          title="Select columns for projected common sizing"
                        >
                          {projectedCommonSizingOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      )}
                      {!isProforma && col.year === 'ttm' && (
                        <select
                          value={ttmBaseYear}
                          onChange={(e) => setTtmBaseYear(e.target.value)}
                          className="bg-white border border-gray-200 rounded px-2 py-1 text-[10px] normal-case font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer shadow-sm transition-all hover:border-emerald-300"
                          title="Select year for prorated TTM data"
                        >
                          {ttmBaseYearOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-gray-400 uppercase">{col.period}</span>
                  </div>
                </th>
              ))}
              <th className="w-10 sticky right-0 bg-gray-50 border-l border-gray-200"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {enrichedData.map(row => (
              <Row 
                key={row.id} 
                row={row} 
                expandedRows={expandedRows} 
                toggleRow={toggleRow} 
                columns={activeColumns} 
                latestYear={latestYear}
                includedValues={includedValues}
                onIncludedValueChange={handleIncludedValueChange}
                isProforma={isProforma}
              />
            ))}
            {/* Fill space */}
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="border-b border-gray-100/50">
                <td className="py-4 px-4 sticky left-0 bg-white z-10 border-r border-gray-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"></td>
                {activeColumns.map(col => <td key={col.year} className="py-4 px-4 border-l border-gray-100"></td>)}
                <td className="w-10 sticky right-0 bg-white z-10 border-l border-gray-100"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
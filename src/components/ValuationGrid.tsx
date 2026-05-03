import React, { useState } from 'react';
import { 
  FileText, 
  FileSpreadsheet,
  Search, 
  Plus, 
  Save,
  RefreshCw,
  ChevronDown,
  TrendingUp,
  BarChart3,
  PieChart,
  Info,
  Pencil,
  Check,
  X,
  UploadCloud,
} from 'lucide-react';
import { MOCK_ASSUMPTION_DATA } from '../data/mockAssumptionData';
import { 
  ADJUSTED_INCOME_DATA, 
  WEIGHTED_INCOME_DATA, 
  RATIO_ANALYSIS_DATA,
  ADJUSTED_BOOK_VALUE_DATA,
  GOODWILL_CALCULATION_DATA
} from '../data/mockDashboardData';
import { COMPARABLE_SETS, KPI_DASHBOARD_BHS } from '../data/mockMarketCompsData';
import { REPORT_VALUATION_DATA } from '../data/mockReportData';
import { 
  SBA_LOAN_INFO, 
  COMP_DATABASE_INFO, 
  SBA_DEFAULT_DASHBOARD, 
  RISK_ASSESSMENT_DATA,
  CARBON_DATA_ANALYSIS,
  TARIFF_DATA_ANALYSIS
} from '../data/mockRiskData';

interface ValuationGridProps {
  projectedCommonSizingBasisLabel?: string;
}

const ASSUMPTION_INFO_NOTE_STORAGE_KEY = 'valueBuddy.assumptionInfoNote.v1';
const DASHBOARD_INFO_NOTE_STORAGE_KEY = 'valueBuddy.dashboardInfoNote.v2';
const MARKET_COMPS_INFO_NOTE_STORAGE_KEY = 'valueBuddy.marketCompsInfoNote.v1';
const RISK_ANALYSIS_INFO_NOTE_STORAGE_KEY = 'valueBuddy.riskAnalysisInfoNote.v1';
const REPORT_INFO_NOTE_STORAGE_KEY = 'valueBuddy.reportInfoNote.v1';

const DEFAULT_ASSUMPTION_INFO_NOTE = `What is this tab

The Assumptions tab is a central place where all manual inputs and business-specific settings are defined to control how financial data is adjusted, weighted, and evaluated.

It includes inputs related to:
- Financial adjustments (e.g., rent, owner compensation, one-time items)
- Weighting logic (historical vs projected data)
- Valuation methodology
- Risk and deal-specific parameters

Dates / 2025 Projections
Input Source:
- Manual user input (projection year, timeline)
Used In:
- Financial Projections -> defines projection periods
- Valuation Calculations -> future year valuation basis

Historical Financial Weighting
Input Source:
- Manual user input (weight % for historical vs recent data)
Used In:
- Weighted / Normalized Income -> to compute weighted earnings

Valuation Methodology Weighting
Input Source:
- Manual user input (weight assigned to valuation methods)
Used In:
- Valuation Calculations -> combines multiple valuation approaches

Adjustments (General)
Input Source:
- BUSINESS P&L + manual inputs
Used In:
- Projected Income Statement -> adjusted income values
- Valuation Calculations -> adjusted EBITDA / earnings

Rent Adjustment
Input Source:
- BUSINESS P&L (rent expense) + manual adjustment input
Used In:
- Projected Income Statement -> adjusted expenses
- Valuation Calculations -> normalized earnings

Owner's Compensation Adjustments
Input Source:
- BUSINESS P&L (salary/compensation) + manual input
Used In:
- Projected Income Statement -> adjusted profit
- Valuation Calculations -> adjusted EBITDA

Discretionary Personal Expenses
Input Source:
- BUSINESS P&L + manual identification
Used In:
- Projected Income Statement -> add-backs
- Valuation Calculations -> normalized earnings

One-time Revenue / Expense Adjustments
Input Source:
- BUSINESS P&L + manual input
Used In:
- Projected Income Statement -> remove non-recurring items
- Valuation Calculations -> sustainable earnings

Comparable Company Adjustments
Input Source:
- Manual input + reference to Comps data
Used In:
- Market Comparison (Comps) -> adjusted benchmarking
- Valuation Calculations -> multiple adjustments

Excluded Assets
Input Source:
- BUSINESS BALANCE SHEET + manual selection
Used In:
- Valuation Calculations -> removed from enterprise value
- Proforma Balance Sheet -> adjusted asset base

Excess / Insufficient Cash
Input Source:
- BUSINESS BALANCE SHEET + manual input
Used In:
- Valuation Calculations -> cash adjustment in equity value
- Financial Position Analysis

Acquisition Stake Summary
Input Source:
- Manual input (deal structure / ownership %)
Used In:
- Valuation Calculations -> ownership-based valuation
- Final equity distribution

Risk Assessment / CSRP Error
Input Source:
- Manual input + system-derived risk factors
Used In:
- Valuation Calculations -> risk-adjusted valuation
- Discounting / risk modeling`;

const DEFAULT_DASHBOARD_INFO_NOTE = `What is this tab (Functional)

This tab acts as the financial computation and analysis layer where:
- Raw financial data is converted into adjusted earnings
- Historical data is weighted to derive normalized income
- Key financial metrics and ratios are calculated for evaluation

It is essentially the processing layer that transforms financial data into decision-ready outputs.

Input Sources
- Projected Income Statement -> base income values
- Assumptions (Common Adjustments) -> adjustment and weighting logic
- Proforma Balance Sheet -> required for ratio calculations

Used in (Functional Usage )
- Valuation Calculations -> provides adjusted and normalized earnings
- Ratio Analysis -> computes financial performance metrics
- Weighted / Normalized Income Engine -> derives final earnings values
- Market Comparison (Comps) -> supplies benchmark-ready financial metrics
- Report Generation -> feeds final outputs and insights`;

const DEFAULT_MARKET_COMPS_INFO_NOTE = `What is this tab (Functional)

This tab acts as the market benchmarking layer, where the business's financial metrics are compared against similar companies.

It is used to:
- Derive valuation multiples (e.g., Revenue, EBITDA multiples)
- Evaluate relative performance
- Validate whether the business valuation is aligned with market standards

In simple terms:
It compares the business with market data to support valuation decisions.

Input Sources
- Dashboard -> provides adjusted and normalized financial metrics (Revenue, EBITDA, Net Income)
- Comps Data (Comps, Comp Table, Raw/Formatted Data) -> external comparable company data
- KPI Dashboard BHS -> supporting financial ratios and balance sheet metrics
- Assumptions (Comparable Company Adjustments) -> manual adjustments to comps

Used in (Functional Usage )
- Valuation Calculations -> applies market multiples to derive business value
- Benchmarking Analysis -> compares performance against similar businesses
- Multiple Selection Logic -> determines appropriate valuation multiples
- Report Generation -> provides market comparison insights and outputs`;

const DEFAULT_RISK_ANALYSIS_INFO_NOTE = `What is this tab (Functional)

This tab acts as the risk evaluation layer, where the business's financial and operational data is analyzed to determine its risk profile.

It is used to:
- Assess financial stability and default risk
- Evaluate variability and reliability of earnings
- Determine risk adjustments that impact valuation

In simple terms:
It measures how risky the business is and how that risk should affect valuation.

Input Sources
- Dashboard -> financial performance metrics and ratios
- Proforma Balance Sheet -> financial position (liquidity, leverage)
- Projected Income Statement -> earnings consistency and trends
- Assumptions (Risk Assessment / CSRP Error) -> user-defined risk inputs

Used in (Functional Usage )
- Assumptions (Common Adjustments) -> Risk inputs (e.g., Risk Assessment / CSRP Error) are defined here and then used in calculations
- Dashboard (Adjusted Income Statement / Ratio Analysis) -> Risk impacts interpretation of ratios and performance metrics
- Valuations (in Report -> Valuations) -> Risk inputs are applied in final valuation calculations (adjusted outputs)
- Report (Valuations, Charts) -> Risk results are reflected in final outputs and summaries`;

const DEFAULT_REPORT_INFO_NOTE = `What is this tab (Functional)

This tab acts as the final output layer, where all processed financial data, valuation results, and analysis outputs are consolidated into a structured format.

It represents the end result of the entire system, combining:
- Adjusted financials
- Valuation outputs
- Market comparisons
- Risk considerations

In simple terms:
This tab presents the final computed results of the financial model.

Input Sources
- Dashboard -> adjusted income, weighted earnings, ratios
- Market Comps -> benchmarking and multiple-based inputs
- Risk Analysis -> risk-adjusted inputs
- Assumptions (Common Adjustments) -> valuation logic and weighting
- Proforma Balance Sheet -> financial position outputs
- Report Template -> structured data from this tab is mapped into predefined report templates`;

export const ValuationGrid = ({ projectedCommonSizingBasisLabel = 'CS Avg' }: ValuationGridProps) => {
  const [activeTab, setActiveTab] = useState('Assumption');
  const [isAssumptionInfoOpen, setIsAssumptionInfoOpen] = useState(false);
  const [isEditingAssumptionInfo, setIsEditingAssumptionInfo] = useState(false);
  const [assumptionInfoDraft, setAssumptionInfoDraft] = useState(DEFAULT_ASSUMPTION_INFO_NOTE);
  const [assumptionInfoNote, setAssumptionInfoNote] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_ASSUMPTION_INFO_NOTE;
    return window.localStorage.getItem(ASSUMPTION_INFO_NOTE_STORAGE_KEY) || DEFAULT_ASSUMPTION_INFO_NOTE;
  });
  const [isDashboardInfoOpen, setIsDashboardInfoOpen] = useState(false);
  const [isEditingDashboardInfo, setIsEditingDashboardInfo] = useState(false);
  const [dashboardInfoDraft, setDashboardInfoDraft] = useState(DEFAULT_DASHBOARD_INFO_NOTE);
  const [dashboardInfoNote, setDashboardInfoNote] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_DASHBOARD_INFO_NOTE;
    return window.localStorage.getItem(DASHBOARD_INFO_NOTE_STORAGE_KEY) || DEFAULT_DASHBOARD_INFO_NOTE;
  });
  const [isMarketCompsInfoOpen, setIsMarketCompsInfoOpen] = useState(false);
  const [isEditingMarketCompsInfo, setIsEditingMarketCompsInfo] = useState(false);
  const [marketCompsInfoDraft, setMarketCompsInfoDraft] = useState(DEFAULT_MARKET_COMPS_INFO_NOTE);
  const [marketCompsInfoNote, setMarketCompsInfoNote] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_MARKET_COMPS_INFO_NOTE;
    return window.localStorage.getItem(MARKET_COMPS_INFO_NOTE_STORAGE_KEY) || DEFAULT_MARKET_COMPS_INFO_NOTE;
  });
  const [isRiskAnalysisInfoOpen, setIsRiskAnalysisInfoOpen] = useState(false);
  const [isEditingRiskAnalysisInfo, setIsEditingRiskAnalysisInfo] = useState(false);
  const [riskAnalysisInfoDraft, setRiskAnalysisInfoDraft] = useState(DEFAULT_RISK_ANALYSIS_INFO_NOTE);
  const [riskAnalysisInfoNote, setRiskAnalysisInfoNote] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_RISK_ANALYSIS_INFO_NOTE;
    return window.localStorage.getItem(RISK_ANALYSIS_INFO_NOTE_STORAGE_KEY) || DEFAULT_RISK_ANALYSIS_INFO_NOTE;
  });
  const [isReportInfoOpen, setIsReportInfoOpen] = useState(false);
  const [isEditingReportInfo, setIsEditingReportInfo] = useState(false);
  const [reportInfoDraft, setReportInfoDraft] = useState(DEFAULT_REPORT_INFO_NOTE);
  const [reportInfoNote, setReportInfoNote] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_REPORT_INFO_NOTE;
    return window.localStorage.getItem(REPORT_INFO_NOTE_STORAGE_KEY) || DEFAULT_REPORT_INFO_NOTE;
  });
  const [reportSubTab, setReportSubTab] = useState('Valuation');
  const [activeRiskAnalysisSection, setActiveRiskAnalysisSection] = useState('preRisk');
  const [activePreRiskTab, setActivePreRiskTab] = useState('sba');
  const [selectedAssumptionCategory, setSelectedAssumptionCategory] = useState('Weighted Tables');
  const [selectedCompSet, setSelectedCompSet] = useState(COMPARABLE_SETS[0].id);
  const [expandedRatioGroups, setExpandedRatioGroups] = useState<string[]>([]);
  const [weightedExplanation, setWeightedExplanation] = useState("In this valuation report, we applied 33.3% weight on both the 2023 & 2024 tax return financials as they reflect relatively stable operations and the most recent full 12-month periods. We applied the remaining 33.3% weight on the 2025 projected income statement as it represents the Company's most recent and expected performance. This approach ensures our analysis reflects the most current and accurate financial view of the business.");
  const [onboardingExplanation, setOnboardingExplanation] = useState("");
  const [carbonManualInputs, setCarbonManualInputs] = useState<Record<string, string>>(() =>
    CARBON_DATA_ANALYSIS.manualFields.reduce<Record<string, string>>((acc, field) => {
      acc[field.key] = field.value;
      return acc;
    }, {})
  );
  const [carbonWriteUp, setCarbonWriteUp] = useState("");
  const [carbonScore, setCarbonScore] = useState("");
  const [hasGeneratedCarbonWriteUp, setHasGeneratedCarbonWriteUp] = useState(false);
  const [isGeneratingCarbonWriteUp, setIsGeneratingCarbonWriteUp] = useState(false);
  const [tariffKeyInputs, setTariffKeyInputs] = useState("");
  const [tariffMaterialSelector, setTariffMaterialSelector] = useState("");
  const [tariffSector, setTariffSector] = useState("");
  const [tariffWriteUp, setTariffWriteUp] = useState("");
  const [tariffSourceLink, setTariffSourceLink] = useState(TARIFF_DATA_ANALYSIS.source);
  const [hasGeneratedTariffWriteUp, setHasGeneratedTariffWriteUp] = useState(false);
  const [isGeneratingTariff, setIsGeneratingTariff] = useState(false);
  const [riskAssessmentWriteUps, setRiskAssessmentWriteUps] = useState<Record<string, string>>(() => ({
    sba: RISK_ASSESSMENT_DATA.sbaLoanDefault.writeUp,
    mgmt: RISK_ASSESSMENT_DATA.managementTeam.writeUp,
    rev: RISK_ASSESSMENT_DATA.revenueStability.writeUp,
    health: RISK_ASSESSMENT_DATA.financialHealth.writeUp,
    comp: RISK_ASSESSMENT_DATA.competition.writeUp,
    cust: RISK_ASSESSMENT_DATA.customerSatisfaction.writeUp,
    supply: RISK_ASSESSMENT_DATA.supplyChain.writeUp,
    esg: RISK_ASSESSMENT_DATA.esg.writeUp,
    tariffImpact: RISK_ASSESSMENT_DATA.tariff.writeUp,
  }));
  const [editingRiskWriteUps, setEditingRiskWriteUps] = useState<Record<string, boolean>>({});
  const [refiningRiskWriteUps, setRefiningRiskWriteUps] = useState<Record<string, boolean>>({});
  const [excludedAssetValues, setExcludedAssetValues] = useState<Record<string, string>>({});
  const [assumptionManualValues, setAssumptionManualValues] = useState<Record<string, string>>({});
  const [assumptionDateValues, setAssumptionDateValues] = useState<Record<string, Date>>({});
  const [openAssumptionSections, setOpenAssumptionSections] = useState<Record<string, boolean>>({});
  const [uploadedCompsSheet, setUploadedCompsSheet] = useState<{ name: string; rows: string[][] } | null>(null);
  const [isCompsDragActive, setIsCompsDragActive] = useState(false);
  const [isProcessingCompsSheet, setIsProcessingCompsSheet] = useState(false);
  const [reportManualAssumptions, setReportManualAssumptions] = useState<Record<string, string>>({
    'Borrower 0-5Y Net Income CAGR Forecast': '0%',
    'Adjusted Short-Term Growth Rate': '3.00%',
    'Borrower 5-10Y sales CAGR forecast': '0%',
    'Adjusted long-term growth rate': '3.00%',
    'CAPEX': '-$10,000.00',
    'DCF Illiquidity Discount': '10%',
    'CSRP': '3.00%',
    'SP': '7.83%',
    'ERP': '5.00%',
    'SBA Spread': '3.00%',
    'x 1 - Tax Rate': '73.00%',
    'Weight of Equity': '78.00%',
    'Weight of Debt': '22.00%'
  });

  const VALUATION_TABS = ['Assumption', 'Dashboard', 'Market Comps', 'Risk Analysis', 'Report'];

  const ASSUMPTION_CATEGORIES = {
    'Weighted Tables': [
      'Dates',
      'Historical Financial Weighting',
      'Valuation Methodology Weighting',
      '2025 Projections'
    ],
    'Adjustment Tables': [
      'Rent Adjustment',
      'Owner\'s Compensation Adjustments',
      'Discretionary Personal Expenses',
      'Comparable Company Adjustments'
    ],
    'Assets Table': [
      'Excluded Assets',
      'Excess / Insufficient Cash',
      'Acquisition Stake Summary',
      'Risk Assessment / CSRP Error',
      'One-time Revenue / Expense Adjustments'
    ]
  };

  const toggleRatioGroup = (groupName: string) => {
    setExpandedRatioGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(name => name !== groupName) 
        : [...prev, groupName]
    );
  };

  const handleGenerateCarbonWriteUp = () => {
    setIsGeneratingCarbonWriteUp(true);
    window.setTimeout(() => {
      setCarbonWriteUp(CARBON_DATA_ANALYSIS.writeUp);
      setCarbonScore(CARBON_DATA_ANALYSIS.environmentalScore);
      setHasGeneratedCarbonWriteUp(true);
      setIsGeneratingCarbonWriteUp(false);
    }, 500);
  };

  const handleGenerateTariffAnalysis = () => {
    setIsGeneratingTariff(true);
    window.setTimeout(() => {
      setTariffKeyInputs(TARIFF_DATA_ANALYSIS.keyInputs);
      setTariffMaterialSelector(TARIFF_DATA_ANALYSIS.materialSelector);
      setTariffSector('Services');
      setTariffWriteUp(TARIFF_DATA_ANALYSIS.aiTariffRiskWriteUp);
      setHasGeneratedTariffWriteUp(true);
      setIsGeneratingTariff(false);
    }, 500);
  };

  const refineRiskWriteUpText = (text: string) =>
    text
      .split('\n')
      .map(line => line.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join('\n\n');

  const handleRiskWriteUpChange = (key: string, value: string) => {
    setRiskAssessmentWriteUps(prev => ({ ...prev, [key]: value }));
  };

  const handleRefineRiskWriteUp = (key: string) => {
    setRefiningRiskWriteUps(prev => ({ ...prev, [key]: true }));
    window.setTimeout(() => {
      setRiskAssessmentWriteUps(prev => ({
        ...prev,
        [key]: refineRiskWriteUpText(prev[key] ?? ''),
      }));
      setRefiningRiskWriteUps(prev => ({ ...prev, [key]: false }));
    }, 500);
  };

  const handleCancelRiskWriteUpEdit = (key: string, originalValue: string) => {
    setRiskAssessmentWriteUps(prev => ({ ...prev, [key]: originalValue }));
    setEditingRiskWriteUps(prev => ({ ...prev, [key]: false }));
  };

  const handleReportManualAssumptionChange = (item: string, value: string) => {
    setReportManualAssumptions(prev => ({ ...prev, [item]: value }));
  };

  const handleExcludedAssetChange = (label: string, value: string) => {
    setExcludedAssetValues(prev => ({ ...prev, [label]: value }));
  };

  const handleAssumptionManualChange = (key: string, value: string) => {
    setAssumptionManualValues(prev => ({ ...prev, [key]: value }));
  };

  const toggleAssumptionSection = (tableName: string) => {
    setOpenAssumptionSections(prev => ({ ...prev, [tableName]: !(prev[tableName] ?? true) }));
  };

  const handleAssumptionDateChange = (key: string, value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return;
    setAssumptionDateValues(prev => ({ ...prev, [key]: new Date(year, month - 1, day) }));
  };

  const getDateInputValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getAssumptionDate = (key: string, fallback: string) => {
    const manualDate = assumptionDateValues[key];
    if (manualDate) return manualDate;

    const parsedDate = new Date(fallback);
    if (Number.isNaN(parsedDate.getTime())) return new Date();
    return parsedDate;
  };

  const handleStartAssumptionInfoEdit = () => {
    setAssumptionInfoDraft(assumptionInfoNote);
    setIsEditingAssumptionInfo(true);
  };

  const handleSaveAssumptionInfoEdit = () => {
    setAssumptionInfoNote(assumptionInfoDraft);
    window.localStorage.setItem(ASSUMPTION_INFO_NOTE_STORAGE_KEY, assumptionInfoDraft);
    setIsEditingAssumptionInfo(false);
  };

  const handleCancelAssumptionInfoEdit = () => {
    setAssumptionInfoDraft(assumptionInfoNote);
    setIsEditingAssumptionInfo(false);
  };

  const handleStartDashboardInfoEdit = () => {
    setDashboardInfoDraft(dashboardInfoNote);
    setIsEditingDashboardInfo(true);
  };

  const handleSaveDashboardInfoEdit = () => {
    setDashboardInfoNote(dashboardInfoDraft);
    window.localStorage.setItem(DASHBOARD_INFO_NOTE_STORAGE_KEY, dashboardInfoDraft);
    setIsEditingDashboardInfo(false);
  };

  const handleCancelDashboardInfoEdit = () => {
    setDashboardInfoDraft(dashboardInfoNote);
    setIsEditingDashboardInfo(false);
  };

  const handleStartMarketCompsInfoEdit = () => {
    setMarketCompsInfoDraft(marketCompsInfoNote);
    setIsEditingMarketCompsInfo(true);
  };

  const handleSaveMarketCompsInfoEdit = () => {
    setMarketCompsInfoNote(marketCompsInfoDraft);
    window.localStorage.setItem(MARKET_COMPS_INFO_NOTE_STORAGE_KEY, marketCompsInfoDraft);
    setIsEditingMarketCompsInfo(false);
  };

  const handleCancelMarketCompsInfoEdit = () => {
    setMarketCompsInfoDraft(marketCompsInfoNote);
    setIsEditingMarketCompsInfo(false);
  };

  const handleStartRiskAnalysisInfoEdit = () => {
    setRiskAnalysisInfoDraft(riskAnalysisInfoNote);
    setIsEditingRiskAnalysisInfo(true);
  };

  const handleSaveRiskAnalysisInfoEdit = () => {
    setRiskAnalysisInfoNote(riskAnalysisInfoDraft);
    window.localStorage.setItem(RISK_ANALYSIS_INFO_NOTE_STORAGE_KEY, riskAnalysisInfoDraft);
    setIsEditingRiskAnalysisInfo(false);
  };

  const handleCancelRiskAnalysisInfoEdit = () => {
    setRiskAnalysisInfoDraft(riskAnalysisInfoNote);
    setIsEditingRiskAnalysisInfo(false);
  };

  const handleStartReportInfoEdit = () => {
    setReportInfoDraft(reportInfoNote);
    setIsEditingReportInfo(true);
  };

  const handleSaveReportInfoEdit = () => {
    setReportInfoNote(reportInfoDraft);
    window.localStorage.setItem(REPORT_INFO_NOTE_STORAGE_KEY, reportInfoDraft);
    setIsEditingReportInfo(false);
  };

  const handleCancelReportInfoEdit = () => {
    setReportInfoDraft(reportInfoNote);
    setIsEditingReportInfo(false);
  };

  const renderAssumptionInfoNote = (note: string) => {
    const headingLabels = [
      'What is this tab',
      'What is this tab (Functional)',
      'Input Sources',
      'Used in (Functional Usage )',
      'In simple terms:',
      'It is used to:',
      'It includes inputs related to:',
      'Dates / 2025 Projections',
      'Historical Financial Weighting',
      'Valuation Methodology Weighting',
      'Adjustments (General)',
      'Rent Adjustment',
      "Owner's Compensation Adjustments",
      'Discretionary Personal Expenses',
      'One-time Revenue / Expense Adjustments',
      'Comparable Company Adjustments',
      'Excluded Assets',
      'Excess / Insufficient Cash',
      'Acquisition Stake Summary',
      'Risk Assessment / CSRP Error',
      'Input Source:',
      'Used In:'
    ];

    return note.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      const isHeading = headingLabels.includes(trimmedLine);
      const isBullet = trimmedLine.startsWith('- ');

      if (!trimmedLine) {
        return <div key={index} className="h-2" />;
      }

      if (isHeading) {
        return <p key={index} className="font-semibold text-gray-800">{trimmedLine}</p>;
      }

      if (isBullet) {
        return <p key={index} className="pl-4 text-gray-700">{trimmedLine}</p>;
      }

      return <p key={index} className="text-gray-700">{line}</p>;
    });
  };

  const importCompsSheet = (file: File) => {
    if (!file) return;
    setUploadedCompsSheet(null);
    setIsProcessingCompsSheet(true);

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const rows = text
        .split(/\r?\n/)
        .map(line => line.split(',').map(cell => cell.trim()))
        .filter(row => row.some(cell => cell.length > 0));

      window.setTimeout(() => {
        setUploadedCompsSheet({
          name: file.name,
          rows: rows.length > 0 ? rows : [[file.name, 'Uploaded file preview is available for CSV-style sheet content only.']]
        });
        setIsProcessingCompsSheet(false);
      }, 5000);
    };
    reader.onerror = () => setIsProcessingCompsSheet(false);
    reader.readAsText(file);
  };

  const handleCompsSheetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    importCompsSheet(file);
    event.target.value = '';
  };

  const handleCompsSheetDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsCompsDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    importCompsSheet(file);
  };

  const parseCurrencyInput = (value: string) => {
    const parsed = Number(value.replace(/[^0-9.-]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatCurrencyValue = (value: number) => value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const getExcludedAssetValue = (label: string, fallback: string) => excludedAssetValues[label] ?? fallback;

  const getExcludedAssetTotal = (type: 'fixed' | 'current' | 'all') => {
    const fixedLabels = [
      'Fixed excluded asset 1',
      'Fixed excluded asset 2',
      'Fixed excluded asset 3',
      'Fixed excluded asset 4',
      'Fixed excluded asset 5'
    ];
    const currentLabels = [
      'Current excluded asset 1',
      'Current excluded asset 2',
      'Current excluded asset 3',
      'Current excluded asset 4',
      'Current excluded asset 5'
    ];
    const labels = type === 'fixed' ? fixedLabels : type === 'current' ? currentLabels : [...fixedLabels, ...currentLabels];
    return formatCurrencyValue(labels.reduce((sum, label) => sum + parseCurrencyInput(getExcludedAssetValue(label, '')), 0));
  };

  const getCalculatedExcludedAssetValue = (row: any) => {
    if (row.label === 'Value of excluded fixed assets') return getExcludedAssetTotal('fixed');
    if (row.label === 'Value of excluded current assets') return getExcludedAssetTotal('current');
    if (row.label === 'Value of all excluded assets (fixed and current)') return getExcludedAssetTotal('all');
    return getExcludedAssetValue(row.label, row.value);
  };

  const isManualReportInput = (note?: string) => note?.includes('Manual') ?? false;

  const renderWaccRows = (rows: Array<{ label: string; value: string; source?: string; note?: string }>, highlightLast = false) => (
    <table className="w-full text-xs">
      <thead className="bg-gray-50/60 text-gray-400 uppercase tracking-wider">
        <tr>
          <th className="py-2 px-2 text-left">Item</th>
          <th className="py-2 px-2 text-right">Value</th>
          <th className="py-2 px-2 text-left">Source</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {rows.map((item, i) => {
          const isHighlighted = highlightLast && i === rows.length - 1;
          return (
            <tr key={item.label} className={isHighlighted ? 'bg-[#2a433a] text-white' : ''}>
              <td className={`py-2 px-2 ${isHighlighted ? 'font-bold' : 'text-gray-600'}`}>{item.label}</td>
              <td className="py-2 px-2 text-right font-bold">
                {isManualReportInput(item.note) ? (
                  <input
                    value={reportManualAssumptions[item.label] ?? item.value}
                    onChange={(e) => handleReportManualAssumptionChange(item.label, e.target.value)}
                    className="w-24 px-2 py-1 bg-amber-50/30 border border-amber-100 rounded text-right text-xs font-bold text-[#2a433a] focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                ) : (
                  item.value
                )}
              </td>
              <td className={`py-2 px-2 ${isHighlighted ? 'text-white/70' : 'text-gray-500'}`}>{item.source || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderExplanationField = (title: string, value: string, setter: (val: string) => void) => (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mt-4 mb-6">
      <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100">
        <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-4">
        <textarea
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="w-full h-32 text-xs text-gray-600 bg-amber-50/30 border border-amber-100 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
          placeholder={`Enter ${title.toLowerCase()}...`}
        />
      </div>
    </div>
  );

  const renderExplanationFields = () => (
    <div className="space-y-6 mt-4">
      {renderExplanationField("Explanation", weightedExplanation, setWeightedExplanation)}
      {renderExplanationField("Explaination", onboardingExplanation, setOnboardingExplanation)}
    </div>
  );

  const renderTableWithWrapper = (tableName: string) => {
    const isOpen = openAssumptionSections[tableName] ?? false;

    return (
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => toggleAssumptionSection(tableName)}
          className="text-xs font-bold text-[#2a433a] uppercase tracking-wider flex items-center gap-2"
          aria-expanded={isOpen}
        >
          <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? '' : '-rotate-90'}`} />
          {tableName}
        </button>
        {isOpen && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
            {renderAssumptionTable(tableName)}
          </div>
        )}
      </div>
    );
  };

  const renderAdjustedIncomeTable = () => (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Business P&L - Adjusted Income Statement</h3>
        <span className="text-xs text-gray-400 font-medium">USD ($)</span>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/30">
            <tr className="border-b border-gray-50">
              <th className="px-4 py-2 font-bold text-gray-500 min-w-[140px]">Description</th>
              <th className="px-3 py-2 font-bold text-gray-600 text-right">2022</th>
              <th className="px-3 py-2 font-bold text-gray-600 text-right">2023</th>
              <th className="px-3 py-2 font-bold text-gray-600 text-right">2024</th>
              <th className="px-3 py-2 font-bold text-gray-600 text-right">Interim</th>
              <th className="px-4 py-2 font-bold text-gray-600 text-right bg-emerald-50/30">Projected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {ADJUSTED_INCOME_DATA.map((row, i) => (
              <tr key={i} className={`hover:bg-gray-50/50 ${row.isTotal ? 'bg-gray-50/20' : ''}`}>
                <td className={`px-4 py-2 ${row.isTotal ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{row.label}</td>
                <td className={`px-3 py-2 text-right ${row.isTotal ? 'font-bold' : ''}`}>{row['2022']}</td>
                <td className={`px-3 py-2 text-right ${row.isTotal ? 'font-bold' : ''}`}>{row['2023']}</td>
                <td className={`px-3 py-2 text-right ${row.isTotal ? 'font-bold' : ''}`}>{row['2024']}</td>
                <td className={`px-3 py-2 text-right ${row.isTotal ? 'font-bold' : ''}`}>{row.interim}</td>
                <td className={`px-4 py-2 text-right font-bold bg-emerald-50/10 ${row.highlight ? (row.theme === 'emerald' ? 'text-emerald-700 bg-emerald-50/50' : 'text-gray-900') : 'text-gray-600'}`}>{row.projections}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderWeightedIncomeTable = () => (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100">
        <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Weighted Income Statement</h3>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/30 text-gray-500 font-bold">
            <tr className="border-b border-gray-50">
              <th className="px-4 py-2 min-w-[140px]">Period</th>
              <th className="px-4 py-2 text-right">EBITDA</th>
              <th className="px-4 py-2 text-right">Weight</th>
              <th className="px-4 py-2 text-right">Weighted EBITDA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {WEIGHTED_INCOME_DATA.map((row, i) => (
              <tr key={i} className={`hover:bg-gray-50/50 ${row.isTotal ? 'bg-[#2a433a]/5' : ''}`}>
                <td className={`px-4 py-2.5 ${row.isTotal ? 'font-bold text-[#2a433a]' : 'text-gray-600'}`}>{row.period}</td>
                <td className="px-4 py-2.5 text-right font-medium text-gray-700">{row.ebitda}</td>
                <td className="px-4 py-2.5 text-right font-bold text-gray-400">{row.weight}</td>
                <td className={`px-4 py-2.5 text-right font-bold ${row.isTotal ? 'text-[#2a433a] text-xs' : 'text-gray-900'}`}>{row.weightedEbitda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAdjustedBookValueTable = () => (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100">
        <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Adjusted Book Value Method</h3>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <tbody className="divide-y divide-gray-50">
            {ADJUSTED_BOOK_VALUE_DATA.map((row, i) => (
              <tr key={i} className={`hover:bg-gray-50/50 ${i === ADJUSTED_BOOK_VALUE_DATA.length - 1 ? 'border-b-4 border-double border-gray-300' : ''}`}>
                <td className={`px-4 py-2 ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-600 italic'}`}>{row.label}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <span className="text-gray-400">$</span>
                    <div className={`min-w-[80px] ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-900'}`}>
                      {row.isEditable ? (
                        <input 
                          type="text" 
                          defaultValue={row.value}
                          className="w-full text-right bg-amber-100/50 border border-amber-200 rounded px-1 focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold"
                        />
                      ) : row.value.replace('$', '')}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGoodwillCalculationTable = () => (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100">
        <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Calculation of Goodwill</h3>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <tbody className="divide-y divide-gray-50">
            {GOODWILL_CALCULATION_DATA.map((row, i) => (
              <tr key={i} className={`hover:bg-gray-50/50 ${row.highlight ? 'bg-emerald-50/30' : ''} ${i === GOODWILL_CALCULATION_DATA.length - 1 ? 'border-b-4 border-double border-gray-300' : ''}`}>
                <td className={`px-4 py-2 ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-600 italic'}`}>{row.label}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end items-center gap-4">
                    <span className="text-gray-400">$</span>
                    <div className={`min-w-[80px] ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-900'} ${row.highlight ? 'text-emerald-700' : ''}`}>
                      {row.value.replace('$', '')}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRatioAnalysisTable = () => (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100">
        <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Ratio Analysis</h3>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <table className="w-full text-left text-xs">
          {RATIO_ANALYSIS_DATA.map((group, groupIdx) => {
            const isExpanded = expandedRatioGroups.includes(group.group);
            const hasOptionalItems = group.items.some(item => item.isOptional);
            const visibleItems = isExpanded 
              ? group.items 
              : group.items.filter(item => !item.isOptional);

            return (
              <React.Fragment key={groupIdx}>
                <thead className="bg-gray-50/50">
                  <tr>
                    <th colSpan={6} className="px-4 py-1.5 font-bold text-[#2a433a] text-xs uppercase tracking-widest border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span>{group.group}</span>
                        {hasOptionalItems && (
                          <button 
                            onClick={() => toggleRatioGroup(group.group)}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
                          >
                            {isExpanded ? 'HIDE OPTIONAL' : 'SHOW OPTIONAL'}
                            <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    </th>
                  </tr>
                  <tr className="text-gray-400 font-bold border-b border-gray-50">
                    <th className="px-4 py-1.5 font-bold text-gray-500 min-w-[140px]">Statement Type</th>
                    <th className="px-2 py-1.5 text-right text-gray-600">Tax Return</th>
                    <th className="px-2 py-1.5 text-right text-gray-600">Tax Return</th>
                    <th className="px-2 py-1.5 text-right text-gray-600">Tax Return</th>
                    <th className="px-2 py-1.5 text-right text-gray-600">Interim</th>
                    <th className="px-3 py-1.5 text-right text-[#2a433a]">Weighted Average</th>
                  </tr>
                  <tr className="text-gray-400 font-bold border-b border-gray-50 bg-gray-50/20">
                    <th className="px-4 py-1 font-bold text-gray-500">Statement Date</th>
                    <th className="px-2 py-1 text-right">12/31/2022</th>
                    <th className="px-2 py-1 text-right">12/31/2023</th>
                    <th className="px-2 py-1 text-right">12/31/2024</th>
                    <th className="px-2 py-1 text-right">7/31/2025</th>
                    <th className="px-3 py-1 text-right">-</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 mb-4 last:mb-0">
                  {visibleItems.map((item, itemIdx) => (
                    <tr key={itemIdx} className={`hover:bg-gray-50/50 ${item.isOptional ? 'bg-emerald-50/30' : ''}`}>
                      <td className="px-4 py-2 text-gray-600 font-medium flex items-center gap-2">
                        {item.ratio}
                        {item.isOptional && <span className="text-xs bg-emerald-100 text-emerald-700 px-1 rounded-sm uppercase tracking-tighter">Optional</span>}
                      </td>
                      <td className="px-2 py-2 text-right">{item['2022']}</td>
                      <td className="px-2 py-2 text-right">{item['2023']}</td>
                      <td className="px-2 py-2 text-right">{item['2024']}</td>
                      <td className="px-2 py-2 text-right text-gray-600">{item.interim}</td>
                      <td className="px-3 py-2 text-right font-bold text-[#2a433a]">
                        {item.average !== '-' || item.ratio === 'Interest Coverage Ratio' ? item.average : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tr className="h-2 bg-transparent"></tr>
              </React.Fragment>
            );
          })}
        </table>
        <div className="m-4 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-[#2a433a]/5 rounded-xl border border-[#2a433a]/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trailing Earnings Growth</p>
            <p className="text-lg font-black text-[#2a433a] mt-1">0.53%</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Forward Earnings Growth</p>
            <p className="text-lg font-black text-emerald-700 mt-1">3%</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssumptionTable = (tableName: string) => {
    const data = MOCK_ASSUMPTION_DATA[tableName];
    if (!data) return null;
    
    switch (tableName) {
      case 'Dates':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Metric</th>
                <th className="px-4 py-2 font-bold text-gray-600">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => {
                const dateKey = `dates-${row.label}`;
                const dateValue = getAssumptionDate(dateKey, row.value);

                return (
                  <tr key={i}>
                    <td className="px-4 py-2.5 text-gray-700">{row.label}</td>
                    <td className="px-4 py-2.5 font-medium">
                      <input
                        type="date"
                        value={getDateInputValue(dateValue)}
                        onChange={(e) => handleAssumptionDateChange(dateKey, e.target.value)}
                        className="w-full max-w-[180px] rounded border border-gray-200 bg-white px-2 py-1 text-xs font-semibold text-gray-700 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      case 'Historical Financial Weighting':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Period</th>
                <th className="px-4 py-2 font-bold text-gray-600">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700">{row.period}</td>
                  <td className="px-4 py-2.5">
                    <input
                      value={assumptionManualValues[`historical-${row.period}`] ?? row.weight}
                      onChange={(e) => handleAssumptionManualChange(`historical-${row.period}`, e.target.value)}
                      className="w-24 px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs font-bold text-[#2a433a] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Rent Adjustment':
        const columns = data.columns || [];
        const rows = data.rows || [];
        return (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-4 py-2 font-bold text-gray-500 border border-gray-100 min-w-[250px]"></th>
                  {columns.map((col: string) => (
                    <th key={col} className="px-4 py-2 font-bold text-gray-600 text-center border border-gray-100 min-w-[100px]">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map((row: any, i: number) => (
                  <tr key={i} className={`${row.isHighlighted ? 'bg-[#b4aad4]/30' : 'hover:bg-gray-50/50'}`}>
                    <td className={`px-4 py-2 border border-gray-100 ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                      {row.label}
                    </td>
                    {row.isFullWidth ? (
                      <td colSpan={columns.length} className="px-4 py-2 border border-gray-100 text-gray-600 italic">
                        {Object.values(row.values)[0] as string}
                      </td>
                    ) : (
                      columns.map((col: string) => (
                        <td key={col} className={`px-4 py-2 border border-gray-100 text-center ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                          {row.values[col] || (row.label === 'Does company own the space that it rents?' && col === '2022' ? (
                            <div className="inline-block px-4 py-1 bg-gray-100 rounded-full text-[10px] font-bold">No</div>
                          ) : '')}
                          {row.label === 'Does company own the space that it rents?' && col === columns[0] && row.extra && (
                            <span className="ml-2 text-[10px] text-gray-400 font-medium italic">{row.extra}</span>
                          )}
                        </td>
                      ))
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Excess / Insufficient Cash':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Description</th>
                <th className="px-4 py-2 font-bold text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700">{row.description}</td>
                  <td className="px-4 py-2.5 font-medium">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Valuation Methodology Weighting':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Method</th>
                <th className="px-4 py-2 font-bold text-gray-600">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700">{row.method}</td>
                  <td className="px-4 py-2.5">
                    <input
                      value={assumptionManualValues[`valuation-${row.method}`] ?? row.weight}
                      onChange={(e) => handleAssumptionManualChange(`valuation-${row.method}`, e.target.value)}
                      className="w-24 px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs font-bold text-[#2a433a] focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Excluded Assets':
        return (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/30">
                <tr>
                  <th className="px-4 py-2 font-bold text-gray-600 min-w-[260px]">Description</th>
                  <th className="px-4 py-2 font-bold text-gray-600 min-w-[220px]">Value</th>
                  <th className="px-4 py-2 font-bold text-gray-600 min-w-[320px]">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.rows.map((row: any, i: number) => {
                  const currentValue = getCalculatedExcludedAssetValue(row);
                  return (
                    <tr key={i} className={`${row.isTotal ? 'bg-emerald-50/40' : 'hover:bg-gray-50/50'}`}>
                      <td className={`px-4 py-2.5 ${row.isTotal ? 'font-bold text-[#2a433a]' : 'text-gray-700'}`}>{row.label}</td>
                      <td className="px-4 py-2.5">
                        {row.isManual ? (
                          row.isExplanation ? (
                            <textarea
                              value={currentValue}
                              onChange={(e) => handleExcludedAssetChange(row.label, e.target.value)}
                              className="w-full h-16 px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
                            />
                          ) : (
                            <input
                              value={currentValue}
                              onChange={(e) => handleExcludedAssetChange(row.label, e.target.value)}
                              className="w-full px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          )
                        ) : (
                          <span className={`font-bold ${row.isTotal ? 'text-[#2a433a]' : 'text-gray-700'}`}>{row.value}</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-gray-500 leading-relaxed">{row.notes || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      case 'Owner\'s Compensation Adjustments':
        const ownerColumns = data.columns || [];
        const ownerRows = data.rows || [];
        return (
          <div className="space-y-4">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-4 py-2 font-bold text-gray-500 border border-gray-100 min-w-[260px]"></th>
                    {ownerColumns.map((col: string) => (
                      <th key={col} className="px-4 py-2 font-bold text-gray-600 text-center border border-gray-100 min-w-[140px]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ownerRows.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50/50">
                      <td className={`px-4 py-2 border border-gray-100 ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                        {row.label}
                      </td>
                      {ownerColumns.map((col: string) => (
                        <td key={col} className={`px-4 py-2 border border-gray-100 text-center ${row.isBold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                          {row.values[col] || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-3 p-3 bg-gray-50/40 border-t border-gray-100">
              {data.explanations.map((item: any) => (
                <div key={item.label} className="bg-white rounded-lg border border-gray-100 p-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{item.label}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Acquisition Stake Summary':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Metric</th>
                <th className="px-4 py-2 font-bold text-gray-600">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700">{row.label}</td>
                  <td className="px-4 py-2.5">
                    <textarea
                      value={assumptionManualValues[`acquisition-${row.label}`] ?? row.value}
                      onChange={(e) => handleAssumptionManualChange(`acquisition-${row.label}`, e.target.value)}
                      className="w-full h-24 px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '2025 Projections':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Projection Field</th>
                <th className="px-4 py-2 font-bold text-gray-600">{projectedCommonSizingBasisLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700">{row.label}</td>
                  <td className="px-4 py-2.5 font-bold">
                    {row.isManual ? (
                      <input
                        value={assumptionManualValues[`projection-${row.label}`] ?? row.value}
                        onChange={(e) => handleAssumptionManualChange(`projection-${row.label}`, e.target.value)}
                        className="w-28 px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs font-bold text-[#2a433a] focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    ) : (
                      row.value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Discretionary Personal Expenses':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Item</th>
                <th className="px-4 py-2 font-bold text-gray-600">Amount</th>
                <th className="px-4 py-2 font-bold text-gray-600">Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700">{row.item}</td>
                  <td className="px-4 py-2.5 font-bold text-emerald-600">{row.amount}</td>
                  <td className="px-4 py-2.5 text-gray-500">{row.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Risk Assessment / CSRP Error':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Risk Factor</th>
                <th className="px-4 py-2 font-bold text-gray-600">Premium / Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className={`px-4 py-2.5 ${row.totalCSRP ? 'font-bold bg-gray-50' : 'text-gray-700'}`}>{row.riskFactor || row.totalCSRP}</td>
                  <td className={`px-4 py-2.5 font-bold ${row.totalCSRP ? 'bg-gray-50 text-red-600' : 'text-gray-900'}`}>{row.premium || row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'One-time Revenue / Expense Adjustments':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Description</th>
                <th className="px-4 py-2 font-bold text-gray-600">Amount</th>
                <th className="px-4 py-2 font-bold text-gray-600">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700">{row.description}</td>
                  <td className={`px-4 py-2.5 font-bold ${row.amount.includes('(') ? 'text-emerald-600' : 'text-red-600'}`}>{row.amount}</td>
                  <td className="px-4 py-2.5 text-gray-500">{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'Comparable Company Adjustments':
        return (
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/30">
              <tr>
                <th className="px-4 py-2 font-bold text-gray-600">Peer</th>
                <th className="px-4 py-2 font-bold text-gray-600">LTM EBITDA</th>
                <th className="px-4 py-2 font-bold text-gray-600">Size Adj</th>
                <th className="px-4 py-2 font-bold text-gray-600">Growth Adj</th>
                <th className="px-4 py-2 font-bold text-gray-600">Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Array.isArray(data) && data.map((row: any, i: number) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 text-gray-700 font-medium">{row.peer}</td>
                  <td className="px-4 py-2.5">{row.ltmEbitda}</td>
                  <td className="px-4 py-2.5 text-red-500">{row.sizeAdjustment}</td>
                  <td className="px-4 py-2.5 text-emerald-500">{row.growthAdjustment}</td>
                  <td className="px-4 py-2.5 font-bold text-[#2a433a]">{row.finalMultiple}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  const renderMarketCompsTab = () => {
    const selectedSet = COMPARABLE_SETS.find(set => set.id === selectedCompSet) || COMPARABLE_SETS[0];

    return (
      <div className="p-4 space-y-6 overflow-y-auto h-full no-scrollbar bg-gray-50/30">
        {/* Comps Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
              Comps
            </h2>
            {(uploadedCompsSheet || isProcessingCompsSheet) && (
              <label className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold text-[#2a433a] hover:bg-gray-50 cursor-pointer shadow-sm">
                Upload another sheet
                <input
                  type="file"
                  accept=".csv,.txt,.xls,.xlsx"
                  onChange={handleCompsSheetUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {isProcessingCompsSheet ? (
            <div className="mx-auto flex min-h-[360px] w-full max-w-3xl flex-col items-center justify-center rounded-xl border border-emerald-100 bg-white px-6 py-10 text-center shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <RefreshCw className="h-7 w-7 animate-spin" />
              </div>
              <p className="text-base font-black text-[#2a433a]">Splitting your sheet into 3 comp sets</p>
              <p className="mt-2 max-w-md text-xs font-medium leading-relaxed text-gray-500">
                Reading the uploaded sheet, separating the comparable companies into clean groups, and getting the market comps view ready.
              </p>
              <div className="mt-5 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-emerald-50">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-500"></div>
              </div>
            </div>
          ) : !uploadedCompsSheet ? (
            <label
              onDragOver={(event) => {
                event.preventDefault();
                setIsCompsDragActive(true);
              }}
              onDragLeave={() => setIsCompsDragActive(false)}
              onDrop={handleCompsSheetDrop}
              className={`mx-auto flex min-h-[360px] w-full max-w-3xl cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white px-6 py-10 text-center shadow-sm transition-all ${
                isCompsDragActive ? 'border-emerald-500 bg-emerald-50/50' : 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/20'
              }`}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <UploadCloud className="h-8 w-8" />
              </div>
              <p className="text-base font-black text-[#2a433a]">Upload market comps sheet</p>
              <p className="mt-2 max-w-md text-xs font-medium leading-relaxed text-gray-500">
                Drag and drop a CSV, TXT, XLS, or XLSX file here, or click this area to choose a file from your computer.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2a433a] px-4 py-2 text-xs font-bold text-white shadow-sm">
                <FileSpreadsheet className="h-4 w-4" />
                Select sheet file
              </div>
              <input
                type="file"
                accept=".csv,.txt,.xls,.xlsx"
                onChange={handleCompsSheetUpload}
                className="hidden"
              />
            </label>
          ) : (
            <>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Comparable Data Set</h3>
                  <div className="relative min-w-[200px]">
                    <select
                      value={selectedCompSet}
                      onChange={(e) => setSelectedCompSet(e.target.value)}
                      className="w-full appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold text-[#2a433a] focus:outline-none focus:ring-2 focus:ring-[#2a433a]/10 cursor-pointer shadow-sm"
                    >
                      {COMPARABLE_SETS.map(set => (
                        <option key={set.id} value={set.id}>{set.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-2.5 font-bold text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-6 py-2.5 font-bold text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-2.5 text-right font-bold text-gray-500 uppercase tracking-wider">Net Sales</th>
                        <th className="px-6 py-2.5 text-right font-bold text-gray-500 uppercase tracking-wider">Gross Profit</th>
                        <th className="px-6 py-2.5 text-right font-bold text-gray-500 uppercase tracking-wider">Valuation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {selectedSet.companies.map((company, i) => (
                        <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-2.5 text-gray-900 font-semibold">{company.company}</td>
                          <td className="px-6 py-2.5 text-gray-600">{company.description}</td>
                          <td className="px-6 py-2.5 text-right text-gray-700">{company.netSales}</td>
                          <td className="px-6 py-2.5 text-right text-gray-700">{company.grossProfit}</td>
                          <td className="px-6 py-2.5 text-right font-bold text-[#2a433a]">{company.valuation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>

        {/* KPI Dashboard Section */}
        {uploadedCompsSheet && <section className="space-y-3">
          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
            <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
              KPI Dashboard BHS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Info Card */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Company Name</label>
                  <p className="text-sm font-bold text-[#2a433a]">{KPI_DASHBOARD_BHS.companyInfo.name}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Customer ID</label>
                  <p className="text-sm font-bold text-gray-700">{KPI_DASHBOARD_BHS.companyInfo.customerId}</p>
                </div>
              </div>

              {/* Health Score Card */}
              <div className="bg-[#2a433a] p-5 rounded-xl shadow-lg text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-4">Business Health Score</h3>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-4xl font-bold tracking-tighter">{KPI_DASHBOARD_BHS.healthScore.score}</span>
                      <span className="text-xs font-medium opacity-60 ml-2">/ 100</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs font-bold uppercase tracking-widest opacity-60">Status</span>
                      <span className="text-xs font-bold text-emerald-400 uppercase">{KPI_DASHBOARD_BHS.healthScore.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs font-bold opacity-60 uppercase tracking-wider mb-0.5">Targets Total</p>
                      <p className="text-xl font-bold">{KPI_DASHBOARD_BHS.healthScore.targetsTotal}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold opacity-60 uppercase tracking-wider mb-0.5">Targets Achieved</p>
                      <p className="text-xl font-bold">{KPI_DASHBOARD_BHS.healthScore.targetsAchieved}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* KPI Table Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-2.5 font-bold text-gray-500 uppercase tracking-wider">KPI Metric</th>
                        <th className="px-6 py-2.5 text-right font-bold text-gray-500 uppercase tracking-wider">Target</th>
                        <th className="px-6 py-2.5 text-right font-bold text-gray-500 uppercase tracking-wider">Actual Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {KPI_DASHBOARD_BHS.kpis.map((kpi, i) => (
                        <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-2 text-gray-700 font-medium">{kpi.metric}</td>
                          <td className="px-6 py-2 text-right text-gray-500 font-bold">{kpi.target}</td>
                          <td className={`px-6 py-2 text-right font-bold ${kpi.value ? 'text-[#2a433a]' : 'text-gray-300'}`}>
                            {kpi.value || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>}
      </div>
    );
  };

  const renderRiskAnalysisTab = () => {
    const preRiskTabs = [
      { id: 'sba', title: 'SBA Loan Default', helper: 'Loan history and charge-off scorecard' },
      { id: 'carbon', title: 'Carbon Emissions', helper: 'Environmental inputs and risk write-up' },
      { id: 'tariff', title: 'Tariff Exposure', helper: 'Materials, industry exposure, and tariff impact' },
    ];
    const tariffBasicFields = TARIFF_DATA_ANALYSIS.formulaFields.filter(field => field.label !== 'List of industries');
    const riskAnalysisSections = [
      { id: 'preRisk', title: 'Pre Risk', icon: Search },
      { id: 'riskAssessment', title: 'Risk Assessment', icon: BarChart3 },
    ];
    const tariffRawMaterialChips = tariffKeyInputs
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
    const tariffMaterialSelectorChips = tariffMaterialSelector
      .split(';')
      .map(item => item.trim())
      .filter(Boolean);

    const sections = [
      { id: 'sba', title: 'SBA Loan Default', data: RISK_ASSESSMENT_DATA.sbaLoanDefault },
      { id: 'mgmt', title: 'Management Team', data: RISK_ASSESSMENT_DATA.managementTeam },
      { id: 'rev', title: 'Revenue Stability', data: RISK_ASSESSMENT_DATA.revenueStability },
      { id: 'health', title: 'Financial Health', data: RISK_ASSESSMENT_DATA.financialHealth },
      { id: 'comp', title: 'Competition', data: RISK_ASSESSMENT_DATA.competition },
      { id: 'cust', title: 'Customer Satisfaction', data: RISK_ASSESSMENT_DATA.customerSatisfaction },
      { id: 'supply', title: 'Supply Chain', data: RISK_ASSESSMENT_DATA.supplyChain },
      { id: 'esg', title: 'ESG Risk', data: RISK_ASSESSMENT_DATA.esg }
    ];

    return (
      <div className="p-4 space-y-6 overflow-y-auto h-full no-scrollbar bg-gray-50/30">
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 w-full">
            {riskAnalysisSections.map((tab) => {
              const isActive = activeRiskAnalysisSection === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveRiskAnalysisSection(tab.id)}
                  className={`w-full px-6 py-4 text-left border-r border-gray-100 transition-all ${
                    isActive
                      ? 'bg-gradient-to-t from-emerald-200 via-emerald-50 to-white text-[#2a433a] border-b-4 border-b-emerald-600'
                      : 'bg-white text-gray-400 border-b-4 border-b-transparent hover:bg-gray-50 hover:text-gray-600'
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm font-bold">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                    {tab.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pre Risk Analysis Section */}
        {activeRiskAnalysisSection === 'preRisk' && (
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
              Pre Risk Analysis
            </h2>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {preRiskTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePreRiskTab(tab.id)}
                  className={`text-left rounded-lg px-4 py-3 border transition-all ${
                    activePreRiskTab === tab.id
                      ? 'bg-[#2a433a] text-white border-[#2a433a] shadow-sm'
                      : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="block text-[11px] font-black uppercase tracking-widest">{tab.title}</span>
                  <span className={`block text-[10px] font-medium mt-1 leading-tight ${
                    activePreRiskTab === tab.id ? 'text-white/70' : 'text-gray-400'
                  }`}>
                    {tab.helper}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Carbon Data Analysis */}
          {activePreRiskTab === 'carbon' && (
          <div className="order-last bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Carbon Data Analysis</h3>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Environmental risk inputs, write-up generation, and scoring</p>
              </div>
              {hasGeneratedCarbonWriteUp && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Environmental Score</span>
                  <span className="w-7 h-7 rounded-full bg-[#2a433a] text-white flex items-center justify-center text-xs font-black">
                    {carbonScore || '-'}
                  </span>
                </div>
              )}
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Formula Inputs</h4>
                    <span className="text-[9px] font-black text-[#2a433a] bg-[#2a433a]/5 px-2 py-1 rounded-full border border-[#2a433a]/10">Read only</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CARBON_DATA_ANALYSIS.formulaFields.map((field) => (
                      <label key={field.label} className="block">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{field.label}</span>
                        <input
                          value={field.value}
                          readOnly
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-[#2a433a] focus:outline-none"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manual Inputs</h4>
                    <span className="text-[9px] font-black text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">User editable</span>
                  </div>
                  <div className="space-y-2">
                    {CARBON_DATA_ANALYSIS.manualFields.map((field) => (
                      <label key={field.key} className="block">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{field.label}</span>
                        {field.value.length > 90 ? (
                          <textarea
                            value={carbonManualInputs[field.key] ?? ''}
                            onChange={(e) => setCarbonManualInputs(prev => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full h-16 px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none leading-relaxed"
                          />
                        ) : (
                          <input
                            value={carbonManualInputs[field.key] ?? ''}
                            onChange={(e) => setCarbonManualInputs(prev => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-100">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Context</h4>
                  <textarea
                    value={CARBON_DATA_ANALYSIS.context}
                    readOnly
                    className="w-full h-40 px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 focus:outline-none resize-none leading-relaxed"
                  />
                  <button
                    onClick={handleGenerateCarbonWriteUp}
                    disabled={isGeneratingCarbonWriteUp}
                    className="w-full px-4 py-2.5 bg-[#2a433a] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#1a2d26] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm active:scale-[0.99]"
                  >
                    {isGeneratingCarbonWriteUp ? 'Generating...' : 'Generate Write Up'}
                  </button>
                </div>
              </div>

              {hasGeneratedCarbonWriteUp && (
                <div className="pt-5 border-t border-gray-100">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Write Up</h4>
                      <span className="text-[9px] font-black text-[#2a433a] bg-[#2a433a]/5 px-2 py-1 rounded-full border border-[#2a433a]/10">
                        Environmental score: {carbonScore || '-'}
                      </span>
                    </div>
                    <textarea
                      value={carbonWriteUp}
                      onChange={(e) => setCarbonWriteUp(e.target.value)}
                      className="w-full h-48 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#2a433a] resize-none leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          )}

          {/* Section 5: Tariff Data Analysis */}
          {activePreRiskTab === 'tariff' && (
          <div className="order-last bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Tariff Data Analysis</h3>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Basic business data, AI-selected inputs, industry category, and tariff exposure</p>
              </div>
              <button
                onClick={handleGenerateTariffAnalysis}
                disabled={isGeneratingTariff}
                className="px-4 py-2 bg-[#2a433a] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#1a2d26] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
              >
                {isGeneratingTariff ? 'Generating...' : 'Generate Tariff Analysis'}
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Basic Info</h4>
                    <span className="text-[9px] font-black text-[#2a433a] bg-[#2a433a]/5 px-2 py-1 rounded-full border border-[#2a433a]/10">Formula input</span>
                  </div>
                  <div className="space-y-2">
                    {tariffBasicFields.map((field) => (
                      <React.Fragment key={field.label}>
                        <label className="block">
                          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{field.label}</span>
                          {field.value.length > 120 ? (
                            <textarea
                              value={field.value}
                              readOnly
                              className="w-full h-20 px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 focus:outline-none resize-none leading-relaxed"
                            />
                          ) : (
                            <input
                              value={field.value}
                              readOnly
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-[#2a433a] focus:outline-none"
                            />
                          )}
                        </label>
                        {field.label === 'Product / service' && (
                          <label className="block">
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tariff source link</span>
                            <input
                              value={tariffSourceLink}
                              onChange={(e) => setTariffSourceLink(e.target.value)}
                              className="w-full px-3 py-2 bg-amber-50/30 border border-amber-100 rounded-lg text-xs text-blue-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </label>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/30 rounded-xl border border-emerald-100">
                    <h4 className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-2">Raw Materials</h4>
                    {tariffRawMaterialChips.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {tariffRawMaterialChips.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 rounded-full bg-white border border-emerald-100 text-[10px] font-black text-[#2a433a] shadow-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="px-3 py-2 bg-white/70 border border-emerald-100 rounded-lg text-xs text-gray-400">
                        Click Generate Tariff Analysis to identify raw materials / inputs...
                      </p>
                    )}

                    <div className="mt-4 overflow-x-auto rounded-lg border border-emerald-100 bg-white/70">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-emerald-50/60">
                          <tr className="text-[10px] text-emerald-700 uppercase tracking-widest">
                            <th className="px-3 py-2">Industry</th>
                            <th className="px-3 py-2 text-right">Base</th>
                            <th className="px-3 py-2 text-right">China</th>
                            <th className="px-3 py-2 text-right">Combined</th>
                            <th className="px-3 py-2 text-right">Class</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50">
                          {TARIFF_DATA_ANALYSIS.industryRisks.map((row) => (
                            <tr key={row.industry}>
                              <td className="px-3 py-2 font-bold text-gray-600">{row.industry}</td>
                              <td className="px-3 py-2 text-right">{row.baseVulnerabilityScore}</td>
                              <td className="px-3 py-2 text-right">{row.chinaExposure}</td>
                              <td className="px-3 py-2 text-right font-bold text-[#2a433a]">{row.combinedRiskScore}</td>
                              <td className={`px-3 py-2 text-right font-bold ${row.classification.includes('Moderate') ? 'text-amber-600' : 'text-emerald-600'}`}>{row.classification}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                    <h4 className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-2">Material Selector</h4>
                    {tariffMaterialSelectorChips.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {tariffMaterialSelectorChips.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 rounded-full bg-white border border-blue-100 text-[10px] font-black text-[#2a433a] shadow-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="px-3 py-2 bg-white/70 border border-blue-100 rounded-lg text-xs text-gray-400">
                        Selected materials will appear here...
                      </p>
                    )}
                    <div className="mt-4 overflow-x-auto rounded-lg border border-blue-100 bg-white/70">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-blue-50/70">
                          <tr className="text-[10px] text-blue-700 uppercase tracking-widest">
                            <th className="px-3 py-2">Name</th>
                            <th className="px-3 py-2 text-right">Short-run</th>
                            <th className="px-3 py-2 text-right">Long-run</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-50">
                          {TARIFF_DATA_ANALYSIS.selectedMaterialImpacts.map((row) => (
                            <tr key={row.name} className="bg-[#2a433a]/5">
                              <td className="px-3 py-2 font-bold text-gray-600">{row.name}</td>
                              <td className="px-3 py-2 text-right">{row.shortRun}%</td>
                              <td className="px-3 py-2 text-right">{row.longRun}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100">
                    <h4 className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-2">Industry Category</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        value={tariffSector}
                        readOnly
                        placeholder="Sector selected by AI..."
                        className="w-full px-3 py-2 bg-white/70 border border-purple-100 rounded-lg text-xs font-bold text-[#2a433a] focus:outline-none"
                      />
                      <input
                        value={TARIFF_DATA_ANALYSIS.sectorFields.find(field => field.label === 'Industry impact')?.value ?? ''}
                        readOnly
                        className="w-full px-3 py-2 bg-white/70 border border-purple-100 rounded-lg text-xs font-bold text-red-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {hasGeneratedTariffWriteUp && (
                <div className="pt-5 border-t border-gray-100 space-y-2">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI tariff risk write up</h4>
                  <textarea
                    value={tariffWriteUp}
                    onChange={(e) => setTariffWriteUp(e.target.value)}
                    className="w-full h-36 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#2a433a] resize-none leading-relaxed"
                  />
                </div>
              )}
            </div>
          </div>
          )}

          {activePreRiskTab === 'sba' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Section 2: Loan & Comp Context Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-5 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#2a433a]/5 rounded-bl-full -mr-12 -mt-12 group-hover:bg-[#2a433a]/10 transition-all"></div>
                
                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                    SBA Loan Details
                  </h3>
                  
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center group/item">
                      <span className="text-xs font-medium text-gray-500">Target State</span>
                      <span className="text-xs font-bold text-[#2a433a] bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{SBA_LOAN_INFO.state.name} ({SBA_LOAN_INFO.state.code})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Zipcode</span>
                      <span className="text-xs font-bold text-[#2a433a]">{SBA_LOAN_INFO.zipcode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Proposed Loan Size</span>
                      <span className="text-xs font-bold text-emerald-600">{SBA_LOAN_INFO.loanSize}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-50">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-500">NAICS 4-digit</span>
                        <span className="text-xs font-bold text-[#2a433a]">{SBA_LOAN_INFO.naics4Digit}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium italic leading-tight">{SBA_LOAN_INFO.naicsDescription}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 space-y-4 border-t border-gray-100">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#2a433a] rounded-full"></span>
                    Comp Database Parameters
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Region Subset</span>
                      <span className="text-xs font-bold text-[#2a433a]">{COMP_DATABASE_INFO.zipcode3Digit}XX Series</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-gray-500">Loan Bucket</span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#2a433a] block">Bucket {COMP_DATABASE_INFO.loanSizeBucket.number}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{COMP_DATABASE_INFO.loanSizeBucket.range}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 p-2.5 bg-amber-50 rounded-lg border border-amber-100">
                   <p className="text-[10px] text-amber-700 font-medium leading-tight">Data synchronized with SBA 7(a) historical records through Q1 2026.</p>
                </div>
              </div>
            </div>

            {/* Section 3: Default Risk Dashboard */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
                <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">Default Risk Scorecard Dashboard</h3>
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">Benchmarking across categorical datasets</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                       <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Consensus</span>
                       <span className="text-lg font-black text-[#2a433a] leading-none">{SBA_DEFAULT_DASHBOARD.consensus}</span>
                    </div>
                    <div className="text-right border-l border-gray-200 pl-6">
                       <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scorecard</span>
                       <span className="text-xs font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-1 rounded border border-emerald-100 inline-block mt-1">{SBA_DEFAULT_DASHBOARD.scorecard}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-x-auto no-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50/30 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                        <th className="px-6 py-4 border-b border-gray-100">Category</th>
                        <th className="px-4 py-4 text-right border-b border-gray-100">No. of Loans</th>
                        <th className="px-4 py-4 text-right border-b border-gray-100">Avg. Charge-off</th>
                        <th className="px-4 py-4 text-right border-b border-gray-100">Weight</th>
                        <th className="px-4 py-4 text-right border-b border-gray-100">Contribution</th>
                        <th className="px-6 py-4 text-right border-b border-gray-100">Rank</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {SBA_DEFAULT_DASHBOARD.rows.map((row, i) => (
                        <tr key={i} className={`hover:bg-gray-50/30 transition-colors group ${row.category === 'All SBA loans' ? 'bg-[#2a433a]/5' : ''}`}>
                          <td className={`px-6 py-3 ${row.category === 'All SBA loans' ? 'font-bold text-[#2a433a]' : 'text-gray-600 font-medium'}`}>
                            {row.category}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-500 font-medium">{row.numLoans}</td>
                          <td className="px-4 py-3 text-right font-bold text-gray-900">{row.avgChargeOff}</td>
                          <td className="px-4 py-3 text-right text-gray-400 font-bold">{row.weighting}</td>
                          <td className={`px-4 py-3 text-right font-black ${row.contribution.includes('100') ? 'text-red-600' : 'text-[#2a433a]'}`}>{row.contribution}</td>
                          <td className="px-6 py-3 text-right">
                            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${row.rank === '1' ? 'bg-[#2a433a] text-white' : 'bg-gray-100 text-gray-400'}`}>
                              {row.rank}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[#2a433a] text-white">
                      <tr>
                        <td colSpan={2} className="px-6 py-3.5 font-bold uppercase tracking-widest text-[10px]">Consensus relative to all loans avg.</td>
                        <td className="px-4 py-3.5 text-right font-black text-sm">{SBA_DEFAULT_DASHBOARD.consensusRelativeToAvg}</td>
                        <td colSpan={3} className="px-6 py-3.5 text-right opacity-60 text-[10px] font-medium italic">Relative risk indicator weighted by local data density</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          )}
        </section>
        )}

        {/* Risk Assessment Section */}
        {activeRiskAnalysisSection === 'riskAssessment' && (
        <section className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
              Risk Assessment
            </h2>
          </div>

          <div className="space-y-6">
            {sections.map((section) => {
              const data = section.data as any;
              const sectionWriteUp = riskAssessmentWriteUps[section.id] ?? data.writeUp;
              const isEditingSectionWriteUp = editingRiskWriteUps[section.id];
              const isRefiningSectionWriteUp = refiningRiskWriteUps[section.id];
              const tariffImpactWriteUp = riskAssessmentWriteUps.tariffImpact ?? RISK_ASSESSMENT_DATA.tariff.writeUp;
              const isEditingTariffImpact = editingRiskWriteUps.tariffImpact;
              const isRefiningTariffImpact = refiningRiskWriteUps.tariffImpact;
              return (
                <div key={section.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-2.5 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider">{section.title}</h3>
                    {data.score !== undefined && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Risk Score:</span>
                        <span className="w-6 h-6 rounded-full bg-[#2a433a] text-white flex items-center justify-center text-xs font-bold">
                          {data.score}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-3">
                      {section.id === 'sba' && (
                        <div className="bg-emerald-50/30 rounded-lg p-3 border border-emerald-100 space-y-2">
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold uppercase">Client Bank</span>
                              <span className="text-[#2a433a] font-black">{data.clientBank.name}</span>
                           </div>
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold uppercase">Default Rate</span>
                              <span className="text-red-600 font-black">{data.clientBank.defaultRate}</span>
                           </div>
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500 font-bold uppercase">Matured Loans</span>
                              <span className="text-[#2a433a] font-black">{data.clientBank.bankLoansMatured}</span>
                           </div>
                        </div>
                      )}

                      {section.id === 'mgmt' && data.scorecard && (
                        <div className="space-y-2">
                          {data.scorecard.map((item: any, i: number) => (
                            <div key={i} className="p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.question}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-700">{item.response}</span>
                                <span className="text-xs font-black text-emerald-600">{item.score}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === 'rev' && (
                        <div className="space-y-3">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-gray-50/50">
                                <tr>
                                  <th className="px-2 py-1.5 font-bold text-gray-400 uppercase">Metrics</th>
                                  <th className="px-2 py-1.5 text-right font-bold text-gray-400">Y1</th>
                                  <th className="px-2 py-1.5 text-right font-bold text-gray-400">Y2</th>
                                  <th className="px-2 py-1.5 text-right font-bold text-gray-400">Y3</th>
                                  <th className="px-2 py-1.5 text-right font-bold text-gray-400">Interim</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-50">
                                {data.data.map((row: any, i: number) => (
                                  <tr key={i}>
                                    <td className="px-2 py-1.5 font-bold text-gray-600">{row.label}</td>
                                    <td className="px-2 py-1.5 text-right">{row.year1}</td>
                                    <td className="px-2 py-1.5 text-right">{row.year2}</td>
                                    <td className="px-2 py-1.5 text-right">{row.year3}</td>
                                    <td className="px-2 py-1.5 text-right">{row.interim}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs font-bold text-gray-400 uppercase">Annualized interim</p>
                              <p className="text-xs font-bold text-[#2a433a]">{data.metrics.annualizedInterimMethod}</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs font-bold text-gray-400 uppercase">Increase YoY</p>
                              <p className="text-xs font-bold text-[#2a433a]">{data.metrics.increaseSummary}</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1 p-2 bg-[#2a433a]/5 rounded-lg text-center">
                              <p className="text-xs font-bold text-gray-400 uppercase">4-Yr CAGR</p>
                              <p className="text-xs font-bold text-[#2a433a]">{data.metrics.cagr4yr}</p>
                            </div>
                            <div className="flex-1 p-2 bg-[#2a433a]/5 rounded-lg text-center">
                              <p className="text-xs font-bold text-gray-400 uppercase">RGCI</p>
                              <p className="text-xs font-bold text-[#2a433a]">{data.metrics.rgci}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center text-xs mb-1">
                                <span className="font-bold text-gray-400 uppercase">US GDP Benchmark</span>
                                <span className="font-bold text-[#2a433a]">{data.metrics.gdpBenchmark}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">Greater than? (1 = Yes)</span>
                                <span className="font-black text-emerald-600">{data.metrics.gdpBenchmarkPass}</span>
                              </div>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center text-xs mb-1">
                                <span className="font-bold text-gray-400 uppercase">Comparable company growth rate</span>
                                <span className="font-bold text-[#2a433a]">{data.metrics.comparableGrowthRate}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">Greater than? (1 = Yes)</span>
                                <span className="font-black text-red-500">{data.metrics.comparableGrowthPass}</span>
                              </div>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                              <div className="flex justify-between items-center text-xs mb-1">
                                <span className="font-bold text-gray-400 uppercase">Positive / negative</span>
                                <span className="font-bold text-[#2a433a]">{data.metrics.positiveNegative}</span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500">Greater than? (1 = Yes)</span>
                                <span className="font-black text-emerald-600">{data.metrics.positiveNegativePass}</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2 bg-emerald-50 rounded-lg text-center">
                              <p className="text-xs font-bold text-gray-400 uppercase">YoY Contribution</p>
                              <p className="text-xs font-black text-[#2a433a]">{data.metrics.increaseContribution}</p>
                            </div>
                            <div className="p-2 bg-emerald-50 rounded-lg text-center">
                              <p className="text-xs font-bold text-gray-400 uppercase">Benchmark Contribution</p>
                              <p className="text-xs font-black text-[#2a433a]">{data.metrics.benchmarkContribution}</p>
                            </div>
                            <div className="p-2 bg-emerald-50 rounded-lg text-center">
                              <p className="text-xs font-bold text-gray-400 uppercase">RGCI Contribution</p>
                              <p className="text-xs font-black text-[#2a433a]">{data.metrics.rgciContribution}</p>
                            </div>
                          </div>
                          <div className="p-2 bg-[#2a433a]/5 rounded-lg text-center border border-[#2a433a]/10">
                            <p className="text-xs font-bold text-gray-400 uppercase">Revenue Stability Score</p>
                            <p className="text-sm font-black text-[#2a433a]">{data.score}</p>
                          </div>
                        </div>
                      )}

                      {section.id === 'health' && (
                         <div className="space-y-3">
                            <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Business Health Score</span>
                              <span className="text-base font-black text-emerald-600 mb-0.5">{data.status}</span>
                              <span className="text-xs font-bold text-[#2a433a]">{data.targets} Targets Achieved</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div className="p-2 bg-emerald-50 rounded-lg text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase">Business Health</p>
                                <p className="text-xs font-black text-[#2a433a]">{data.businessHealthContribution}</p>
                              </div>
                              <div className="p-2 bg-emerald-50 rounded-lg text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase">Current Ratio</p>
                                <p className="text-xs font-black text-[#2a433a]">{data.currentRatioContribution}</p>
                              </div>
                              <div className="p-2 bg-emerald-50 rounded-lg text-center">
                                <p className="text-xs font-bold text-gray-400 uppercase">Interest Coverage</p>
                                <p className="text-xs font-black text-[#2a433a]">{data.interestCoverageContribution}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current ratio</p>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-bold text-gray-700">{data.currentRatio}</span>
                                  <span className="font-black text-[#2a433a]">Benchmark {data.adjustedBenchmark}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 leading-tight">{data.benchmarkRationale}</p>
                              </div>

                              <div className="p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Industry</p>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-bold text-gray-700">{data.industry}</span>
                                  <span className="font-black text-[#2a433a]">{data.benchmarkCurrentRatio}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 leading-tight">Standard benchmark: {data.standardBenchmark}</p>
                              </div>

                              <div className="p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Interest coverage</p>
                                <p className="text-xs font-bold text-gray-700 leading-relaxed">{data.interestCoverage}</p>
                                <p className="text-[10px] text-gray-400 mt-1 leading-tight">{data.interestCoverageRationale}</p>
                              </div>
                            </div>

                            <div className="p-2 bg-[#2a433a]/5 rounded-lg text-center border border-[#2a433a]/10">
                              <p className="text-xs font-bold text-gray-400 uppercase">Overall Financial Health Score</p>
                              <p className="text-sm font-black text-[#2a433a]">{data.score}</p>
                            </div>
                         </div>
                      )}

                      {section.id === 'comp' && data.scorecard && (
                        <div className="space-y-2">
                          {data.scorecard.map((item: any, i: number) => (
                            <div key={i} className="p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.question}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-700">{item.response}</span>
                                <span className={`text-xs font-black ${item.score === 0 ? 'text-red-500' : 'text-emerald-600'}`}>{item.score}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === 'cust' && (
                         <div className="p-3 bg-white rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Google Rating</span>
                            <div className="flex items-center gap-1 text-[#2a433a] mb-1">
                               <span className="text-2xl font-black">{data.rating}</span>
                               <div className="flex flex-col items-start leading-none">
                                  <span className="text-xs font-bold">AVG. RATING</span>
                                  <div className="flex text-emerald-500">
                                     {'★★★★★'.split('').map((s, i) => <span key={i} className="text-xs">★</span>)}
                                  </div>
                               </div>
                            </div>
                         </div>
                      )}

                      {section.id === 'supply' && data.scorecard && (
                        <div className="space-y-2">
                          {data.scorecard.map((item: any, i: number) => (
                            <div key={i} className="p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.question}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-700">{item.response}</span>
                                <span className="text-xs font-black text-emerald-600">{item.score}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.id === 'esg' && (
                         <div className="grid grid-cols-2 gap-3">
                            <div className="p-2 bg-emerald-50 rounded-lg text-center">
                              <p className="text-xs font-bold text-emerald-600 uppercase">Environmental</p>
                              <p className="text-sm font-black text-[#2a433a]">{data.environmentalScore}</p>
                            </div>
                            <div className="p-2 bg-red-50 rounded-lg text-center">
                              <p className="text-xs font-bold text-red-600 uppercase">Governance</p>
                              <p className="text-sm font-black text-[#2a433a]">{data.governmentScore}</p>
                            </div>
                         </div>
                      )}
                    </div>

                    <div className="lg:col-span-2">
                      <div className="h-full relative pl-6 border-l border-gray-50">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500/30 rounded-full"></div>
                        <div className="mb-2 flex justify-end gap-1.5">
                          {isEditingSectionWriteUp ? (
                            <>
                              <button
                                type="button"
                                title="Save write-up"
                                onClick={() => setEditingRiskWriteUps(prev => ({ ...prev, [section.id]: false }))}
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                title="Cancel edit"
                                onClick={() => handleCancelRiskWriteUpEdit(section.id, data.writeUp)}
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-600 transition-colors hover:bg-red-100"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              title="Edit write-up"
                              onClick={() => setEditingRiskWriteUps(prev => ({ ...prev, [section.id]: true }))}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-100 bg-white text-gray-500 transition-colors hover:border-[#2a433a]/20 hover:bg-[#2a433a]/5 hover:text-[#2a433a]"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            title="AI refine write-up"
                            onClick={() => handleRefineRiskWriteUp(section.id)}
                            disabled={isRefiningSectionWriteUp}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-purple-100 bg-purple-50 text-purple-700 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${isRefiningSectionWriteUp ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                        {isEditingSectionWriteUp ? (
                          <textarea
                            value={sectionWriteUp}
                            onChange={(e) => handleRiskWriteUpChange(section.id, e.target.value)}
                            className="h-40 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs leading-relaxed text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#2a433a]"
                          />
                        ) : (
                          <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                            {sectionWriteUp}
                          </p>
                        )}
                        {section.id === 'supply' && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tariff Impact</h4>
                              <div className="flex gap-1.5">
                                {isEditingTariffImpact ? (
                                  <>
                                    <button
                                      type="button"
                                      title="Save tariff impact"
                                      onClick={() => setEditingRiskWriteUps(prev => ({ ...prev, tariffImpact: false }))}
                                      className="flex h-7 w-7 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      title="Cancel edit"
                                      onClick={() => handleCancelRiskWriteUpEdit('tariffImpact', RISK_ASSESSMENT_DATA.tariff.writeUp)}
                                      className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-600 transition-colors hover:bg-red-100"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    title="Edit tariff impact"
                                    onClick={() => setEditingRiskWriteUps(prev => ({ ...prev, tariffImpact: true }))}
                                    className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-100 bg-white text-gray-500 transition-colors hover:border-[#2a433a]/20 hover:bg-[#2a433a]/5 hover:text-[#2a433a]"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  title="AI refine tariff impact"
                                  onClick={() => handleRefineRiskWriteUp('tariffImpact')}
                                  disabled={isRefiningTariffImpact}
                                  className="flex h-7 w-7 items-center justify-center rounded-md border border-purple-100 bg-purple-50 text-purple-700 transition-colors hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  <RefreshCw className={`h-3.5 w-3.5 ${isRefiningTariffImpact ? 'animate-spin' : ''}`} />
                                </button>
                              </div>
                            </div>
                            {isEditingTariffImpact ? (
                              <textarea
                                value={tariffImpactWriteUp}
                                onChange={(e) => handleRiskWriteUpChange('tariffImpact', e.target.value)}
                                className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs leading-relaxed text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#2a433a]"
                              />
                            ) : (
                              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                                {tariffImpactWriteUp}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        )}
      </div>
    );
  };


  const renderReportValuationSubTab = () => {
    const calculatedValuation = REPORT_VALUATION_DATA.finalValuation.find(row => row.label === 'Overall Valuation (Weighted)');
    const concludedValue = REPORT_VALUATION_DATA.finalValuation.find(row => row.label === 'Concluded Value');

    return (
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] gap-6 p-4 bg-gray-50/30">
        {calculatedValuation && (
          <div className="xl:col-span-3 order-1 flex justify-start pl-0 xl:pl-16">
            <div className="w-full max-w-3xl rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-center shadow-sm">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Calculated Valuation Amount</p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-[#2a433a]">{calculatedValuation.value}</p>
                  <p className="mt-2 text-xs font-medium text-gray-500">Overall weighted valuation from the final valuation table</p>
                </div>
                {concludedValue && (
                  <div className="border-t border-emerald-200 pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Concluded Value</p>
                    <p className="mt-2 text-3xl font-black tracking-tight text-[#2a433a]">{concludedValue.value}</p>
                    <p className="mt-2 text-xs font-medium text-gray-500">Final selected value shown in the valuation output</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="space-y-6 order-2 xl:pl-6">

        {/* Growth Rate Factors Table */}
        <section className="space-y-3" id="rangeid=702796264">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            Growth Rate Assumptions
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-500 font-bold">
                <tr>
                  <th className="px-6 py-2.5">Description</th>
                  <th className="px-6 py-2.5 text-right">Value</th>
                </tr>
                </thead>
              <tbody className="divide-y divide-gray-50">
                {REPORT_VALUATION_DATA.assumptions.growthRateFactors.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/30">
                    <td className="px-6 py-2 text-gray-700">{row.item}</td>
                    <td className="px-6 py-2 text-right font-bold text-[#2a433a]">
                      {row.note === 'Manual Input' ? (
                        <input
                          value={reportManualAssumptions[row.item] ?? row.value}
                          onChange={(e) => handleReportManualAssumptionChange(row.item, e.target.value)}
                          className="w-28 px-2 py-1 bg-amber-50/30 border border-amber-100 rounded text-right text-xs font-bold text-[#2a433a] focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Additional Assumptions Table */}
        <section className="space-y-3" id="rangeid=2060461216">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            Valuation Assumptions
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-500 font-bold">
                <tr>
                  <th className="px-6 py-2.5">Assumption</th>
                  <th className="px-6 py-2.5 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {REPORT_VALUATION_DATA.assumptions.adjustments.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/30">
                    <td className="px-6 py-2 text-gray-700">{row.item}</td>
                    <td className="px-6 py-2 text-right">
                      <input
                        value={reportManualAssumptions[row.item] ?? row.value}
                        onChange={(e) => handleReportManualAssumptionChange(row.item, e.target.value)}
                        className="w-32 px-2 py-1 bg-amber-50/30 border border-amber-100 rounded text-right text-xs font-bold text-[#2a433a] focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Weighted Assumptions Table */}
        <section className="space-y-3" id="rangeid=110747471">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            Weightage Assumptions
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-500 font-bold">
                <tr>
                  <th className="px-6 py-2.5">Assumption</th>
                  <th className="px-6 py-2.5 text-right">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {REPORT_VALUATION_DATA.assumptions.weightage.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/30">
                    <td className="px-6 py-2 text-gray-700">{row.item}</td>
                    <td className="px-6 py-2 text-right font-bold text-[#2a433a]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Final Metrics Assumptions Table */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2" id="rangeid=1237347067">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            Final Metrics Assumption
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-2.5">Calculated Metrics</th>
                  <th className="px-6 py-2.5 text-right">Raw Numbers</th>
                  <th className="px-6 py-2.5 text-right text-[#2a433a]">Numbers used in model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {REPORT_VALUATION_DATA.finalMetrics.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/30">
                    <td className="px-6 py-2.5 text-gray-900 font-semibold">{row.label}</td>
                    <td className="px-6 py-2.5 text-right text-gray-500">{row.raw}</td>
                    <td className="px-6 py-2.5 text-right font-black text-[#2a433a]">{row.final}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </div>

        <div className="space-y-6 order-1 xl:pr-6 xl:border-r xl:border-gray-200">

        {/* WACC Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2" id="rangeid=1434817949">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            WACC
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="space-y-4 p-3">
              <div className="overflow-x-auto">
                <h3 className="text-xs font-bold text-[#2a433a] uppercase mb-2">Cost of Equity Build Up</h3>
                {renderWaccRows([
                  ...REPORT_VALUATION_DATA.wacc.equityBuildUp,
                  REPORT_VALUATION_DATA.wacc.costOfEquity
                ])}
              </div>

              <div className="overflow-x-auto">
                <h3 className="text-xs font-bold text-[#2a433a] uppercase mb-2">Cost of Debt</h3>
                {renderWaccRows([
                  ...REPORT_VALUATION_DATA.wacc.costOfDebt,
                  REPORT_VALUATION_DATA.wacc.afterTaxCostOfDebt
                ])}
              </div>

              <div className="overflow-x-auto">
                <h3 className="text-xs font-bold text-[#2a433a] uppercase mb-2">WACC Calculation</h3>
                {renderWaccRows([
                  ...REPORT_VALUATION_DATA.wacc.waccCalculation,
                  REPORT_VALUATION_DATA.wacc.finalWacc
                ], true)}
              </div>
            </div>
          </div>
        </section>

        {/* FCFF Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2" id="rangeid=1527864827">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            FCFF
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-500 font-bold">
                <tr>
                  <th className="px-6 py-2.5">Base Year Free Cash Flow</th>
                  <th className="px-6 py-2.5 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {REPORT_VALUATION_DATA.fcff.map((row, i) => (
                  <tr key={i} className={`hover:bg-gray-50/30 ${row.isTotal ? 'bg-emerald-50/50' : ''}`}>
                    <td className={`px-6 py-2 ${row.isTotal ? 'font-bold text-[#2a433a]' : 'text-gray-700'}`}>{row.label}</td>
                    <td className={`px-6 py-2 text-right font-bold ${row.isTotal ? 'text-[#2a433a]' : 'text-gray-900'}`}>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DCF Valuation Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2" id="rangeid=1071212953">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            DCF Valuation
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/50 text-gray-500 font-bold">
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-2.5 min-w-[120px]">Years</th>
                    <th className="px-2 py-2.5 text-right">0</th>
                    <th className="px-2 py-2.5 text-right">1</th>
                    <th className="px-2 py-2.5 text-right">2</th>
                    <th className="px-2 py-2.5 text-right">3</th>
                    <th className="px-2 py-2.5 text-right">4</th>
                    <th className="px-2 py-2.5 text-right">5</th>
                    <th className="px-2 py-2.5 text-right">6</th>
                    <th className="px-2 py-2.5 text-right">7</th>
                    <th className="px-2 py-2.5 text-right">8</th>
                    <th className="px-2 py-2.5 text-right">9</th>
                    <th className="px-2 py-2.5 text-right">10</th>
                    <th className="px-4 py-2.5 text-right bg-emerald-50/50">Terminal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {REPORT_VALUATION_DATA.dcfValuation.projections.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/30">
                      <td className="px-4 py-2 font-bold text-gray-700">{row.label}</td>
                      {row.years.map((year, yIdx) => (
                        <td key={yIdx} className={`px-2 py-2 text-right ${yIdx === row.years.length - 1 ? 'font-bold bg-emerald-50/20' : ''}`}>
                          {year || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-gray-50/30 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                {REPORT_VALUATION_DATA.dcfValuation.summary.map((row, i) => (
                  <div key={i} className={`flex justify-between items-center text-xs p-2 rounded ${row.isTotal ? 'bg-[#2a433a] text-white font-bold' : 'text-gray-700 bg-white shadow-sm'}`}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {REPORT_VALUATION_DATA.dcfValuation.rounded.map((row, i) => (
                  <div key={i} className={`flex justify-between items-center text-xs p-2 rounded ${row.isTotal ? 'bg-emerald-600 text-white font-bold' : 'text-gray-700 bg-white border border-gray-100 shadow-sm'}`}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Relative Valuation Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2" id="rangeid=343936829">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            Relative Valuation
          </h2>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-500 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-2.5">Metric</th>
                  <th className="px-4 py-2.5 text-right">Net Sales</th>
                  <th className="px-4 py-2.5 text-right">Gross Profit</th>
                  <th className="px-4 py-2.5 text-right">EBITDA</th>
                  <th className="px-4 py-2.5 text-right">EBIT</th>
                  <th className="px-4 py-2.5 text-right">SDE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr className="bg-gray-50/20">
                  <td className="px-6 py-2 font-bold text-[#2a433a]">Multiple Used</td>
                  {REPORT_VALUATION_DATA.relativeValuation.multiples.map((m, i) => (
                    <td key={i} className="px-4 py-2 text-right font-bold text-emerald-600">{m.value}</td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-2 font-bold text-gray-700">Financial Basis</td>
                  {REPORT_VALUATION_DATA.relativeValuation.baseValues.map((b, i) => (
                    <td key={i} className="px-4 py-2 text-right text-gray-900">{b.value}</td>
                  ))}
                </tr>
                {REPORT_VALUATION_DATA.relativeValuation.valuations.map((row, i) => (
                  <tr key={i} className={row.label === 'Final valuation' ? 'bg-[#2a433a]/5' : ''}>
                    <td className={`px-6 py-2 ${row.label === 'Final valuation' ? 'font-bold text-[#2a433a]' : 'text-gray-600'}`}>{row.label}</td>
                    {row.values.map((v, vIdx) => (
                      <td key={vIdx} className={`px-4 py-2 text-right ${row.label === 'Final valuation' ? 'font-bold text-[#2a433a]' : ''}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Final Valuation Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-[#2a433a] flex items-center gap-2" id="rangeid=318127836">
            <span className="w-1.5 h-4 bg-[#2a433a] rounded-full"></span>
            Final Valuation
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-gray-50">
                  {REPORT_VALUATION_DATA.finalValuation.map((row, i) => (
                    <tr key={i} className={`
                      ${row.isTotal ? 'bg-[#2a433a] text-white font-bold' : ''}
                      ${row.isSubtotal ? 'bg-gray-50 text-gray-900 font-bold' : ''}
                      ${row.highlight ? 'bg-emerald-600 text-white font-bold' : ''}
                      hover:opacity-95 transition-opacity
                    `}>
                      <td className="px-6 py-2.5">{row.label}</td>
                      <td className={`px-6 py-2.5 text-right ${row.highlight || row.isTotal ? 'text-xl' : ''}`}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-3">
              <div className="w-40 h-40 rounded-full border-[10px] border-[#2a433a] border-t-emerald-500 flex flex-col items-center justify-center text-center">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Concluded Value</span>
                 <span className="text-xl font-bold text-[#2a433a]">$1.5M</span>
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex-1 text-center">
                  <span className="block text-xs text-gray-400 uppercase font-bold mb-0.5">DCF Method</span>
                  <span className="text-xs font-bold text-[#2a433a]">50%</span>
                </div>
                <div className="flex-1 text-center border-l border-gray-100">
                  <span className="block text-xs text-gray-400 uppercase font-bold mb-0.5">Relative</span>
                  <span className="text-xs font-bold text-emerald-600">50%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center italic max-w-xs leading-tight">The final valuation represents a weighted average of income and market based approaches.</p>
            </div>
          </div>
        </section>
        </div>
      </div>
    );
  };

  const renderReportChartSubTab = () => {
    return (
      <div className="p-8 h-full bg-gray-50/30 flex flex-col items-center justify-center space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-500" />
                Valuation Weightage
              </h3>
            </div>
            <div className="flex items-center justify-center relative py-8">
               <div className="w-48 h-48 rounded-full bg-[#2a433a] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500"></div>
                  <div className="w-32 h-32 rounded-full bg-white z-10 flex flex-col items-center justify-center shadow-inner">
                    <span className="text-xs font-bold text-[#2a433a]">50/50</span>
                    <span className="text-xs text-gray-400 font-bold">Split</span>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#2a433a] rounded-sm"></span>
                <span className="text-xs font-bold text-gray-600">DCF (Income)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-sm"></span>
                <span className="text-xs font-bold text-gray-600">Multiples (Market)</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-bold text-[#2a433a] uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2a433a]" />
                Projected Cash Flows
              </h3>
            </div>
            <div className="flex items-end justify-between h-48 px-4 border-b border-gray-100 mb-4">
              {[40, 45, 52, 60, 68, 75, 82, 90, 95, 100].map((h, i) => (
                <div key={i} className="w-6 bg-[#2a433a]/10 hover:bg-[#2a433a] rounded-t-sm transition-all group relative" style={{ height: `${h}%` }}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${h * 5}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-2">
               {['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7', 'Y8', 'Y9', 'Y10'].map(y => (
                 <span key={y} className="text-xs font-bold text-gray-400">{y}</span>
               ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReportTab = () => {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        {/* Sub-tabs header */}
        <div className="px-6 py-3 bg-white border-b border-gray-100 flex items-center gap-6">
          <button 
            onClick={() => setReportSubTab('Valuation')}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all pb-1 border-b-2 ${reportSubTab === 'Valuation' ? 'text-[#2a433a] border-[#2a433a]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
          >
            <FileText className="w-3.5 h-3.5" />
            Valuation
          </button>
          <button 
            onClick={() => setReportSubTab('Chart')}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all pb-1 border-b-2 ${reportSubTab === 'Chart' ? 'text-[#2a433a] border-[#2a433a]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Chart
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {reportSubTab === 'Valuation' ? renderReportValuationSubTab() : renderReportChartSubTab()}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Assumption':
        return (
          <div className="p-4 space-y-6 overflow-y-auto h-full no-scrollbar">
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/50">
                <div className="flex-1 overflow-x-auto no-scrollbar">
                  <div className="inline-flex items-center gap-1.5 min-w-max rounded-lg bg-white border border-gray-100 p-1 shadow-sm">
                    {Object.keys(ASSUMPTION_CATEGORIES).map(category => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedAssumptionCategory(category)}
                        className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                          selectedAssumptionCategory === category
                            ? 'bg-[#2a433a] text-white shadow-sm'
                            : 'text-gray-500 hover:text-[#2a433a] hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="text-xs text-[#2a433a] font-bold hover:underline px-4">Edit Table</button>
              </div>
              <div className="divide-y divide-gray-100">
                {ASSUMPTION_CATEGORIES[selectedAssumptionCategory as keyof typeof ASSUMPTION_CATEGORIES].map((tableName) => {
                  const isSectionOpen = openAssumptionSections[tableName] ?? false;

                  return (
                    <div key={tableName} className="p-4">
                      {renderTableWithWrapper(tableName)}
                      {isSectionOpen && selectedAssumptionCategory === 'Weighted Tables' && tableName === 'Historical Financial Weighting' && (
                        renderExplanationField("Explanation", weightedExplanation, setWeightedExplanation)
                      )}
                      {isSectionOpen && selectedAssumptionCategory === 'Weighted Tables' && tableName === 'Valuation Methodology Weighting' && (
                        renderExplanationField("Explaination", onboardingExplanation, setOnboardingExplanation)
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 'Dashboard':
        return (
          <div className="h-full flex overflow-hidden">
            {/* Left Column */}
            <div className="flex-1 p-4 space-y-6 overflow-y-auto no-scrollbar border-r border-gray-200">
              <div className="space-y-6">
                {renderAdjustedIncomeTable()}
                <div className="space-y-6">
                  {renderWeightedIncomeTable()}
                </div>
                {renderAdjustedBookValueTable()}
                {renderGoodwillCalculationTable()}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 p-4 overflow-y-auto no-scrollbar">
              {renderRatioAnalysisTable()}
            </div>
          </div>
        );
      case 'Market Comps':
        return renderMarketCompsTab();
      case 'Risk Analysis':
        return renderRiskAnalysisTab();
      case 'Report':
        return renderReportTab();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full">
      {isAssumptionInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="assumption-info-title"
            className="flex h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-emerald-100 bg-emerald-50 px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <p id="assumption-info-title" className="text-xs sm:text-sm font-bold text-emerald-900">Assumption</p>
              </div>
              <div className="flex items-center gap-1">
                {isEditingAssumptionInfo ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSaveAssumptionInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Save Assumption note"
                      title="Save note"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelAssumptionInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Cancel Assumption note edit"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartAssumptionInfoEdit}
                    className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                    aria-label="Edit Assumption note"
                    title="Edit note"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsAssumptionInfoOpen(false);
                    setIsEditingAssumptionInfo(false);
                  }}
                  className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                  aria-label="Close Assumption information"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {isEditingAssumptionInfo ? (
                <textarea
                  value={assumptionInfoDraft}
                  onChange={(e) => setAssumptionInfoDraft(e.target.value)}
                  className="h-full min-h-[56vh] w-full px-3 py-2 bg-white border border-emerald-100 rounded-lg text-[11px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                />
              ) : (
                <div className="space-y-1 text-[11px] sm:text-xs leading-relaxed">
                  {renderAssumptionInfoNote(assumptionInfoNote)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isDashboardInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-info-title"
            className="flex h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-emerald-100 bg-emerald-50 px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <p id="dashboard-info-title" className="text-xs sm:text-sm font-bold text-emerald-900">Dashboard</p>
              </div>
              <div className="flex items-center gap-1">
                {isEditingDashboardInfo ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSaveDashboardInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Save Dashboard note"
                      title="Save note"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelDashboardInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Cancel Dashboard note edit"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartDashboardInfoEdit}
                    className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                    aria-label="Edit Dashboard note"
                    title="Edit note"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsDashboardInfoOpen(false);
                    setIsEditingDashboardInfo(false);
                  }}
                  className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                  aria-label="Close Dashboard information"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {isEditingDashboardInfo ? (
                <textarea
                  value={dashboardInfoDraft}
                  onChange={(e) => setDashboardInfoDraft(e.target.value)}
                  className="h-full min-h-[56vh] w-full px-3 py-2 bg-white border border-emerald-100 rounded-lg text-[11px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                />
              ) : (
                <div className="space-y-1 text-[11px] sm:text-xs leading-relaxed">
                  {renderAssumptionInfoNote(dashboardInfoNote)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isMarketCompsInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="market-comps-info-title"
            className="flex h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-emerald-100 bg-emerald-50 px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <p id="market-comps-info-title" className="text-xs sm:text-sm font-bold text-emerald-900">Market Comps</p>
              </div>
              <div className="flex items-center gap-1">
                {isEditingMarketCompsInfo ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSaveMarketCompsInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Save Market Comps note"
                      title="Save note"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelMarketCompsInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Cancel Market Comps note edit"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartMarketCompsInfoEdit}
                    className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                    aria-label="Edit Market Comps note"
                    title="Edit note"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsMarketCompsInfoOpen(false);
                    setIsEditingMarketCompsInfo(false);
                  }}
                  className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                  aria-label="Close Market Comps information"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {isEditingMarketCompsInfo ? (
                <textarea
                  value={marketCompsInfoDraft}
                  onChange={(e) => setMarketCompsInfoDraft(e.target.value)}
                  className="h-full min-h-[56vh] w-full px-3 py-2 bg-white border border-emerald-100 rounded-lg text-[11px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                />
              ) : (
                <div className="space-y-1 text-[11px] sm:text-xs leading-relaxed">
                  {renderAssumptionInfoNote(marketCompsInfoNote)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isRiskAnalysisInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="risk-analysis-info-title"
            className="flex h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-emerald-100 bg-emerald-50 px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <p id="risk-analysis-info-title" className="text-xs sm:text-sm font-bold text-emerald-900">Risk Analysis</p>
              </div>
              <div className="flex items-center gap-1">
                {isEditingRiskAnalysisInfo ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSaveRiskAnalysisInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Save Risk Analysis note"
                      title="Save note"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelRiskAnalysisInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Cancel Risk Analysis note edit"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartRiskAnalysisInfoEdit}
                    className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                    aria-label="Edit Risk Analysis note"
                    title="Edit note"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsRiskAnalysisInfoOpen(false);
                    setIsEditingRiskAnalysisInfo(false);
                  }}
                  className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                  aria-label="Close Risk Analysis information"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {isEditingRiskAnalysisInfo ? (
                <textarea
                  value={riskAnalysisInfoDraft}
                  onChange={(e) => setRiskAnalysisInfoDraft(e.target.value)}
                  className="h-full min-h-[56vh] w-full px-3 py-2 bg-white border border-emerald-100 rounded-lg text-[11px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                />
              ) : (
                <div className="space-y-1 text-[11px] sm:text-xs leading-relaxed">
                  {renderAssumptionInfoNote(riskAnalysisInfoNote)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isReportInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-info-title"
            className="flex h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-emerald-100 bg-emerald-50 px-3 py-3 sm:px-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700 shrink-0" />
                <p id="report-info-title" className="text-xs sm:text-sm font-bold text-emerald-900">Report</p>
              </div>
              <div className="flex items-center gap-1">
                {isEditingReportInfo ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSaveReportInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Save Report note"
                      title="Save note"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelReportInfoEdit}
                      className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                      aria-label="Cancel Report note edit"
                      title="Cancel"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartReportInfoEdit}
                    className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                    aria-label="Edit Report note"
                    title="Edit note"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsReportInfoOpen(false);
                    setIsEditingReportInfo(false);
                  }}
                  className="p-1 rounded-md text-emerald-700 hover:bg-emerald-100 transition-colors"
                  aria-label="Close Report information"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {isEditingReportInfo ? (
                <textarea
                  value={reportInfoDraft}
                  onChange={(e) => setReportInfoDraft(e.target.value)}
                  className="h-full min-h-[56vh] w-full px-3 py-2 bg-white border border-emerald-100 rounded-lg text-[11px] sm:text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none leading-relaxed"
                />
              ) : (
                <div className="space-y-1 text-[11px] sm:text-xs leading-relaxed">
                  {renderAssumptionInfoNote(reportInfoNote)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid Toolbar */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-lg overflow-x-auto no-scrollbar whitespace-nowrap">
            {VALUATION_TABS.map(tab => (
              <div
                key={tab}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                  activeTab === tab ? 'bg-[#2a433a] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="cursor-pointer"
                >
                  {tab}
                </button>
                {(tab === 'Assumption' || tab === 'Dashboard' || tab === 'Market Comps' || tab === 'Risk Analysis' || tab === 'Report') && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(tab);
                      if (tab === 'Assumption') {
                        setIsAssumptionInfoOpen(true);
                      } else if (tab === 'Dashboard') {
                        setIsDashboardInfoOpen(true);
                      } else if (tab === 'Market Comps') {
                        setIsMarketCompsInfoOpen(true);
                      } else if (tab === 'Risk Analysis') {
                        setIsRiskAnalysisInfoOpen(true);
                      } else {
                        setIsReportInfoOpen(true);
                      }
                    }}
                    className={`p-0.5 rounded-full transition-colors ${
                      activeTab === tab
                        ? 'text-white/90 hover:bg-white/10'
                        : 'text-gray-500 hover:bg-gray-200'
                    }`}
                    aria-label={`Show ${tab} information`}
                    title="What this tab means and data flow"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search valuation..." 
                className="pl-8 pr-4 py-1.5 bg-white border border-gray-200 rounded text-xs w-full sm:w-48 focus:outline-none"
              />
            </div>
            
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Projection</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
           <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Valuation Model</span>
              <span>•</span>
              <span className="text-gray-600 font-medium">{activeTab} View</span>
           </div>
           
           <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-xs text-gray-400">Last updated • <span className="text-gray-600">Apr 28, 2026, 10:15 AM</span></span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                 <button className="flex items-center gap-1.5 px-2.5 py-1 bg-[#2a433a] text-white text-xs font-semibold rounded shadow-sm whitespace-nowrap">
                    <Save className="w-3.5 h-3.5" /> Save Analysis
                 </button>
                 <button className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded whitespace-nowrap">
                    <RefreshCw className="w-3.5 h-3.5" /> Recalculate
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-hidden relative">
        {renderTabContent()}
      </div>
    </div>
  );
};

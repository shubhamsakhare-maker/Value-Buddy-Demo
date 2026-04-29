export const ADJUSTED_INCOME_DATA = [
  { label: 'Total Revenue', '2022': '$1,825,989', '2023': '$1,986,942', '2024': '$1,904,569', interim: '$1,218,739', projections: '$2,098,301', isTotal: true },
  { label: 'Cost of Goods Sold', '2022': '($854,200)', '2023': '($912,450)', '2024': '($885,600)', interim: '($560,300)', projections: '($950,000)', isTotal: false },
  { label: 'Gross Profit', '2022': '$971,789', '2023': '$1,074,492', '2024': '$1,018,969', interim: '$658,439', projections: '$1,148,301', isTotal: true },
  { label: 'Operating Expenses', '2022': '($620,500)', '2023': '($650,200)', '2024': '$645,800', interim: '($380,400)', projections: '($680,000)', isTotal: false },
  { label: 'EBITDA', '2022': '$351,289', '2023': '$424,292', '2024': '$373,169', interim: '$278,039', projections: '$468,301', isTotal: true, highlight: true },
  { label: 'Adjustments (Add-backs)', '2022': '$45,000', '2023': '$38,000', '2024': '$52,000', interim: '$25,000', projections: '$40,000', isTotal: false },
  { label: 'Adjusted EBITDA', '2022': '$396,289', '2023': '$462,292', '2024': '$425,169', interim: '$303,039', projections: '$508,301', isTotal: true, highlight: true, theme: 'emerald' },
];

export const WEIGHTED_INCOME_DATA = [
  { period: '2022 Tax Return', ebitda: '$396,289', weight: '10.0%', weightedEbitda: '$39,629' },
  { period: '2023 Tax Return', ebitda: '$462,292', weight: '20.0%', weightedEbitda: '$92,458' },
  { period: '2024 Tax Return', ebitda: '$425,169', weight: '30.0%', weightedEbitda: '$127,551' },
  { period: '2025 Projected', ebitda: '$508,301', weight: '40.0%', weightedEbitda: '$203,320' },
  { period: 'Weighted Average EBITDA', ebitda: '', weight: '100.0%', weightedEbitda: '$462,958', isTotal: true },
];

export const RATIO_ANALYSIS_DATA = [
  { 
    group: 'Liquidity & Solvency', 
    items: [
      { ratio: 'Current Ratio', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-' },
      { ratio: 'Quick Ratio', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-' },
      { ratio: 'Working Capital', '2022': '$239,716.00', '2023': '$366,402.00', '2024': '$131,368.00', interim: '$141,160.00', average: '-', isOptional: true },
      { ratio: 'Liquidity Ratio', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-', isOptional: true },
    ]
  },
  { 
    group: 'Financial Leverage / Coverage Ratios', 
    items: [
      { ratio: 'Debt to Asset', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-' },
      { ratio: 'Debt to Equity Ratio', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-' },
      { ratio: 'Interest Coverage Ratio', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-' },
      { ratio: 'Total Equity', '2022': '$445,137.00', '2023': '$586,786.00', '2024': '$326,167.00', interim: '$483,295.00', average: '-' },
      { ratio: 'Tangible Net Worth', '2022': '$445,137.00', '2023': '$586,786.00', '2024': '$326,167.00', interim: '$483,295.00', average: '-' },
      { ratio: 'Debt to Tangible Net Worth Ratio', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-' },
      { ratio: 'Senior Debt to Adjusted EBITDA', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-', isOptional: true },
      { ratio: 'Debt to Cash Flow', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-', isOptional: true },
      { ratio: 'Total Debt to Adjusted EBITDA', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-', isOptional: true },
      { ratio: 'Total Debt to Capitalization', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-', isOptional: true },
    ]
  },
  { 
    group: 'Profitability Ratios', 
    items: [
      { ratio: 'Operating Profit Margin', '2022': '19.42%', '2023': '28.58%', '2024': '27.60%', interim: '36.94%', average: '0.29' },
      { ratio: 'Gross Profit Margin', '2022': '100.00%', '2023': '100.00%', '2024': '100.00%', interim: '100.00%', average: '1.00' },
      { ratio: 'Net Profit Margin', '2022': '19.42%', '2023': '28.58%', '2024': '27.60%', interim: '36.94%', average: '0.28' },
      { ratio: 'EBITDA Margin', '2022': '0.21', '2023': '0.30', '2024': '0.29', interim: '0.37', average: '0.30' },
      { ratio: 'SDE Margin', '2022': '0.26', '2023': '0.35', '2024': '0.34', interim: '0.37', average: '0.34' },
      { ratio: 'Rent/Sales', '2022': '0.07', '2023': '0.07', '2024': '0.08', interim: '0.07', average: '0.07', isOptional: true },
      { ratio: 'COGS/Sales', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '0.00', isOptional: true },
      { ratio: 'Premises & Property Expense / Net Sales', '2022': '0.08', '2023': '0.08', '2024': '0.08', interim: '0.08', average: '-', isOptional: true },
      { ratio: 'Tax Rate', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '0.00' },
      { ratio: 'Return on Equity', '2022': '0.80', '2023': '0.97', '2024': '1.61', interim: '0.93', average: '1.16' },
      { ratio: 'Return on Assets', '2022': '0.80', '2023': '0.97', '2024': '1.61', interim: '0.93', average: '1.16' },
    ]
  },
  { 
    group: 'Activity / Efficiency Ratios', 
    items: [
      { ratio: 'Accounts Receivable Turnover', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-' },
      { ratio: 'Inventory Turnover', '2022': '-', '2023': '-', '2024': '-', interim: '0.00', average: '0.00' },
      { ratio: 'Asset Turnover', '2022': '4.10', '2023': '3.39', '2024': '5.84', interim: '2.52', average: '4.13' },
      { ratio: 'Working Capital Turnover', '2022': '7.62', '2023': '5.42', '2024': '14.50', interim: '8.63', average: '14.14' },
      { ratio: 'Average Inventory', '2022': '-', '2023': '0.00', '2024': '0.00', interim: '35,725.00', average: '-', isOptional: true },
      { ratio: 'Accounts Receivable Days', '2022': '0.00', '2023': '0.00', '2024': '0.00', interim: '0.00', average: '-' },
      { ratio: 'Accounts Payable Days', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-', isOptional: true },
      { ratio: 'Inventory Days', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-', isOptional: true },
      { ratio: 'Gross Fixed Asset Turnover', '2022': '4.80', '2023': '4.60', '2024': '4.41', interim: '3.56', average: '-' },
      { ratio: 'Days Sales Outstanding (DSO)', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-', isOptional: true },
    ]
  },

  { 
    group: 'Performance Ratios (Growth Rate)', 
    items: [
      { ratio: 'Net Receipts or Sales ($)', '2022': '$1,825,989.00', '2023': '$1,986,942.00', '2024': '$1,904,569.00', interim: '-', average: '-' },
      { ratio: 'Net Receipts or Sales (% Change)', '2022': '-', '2023': '8.81%', '2024': '-4.15%', interim: '-', average: '-' },
      { ratio: 'Cost of Goods Sold ($)', '2022': '$0.00', '2023': '$0.00', '2024': '$0.00', interim: '-', average: '-' },
      { ratio: 'Cost of Goods Sold (% Change)', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-' },
      { ratio: 'Gross Profit ($)', '2022': '$1,825,989.00', '2023': '$1,986,942.00', '2024': '$1,904,569.00', interim: '-', average: '-' },
      { ratio: 'Gross Profit (% Change)', '2022': '-', '2023': '8.81%', '2024': '-4.15%', interim: '-', average: '-' },
      { ratio: 'Other Income ($)', '2022': '$0.00', '2023': '$0.00', '2024': '$0.00', interim: '-', average: '-' },
      { ratio: 'Other Income (% Change)', '2022': '-', '2023': '-', '2024': '-', interim: '-', average: '-' },
      { ratio: 'Total Income (Gross Profit + Other Income) ($)', '2022': '$1,825,989.00', '2023': '$1,986,942.00', '2024': '$1,904,569.00', interim: '-', average: '-' },
      { ratio: 'Total Income (Gross Profit + Other Income) (% Change)', '2022': '-', '2023': '8.81%', '2024': '-4.15%', interim: '-', average: '-' },
      { ratio: 'Total Operating Expenses ($)', '2022': '$1,386,939.00', '2023': '$1,457,886.00', '2024': '$1,457,019.00', interim: '-', average: '-' },
      { ratio: 'Total Operating Expenses (% Change)', '2022': '-', '2023': '5.12%', '2024': '-0.06%', interim: '-', average: '-' },
      { ratio: 'Net Income ($)', '2022': '$439,050.00', '2023': '$529,056.00', '2024': '$447,550.00', interim: '-', average: '-' },
      { ratio: 'Net Income (% Change)', '2022': '-', '2023': '20.50%', '2024': '-15.41%', interim: '-', average: '-' },
      { ratio: 'Trailing Earnings Growth', '2022': '-', '2023': '-', '2024': '-', interim: '0.53%', average: '-' },
      { ratio: 'Forward Earnings Growth', '2022': '-', '2023': '-', '2024': '-', interim: '3%', average: '-' },
    ]
  },
];

export const ADJUSTED_BOOK_VALUE_DATA = [
  { label: 'Unadjusted assets', value: '$483,295', source: 'Pulled from interim s', isBold: true },
  { label: 'Non-operating receivables', value: '$0', source: 'Formula Driven' },
  { label: 'Intangible assets and accumulated amortization', value: '$-', source: 'Formula Driven' },
  { label: 'Miscellaneous excluded / adjusted assets', value: '($266,558)', source: 'Formula Driven: Add' },
  { label: 'Included liabilities', value: '$-', source: 'Formula Driven', isBold: true },
  { label: 'Subtotal', value: '$216,737', source: 'Formula Driven', isBold: true },
  { label: 'Less illiquidity discount', value: '0.00%', source: 'Manual', isEditable: true },
  { label: 'Indicated total enterprise value', value: '$216,737', source: 'Formula Driven', isBold: true },
  { label: 'Selected value (rounded)', value: '$217,000', source: 'Formula Driven (Rou)', isBold: true },
];

export const GOODWILL_CALCULATION_DATA = [
  { label: 'Fair Market Value', value: '$1,997,000', source: 'Pulled from Valuatio', isBold: true },
  { label: 'Adj. Book Value of Liabilities Assumed', value: '$-', source: 'Formula Driven (Tota)' },
  { label: 'Enterprise Value', value: '$1,997,000', source: 'Formula Driven', isBold: true },
  { label: 'Fixed Tangible Assets', value: '$181,012', source: 'Formula Driven' },
  { label: 'Other Tangible Assets', value: '$35,725', source: 'Formula Driven' },
  { label: 'Tangible Assets Assumed', value: '$216,737', source: 'Formula Driven', isBold: true },
  { label: 'Goodwill', value: '$1,780,263', source: 'Formula Driven', isBold: true, highlight: true },
];


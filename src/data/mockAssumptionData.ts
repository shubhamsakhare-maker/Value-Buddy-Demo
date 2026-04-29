export const ASSUMPTION_TABLES = [
  'Dates',
  'Historical Financial Weighting',
  'Rent Adjustment',
  'Excess / Insufficient Cash',
  'Excluded Assets',
  'Valuation Methodology Weighting',
  'Owner\'s Compensation Adjustments',
  'Acquisition Stake Summary',
  '2025 Projections',
  'Discretionary Personal Expenses',
  'Risk Assessment / CSRP Error',
  'One-time Revenue / Expense Adjustments',
  'Comparable Company Adjustments'
];

export const MOCK_ASSUMPTION_DATA: Record<string, any> = {
  'Dates': [
    { label: 'Report Date', value: 'April 29, 2026' },
    { label: 'Valuation Date', value: 'July 31, 2025' },
  ],
  'Historical Financial Weighting': [
    { period: '2022 Tax Return', weight: '10%' },
    { period: '2023 Tax Return', weight: '20%' },
    { period: '2024 Tax Return', weight: '30%' },
    { period: '2025 TTM', weight: '40%' },
  ],
  'Rent Adjustment': {
    columns: ['2022', '2023', '2024', '2025F', '2024 TTM', 'Notes'],
    rows: [
      { label: 'Rent from business tax returns', values: { '2022': '$136,696.00', '2023': '$138,755.00', '2024': '$151,825.00', '2025F': '$167,268.55', '2024 TTM': '', 'Notes': '' } },
      { label: 'Square footage provided during onboarding', values: { '2022': '2,500', '2023': '2,500', '2024': '2,500', '2025F': '2,500', '2024 TTM': '', 'Notes': '' } },
      { label: 'Current price per square foot', isBold: true, values: { '2022': '54.68', '2023': '55.50', '2024': '60.73', '2025F': '66.91', '2024 TTM': '', 'Notes': '' } },
      { label: 'Does company own the space that it rents?', isQuestion: true, values: { '2022': 'No' }, extra: '<<assumes an adjustment should always be considered when they own the space they rent' },
      { label: 'Dealstats comparable rent per square foot', isHighlighted: true, values: { '2022': '$42.66', '2023': '$42.66', '2024': '$42.66', '2025F': '$42.66', '2024 TTM': '', 'Notes': '' } },
      { label: 'Is comparable rent higher than company rent?', isQuestion: true, values: { '2022': 'Yes', '2023': 'Yes', '2024': 'Yes', '2025F': 'Yes' } },
      { label: 'Does adjustment need to be made?', isQuestion: true, values: { '2022': 'No', '2023': 'No', '2024': 'No', '2025F': 'No' } },
      { label: 'Rent adjustment', isBold: true, values: { '2022': '0', '2023': '0', '2024': '0', '2025F': '0', '2024 TTM': '', 'Notes': '' } },
      { label: 'Explanation Before Year Weighting', isFullWidth: true, values: { '2022': 'Majestic Nails & Spa does not own the real estate that it rents. For the purposes of this valuation, we have assumed that the rent paid by the Company is at market rates.' } },
      { label: 'Explanation After Year Weighting', isFullWidth: true, values: { '2023': 'Majestic Nails & Spa does not own the real estate that it rents. For the purposes of this valuation, we have assumed that the rent paid by the Company is at market rates.' } }
    ]
  },
  'Excess / Insufficient Cash': [
    { description: 'Average Operating Cash', amount: '$150,000' },
    { description: 'Actual Cash on Hand', amount: '$285,000' },
    { description: 'Excess Cash', amount: '$135,000' },
  ],
  'Excluded Assets': {
    columns: ['Description', 'Value', 'Notes'],
    rows: [
      { label: 'Fixed excluded asset 1', value: '', notes: '', isManual: true },
      { label: 'Fixed excluded asset 2', value: '', notes: '', isManual: true },
      { label: 'Fixed excluded asset 3', value: '', notes: '', isManual: true },
      { label: 'Fixed excluded asset 4', value: '', notes: '', isManual: true },
      { label: 'Fixed excluded asset 5', value: '', notes: '', isManual: true },
      { label: 'Value of excluded fixed assets', value: '$0.00', notes: 'This number will automatically be deducted from all valuation methodologies. Input as a negative number if there are included non-operating assets, otherwise input as a positive value.', isTotal: true },
      { label: 'Explanation of excluded fixed assets', value: 'There are no excluded operating assets in this transaction.', notes: 'Manually input client-ready explanation here, including explanation for adjustments due to included non-operating assets if there are any.', isManual: true, isExplanation: true },
      { label: 'Current excluded asset 1', value: '', notes: '', isManual: true },
      { label: 'Current excluded asset 2', value: '', notes: '', isManual: true },
      { label: 'Current excluded asset 3', value: '', notes: '', isManual: true },
      { label: 'Current excluded asset 4', value: '', notes: '', isManual: true },
      { label: 'Current excluded asset 5', value: '', notes: '', isManual: true },
      { label: 'Value of excluded current assets', value: '$0.00', notes: 'This number does not directly impact any valuation methodologies and is rolled up into all excluded assets below.', isTotal: true },
      { label: 'Explanation of excluded current assets', value: 'There are no excluded operating assets in this transaction.', notes: 'Manually input client-ready explanation here, including explanation for adjustments due to included non-operating assets if there are any.', isManual: true, isExplanation: true },
      { label: 'Value of all excluded assets (fixed and current)', value: '$0.00', notes: 'This number will be used in the asset approach valuation.', isTotal: true },
      { label: 'Explanation of all excluded assets (fixed and current)', value: 'There are no excluded operating assets in this transaction.', notes: 'Manually input client-ready explanation here.', isManual: true, isExplanation: true },
      { label: 'Raw explanation from onboarding', value: 'There are no assets being excluded from this valuation', notes: '', isManual: true, isExplanation: true },
    ]
  },
  'Valuation Methodology Weighting': [
    { method: 'Discounted Cash Flow (DCF)', weight: '40%' },
    { method: 'Market Multiples (EBITDA)', weight: '30%' },
    { method: 'Market Multiples (Revenue)', weight: '20%' },
    { method: 'Net Asset Value', weight: '10%' },
  ],
  'Owner\'s Compensation Adjustments': {
    columns: ['2022', '2023', '2024', '2025F', '2024 TTM', 'Notes'],
    rows: [
      { label: "Owner's compensation", values: { '2022': '$0.00', '2023': '$117,000.00', '2024': '$156,000.00', '2025F': '$171,868.23', '2024 TTM': '', 'Notes': '' } },
      { label: 'Payroll tax adjustment', values: { '2022': '$0.00', '2023': '$8,950.50', '2024': '$11,934.00', '2025F': '$13,147.92', '2024 TTM': '', 'Notes': '' } },
      { label: "Total owner's compensation", isBold: true, values: { '2022': '$0.00', '2023': '$125,950.50', '2024': '$167,934.00', '2025F': '$185,016.15', '2024 TTM': '', 'Notes': '' } },
      { label: "DealStats comparable company owner's compensation", values: { '2022': '$78,459.76', '2023': '$80,886.35', '2024': '$83,387.99', '2025F': '$85,967.00', '2024 TTM': '', 'Notes': 'Decreased 3% each previous year to show increment in subsequent year' } },
      { label: 'Payroll tax adjustment', values: { '2022': '$6,002.17', '2023': '$6,187.81', '2024': '$6,379.18', '2025F': '$6,576.48', '2024 TTM': '', 'Notes': '' } },
      { label: "Total comparable company owner's compensation", isBold: true, values: { '2022': '$84,461.93', '2023': '$87,074.16', '2024': '$89,767.17', '2025F': '$92,543.48', '2024 TTM': '', 'Notes': '' } },
      { label: "Difference in owner's compensation and benchmark", isBold: true, values: { '2022': '$84,461.93', '2023': '$38,876.34', '2024': '$78,166.83', '2025F': '$92,472.67', '2024 TTM': '', 'Notes': 'Used as adjustment in adjusted consolidated income statement' } },
    ],
    explanations: [
      {
        label: 'Explanation',
        value: 'The owners of Majestic Nails & Spa took salaries ranging from $0 to $185,016 each year including the employer portion of FICA payroll tax at 7.65%. Compared to BVR DealStats comparable company owner compensation benchmarks ranging from $84,462 to $92,543, the difference in owner compensation and benchmark is used as the adjustment in the adjusted consolidated income statement.'
      },
      {
        label: 'Explanation used in report',
        value: "The owners of Majestic Nails & Spa took salaries ranging from $0 to $167,934 each year (inc. employer's share of FICA taxes). Fair market value must assume that the owner-operator is paid a market salary. Therefore, officer compensation in 2025F is adjusted to $92,543 (incl. employer's share of FICA taxes) based on a Salon Manager salary in Louisville, KY from Salary.com. Prior years have been reduced by 3.0% to account for typical wage increases."
      },
      { label: 'Raw explanation from onboarding', value: 'Currently it is salary with distributions' }
    ]
  },
  'Acquisition Stake Summary': [
    { label: 'Default AI write up', value: '' },
  ],
  '2025 Projections': [
    { label: 'Projected Net Receipts or Sales', value: '$2,098,300.64' },
    { label: 'Base Year for Net Receipts or Sales', value: 'Annualized' },
    { label: 'Projected Growth Rate', value: '0.00%', isManual: true },
    { label: 'Margins for Projection', value: 'Average' },
    { label: 'Figures shown in Report', value: '2025 projection' },
  ],
  'Discretionary Personal Expenses': [
    { item: 'Family Travel', amount: '$12,500', year: '2024' },
    { item: 'Club Memberships', amount: '$8,400', year: '2024' },
    { item: 'Personal Insurance', amount: '$5,600', year: '2024' },
  ],
  'Risk Assessment / CSRP Error': [
    { riskFactor: 'Key Person Dependency', premium: '2.5%' },
    { riskFactor: 'Customer Concentration', premium: '1.5%' },
    { riskFactor: 'Industry Volatility', premium: '1.0%' },
    { totalCSRP: 'Total Company Specific Risk', value: '5.0%' },
  ],
  'One-time Revenue / Expense Adjustments': [
    { description: 'Legal Settlement (Expense)', amount: '$50,000', type: 'Non-recurring' },
    { description: 'Insurance Payout (Income)', amount: '($25,000)', type: 'Non-recurring' },
    { description: 'Relocation Costs', amount: '$15,000', type: 'One-time' },
  ],
  'Comparable Company Adjustments': [
    { peer: 'Acme Corp', ltmEbitda: '6.5x', sizeAdjustment: '-0.5x', growthAdjustment: '+0.2x', finalMultiple: '6.2x' },
    { peer: 'Global Tech', ltmEbitda: '8.2x', sizeAdjustment: '-1.0x', growthAdjustment: '+0.5x', finalMultiple: '7.7x' },
  ]
};

import { FinancialRow, YearColumn } from './mockFinancialData';

export const VALUATION_COLUMNS: YearColumn[] = [
  { year: '2022', sourceType: 'Tax', period: '01-01-2022 – 12-31-2022' },
  { year: '2023', sourceType: 'Tax', period: '01-01-2023 – 12-31-2023' },
  { year: '2024', sourceType: 'Tax', period: '01-01-2024 – 12-31-2024' },
  { year: '2025', sourceType: 'Internal', period: '01-01-2025 – 07-31-2025' },
  { year: 'UW Proj...', sourceType: 'Uw', period: 'Set period' },
];

export const VALUATION_DATA: FinancialRow[] = [
  {
    id: 'valuation-summary',
    name: 'Valuation Summary',
    level: 0,
    isExpandable: true,
    values: { '2022': 1250000, '2023': 1480000, '2024': 1620000, '2025': 1750000, 'UW Proj...': 1900000 },
    children: [
      {
        id: 'ebitda-multiple',
        name: 'EBITDA Multiple Method',
        level: 1,
        isExpandable: true,
        values: { '2022': 1100000, '2023': 1300000, '2024': 1450000, '2025': 1550000, 'UW Proj...': 1700000 },
        children: [
          {
            id: 'adjusted-ebitda',
            name: 'Adjusted EBITDA',
            level: 2,
            isExpandable: false,
            values: { '2022': 220000, '2023': 260000, '2024': 290000, '2025': 310000, 'UW Proj...': 340000 },
          },
          {
            id: 'multiple-applied',
            name: 'Multiple Applied',
            level: 2,
            isExpandable: false,
            values: { '2022': '5.0x', '2023': '5.0x', '2024': '5.0x', '2025': '5.0x', 'UW Proj...': '5.0x' },
          }
        ]
      },
      {
        id: 'revenue-multiple',
        name: 'Revenue Multiple Method',
        level: 1,
        isExpandable: true,
        values: { '2022': 1400000, '2023': 1660000, '2024': 1790000, '2025': 1950000, 'UW Proj...': 2100000 },
        children: [
          {
            id: 'total-revenue',
            name: 'Total Revenue',
            level: 2,
            isExpandable: false,
            values: { '2022': 1400000, '2023': 1660000, '2024': 1790000, '2025': 1950000, 'UW Proj...': 2100000 },
          },
          {
            id: 'rev-multiple-applied',
            name: 'Multiple Applied',
            level: 2,
            isExpandable: false,
            values: { '2022': '1.0x', '2023': '1.0x', '2024': '1.0x', '2025': '1.0x', 'UW Proj...': '1.0x' },
          }
        ]
      }
    ],
  },
  {
    id: 'market-value',
    name: 'Net Asset Value',
    level: 0,
    isExpandable: true,
    values: { '2022': 445137, '2023': 586786, '2024': 326167, '2025': 483295, 'UW Proj...': 500000 },
    children: []
  }
];

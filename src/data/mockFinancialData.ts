import { LucideIcon } from 'lucide-react';

export interface FinancialRow {
  id: string;
  name: string;
  isExpandable?: boolean;
  level: number;
  values: Record<string, string | number>;
  sourceId?: string;
  children?: FinancialRow[];
}

export interface YearColumn {
  year: string;
  label?: string;
  sourceType: 'Tax' | 'Internal' | 'Uw' | 'Adjustment';
  period: string;
}

export const MOCK_COLUMNS: YearColumn[] = [
  { year: '2022', label: '2022', sourceType: 'Tax', period: '12/31/2022' },
  { year: '2023', label: '2023', sourceType: 'Tax', period: '12/31/2023' },
  { year: '2024', label: '2024', sourceType: 'Tax', period: '12/31/2024' },
  { year: '2025', label: '2025', sourceType: 'Internal', period: '07/31/2025' },
  { year: 'UW Proj...', label: 'UW Proj...', sourceType: 'Uw', period: 'Set period' },
];

export const PROFORMA_COLUMNS: YearColumn[] = [
  { year: 'tax_return_1', label: 'Tax Return', sourceType: 'Tax', period: '12/31/2022' },
  { year: 'tax_return_2', label: 'Tax Return', sourceType: 'Tax', period: '12/31/2023' },
  { year: 'tax_return_3', label: 'Tax Return', sourceType: 'Tax', period: '12/31/2024' },
  { year: 'interim', label: 'Interim', sourceType: 'Internal', period: '07/31/2025' },
  { year: 'included_in_value', label: 'Included in Value', sourceType: 'Uw', period: 'N/A' },
  { year: 'adjustment_factor', label: 'Adjustment Factor', sourceType: 'Adjustment', period: 'N/A' },
  { year: 'adjustment', label: 'Adjustment', sourceType: 'Adjustment', period: 'N/A' },
  { year: 'adjustment_book_value', label: 'Adjustment Book Value', sourceType: 'Adjustment', period: 'N/A' },
];

export const INCOME_COLUMNS: YearColumn[] = [
  { year: 'tr1', label: 'Tax Return', sourceType: 'Tax', period: '12/31/2022' },
  { year: 'cs1', label: 'Common Sizing', sourceType: 'Tax', period: '12/31/2022' },
  { year: 'tr2', label: 'Tax Return', sourceType: 'Tax', period: '12/31/2023' },
  { year: 'cs2', label: 'Common Sizing', sourceType: 'Tax', period: '12/31/2023' },
  { year: 'tr3', label: 'Tax Return', sourceType: 'Tax', period: '12/31/2024' },
  { year: 'cs3', label: 'Common Sizing', sourceType: 'Tax', period: '12/31/2024' },
  { year: 'interim', label: 'Interim', sourceType: 'Internal', period: '07/31/2025' },
  { year: 'cs4', label: 'Common Sizing', sourceType: 'Internal', period: '07/31/2025' },
  { year: 'annualized', label: 'Annualized', sourceType: 'Internal', period: '12/31/2025' },
  { year: 'cs5', label: 'Common Sizing', sourceType: 'Internal', period: '12/31/2025' },
  { year: 'cs_avg', label: 'Common Sizing Average', sourceType: 'Uw', period: 'Average' },
  { year: 'projections', label: 'Projections', sourceType: 'Uw', period: '12/31/2025' },
  { year: 'cs6', label: 'Common Sizing', sourceType: 'Uw', period: '12/31/2025' },
  { year: 'ttm', label: 'TTM', sourceType: 'Internal', period: '7/31/2025' },
  { year: 'ttm_cs', label: 'Common Sizing', sourceType: 'Internal', period: '7/31/2025' },
];

export const MOCK_DATA: FinancialRow[] = [
  {
    id: 'assets-group',
    name: 'Total Assets',
    level: 0,
    isExpandable: true,
    values: {
      'tax_return_1': 445137, 'tax_return_2': 586786, 'tax_return_3': 326167, 'interim': 483295,
      'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': -266558, 'adjustment_book_value': 216737
    },
    children: [
      {
        id: 'total-current-assets',
        name: 'Total Current Assets',
        level: 1,
        isExpandable: true,
        values: {
          'tax_return_1': 239716, 'tax_return_2': 366402, 'tax_return_3': 131368, 'interim': 141160,
          'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': -105435, 'adjustment_book_value': 35725
        },
        children: [
          {
            id: 'cash-equivalents',
            name: 'Cash and Cash Equivalents',
            level: 2,
            isExpandable: true,
            values: {
              'tax_return_1': 239716, 'tax_return_2': 366402, 'tax_return_3': 131368, 'interim': 105435,
              'included_in_value': 'No', 'adjustment_factor': 1.0, 'adjustment': -105435, 'adjustment_book_value': 0
            },
            children: [
              {
                id: 'bank-accounts',
                name: 'Bank Accounts',
                level: 3,
                values: {
                  'tax_return_1': 239716, 'tax_return_2': 366402, 'tax_return_3': 131368, 'interim': 105435,
                  'included_in_value': 'No', 'adjustment_factor': 1.0, 'adjustment': -105435, 'adjustment_book_value': 0
                }
              },
              {
                id: 'petty-cash',
                name: 'Petty Cash',
                level: 3,
                values: {
                  'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0,
                  'included_in_value': 'No', 'adjustment_factor': 1.0, 'adjustment': 0, 'adjustment_book_value': 0
                }
              },
              {
                id: 'restricted-cash',
                name: 'Restricted Cash',
                level: 3,
                values: {
                  'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0,
                  'included_in_value': '-', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 0
                }
              }
            ]
          },
          {
            id: 'trade-ar',
            name: 'Trade Accounts Receivable',
            level: 2,
            isExpandable: true,
            values: {
              'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0,
              'included_in_value': '-', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 0
            },
            children: [
              {
                id: 'trade-ar-gross',
                name: 'Trade Accounts Receivable Gross',
                level: 3,
                values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 }
              },
              {
                id: 'allowance-bad-debts',
                name: 'Allowance for Bad Debts',
                level: 3,
                values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 }
              }
            ]
          },
          {
            id: 'inventory-group',
            name: 'Inventory',
            level: 2,
            isExpandable: true,
            values: {
              'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 35725,
              'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 35725
            },
            children: [
              {
                id: 'inventories-detail',
                name: 'Inventories',
                level: 3,
                values: {
                  'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 35725,
                  'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 35725
                }
              },
              { id: 'const-mat-inv', name: 'Construction Materials Inventory', level: 3, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
              { id: 'cip-inv', name: 'Construction In Progress', level: 3, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
              { id: 'raw-mat-inv', name: 'Raw Materials Inventory', level: 3, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
              { id: 'wip-inv', name: 'Work In Process Inventory', level: 3, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
              { id: 'finished-goods-inv', name: 'Finished Goods Inventory', level: 3, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
              { id: 'merchandise-inv', name: 'Merchandise Inventory', level: 3, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
              { id: 'fuel-inv', name: 'Fuel Inventory', level: 3, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } }
            ]
          }
        ]
      },
      {
        id: 'total-non-current-assets',
        name: 'Total Non Current Assets',
        level: 1,
        isExpandable: true,
        values: {
          'tax_return_1': 205421, 'tax_return_2': 220384, 'tax_return_3': 194799, 'interim': 342135,
          'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': -161123, 'adjustment_book_value': 181012
        },
        children: [
          {
            id: 'ppe-group',
            name: 'Property Plant and Equipment',
            level: 2,
            isExpandable: true,
            values: {
              'tax_return_1': 205421, 'tax_return_2': 220384, 'tax_return_3': 194799, 'interim': 342135,
              'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': -161123, 'adjustment_book_value': 181012
            },
            children: [
              {
                id: 'ppe-gross',
                name: 'Property Plant and Equipment Gross',
                level: 3,
                values: {
                  'tax_return_1': 380090, 'tax_return_2': 432090, 'tax_return_3': 432090, 'interim': 342135,
                  'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': -161123, 'adjustment_book_value': 181012
                }
              },
              { id: 'accum-depreciation', name: 'Accumulated Depreciation', level: 3, values: { 'tax_return_1': -174669, 'tax_return_2': -211706, 'tax_return_3': -237291, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'liabilities-group',
    name: 'Total Liabilities',
    level: 0,
    isExpandable: true,
    values: {
      'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0,
      'included_in_value': 'Yes', 'adjustment_factor': 1.0, 'adjustment': 0, 'adjustment_book_value': 0
    },
    children: [
      { id: 'accounts-payable', name: 'Accounts Payable', level: 1, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
      { id: 'accrued-expenses', name: 'Accrued Expenses', level: 1, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } }
    ]
  },
  {
    id: 'equity-group',
    name: 'Total Equity',
    level: 0,
    isExpandable: true,
    values: {
      'tax_return_1': 445137, 'tax_return_2': 586786, 'tax_return_3': 326167, 'interim': 483295,
      'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 216737
    },
    children: [
      { id: 'common-stock', name: 'Common Stock', level: 1, values: { 'tax_return_1': 200000, 'tax_return_2': 200000, 'tax_return_3': 200000, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
      { id: 'retained-earnings', name: 'Retained Earnings', level: 1, values: { 'tax_return_1': 245137, 'tax_return_2': 386786, 'tax_return_3': 126167, 'interim': 0, 'included_in_value': '-', 'adjustment_factor': 0 } },
      { id: 'other-equity', name: 'Other Equity', level: 1, values: { 'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 483295, 'included_in_value': 'Yes', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 216737 } }
    ]
  },
  {
    id: 'total-liabilities-equity',
    name: 'Total Liabilities and Equity',
    level: 0,
    values: {
      'tax_return_1': 445137, 'tax_return_2': 586786, 'tax_return_3': 326167, 'interim': 483295,
      'included_in_value': '-', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 216737
    }
  },
  {
    id: 'variance',
    name: 'Variance',
    level: 0,
    values: {
      'tax_return_1': 0, 'tax_return_2': 0, 'tax_return_3': 0, 'interim': 0,
      'included_in_value': '-', 'adjustment_factor': 0, 'adjustment': -266558, 'adjustment_book_value': 0
    }
  },
  {
    id: 'tangible-net-worth',
    name: 'Tangible Net Worth',
    level: 0,
    values: {
      'tax_return_1': 445137, 'tax_return_2': 586786, 'tax_return_3': 326167, 'interim': 483295,
      'included_in_value': '-', 'adjustment_factor': 0, 'adjustment': 0, 'adjustment_book_value': 216737
    }
  }
];

export const INCOME_DATA: FinancialRow[] = [
  {
    id: 'meta-start-date',
    name: 'Statement Start Date',
    level: 0,
    values: {
      'tr1': '01/01/2022', 'cs1': '',
      'tr2': '01/01/2023', 'cs2': '',
      'tr3': '01/01/2024', 'cs3': '',
      'interim': '01/01/2025', 'cs4': '',
      'annualized': '01/01/2025', 'cs5': '',
      'cs_avg': '',
      'projections': '01/01/2025', 'cs6': '',
      'ttm': '08/01/2024', 'ttm_cs': ''
    }
  },
  {
    id: 'meta-end-date',
    name: 'Statement End Date',
    level: 0,
    values: {
      'tr1': '12/31/2022', 'cs1': '',
      'tr2': '12/31/2023', 'cs2': '',
      'tr3': '12/31/2024', 'cs3': '',
      'interim': '07/31/2025', 'cs4': '',
      'annualized': '12/31/2025', 'cs5': '',
      'cs_avg': '',
      'projections': '12/31/2025', 'cs6': '',
      'ttm': '07/31/2025', 'ttm_cs': ''
    }
  },
  {
    id: 'meta-days',
    name: '# of Days',
    level: 0,
    values: {
      'tr1': 365, 'cs1': '',
      'tr2': 365, 'cs2': '',
      'tr3': 366, 'cs3': '',
      'interim': 212, 'cs4': '',
      'annualized': 365, 'cs5': '',
      'cs_avg': '',
      'projections': 365, 'cs6': '',
      'ttm': 366, 'ttm_cs': ''
    }
  },
  {
    id: 'meta-statement-date',
    name: 'Statement Date',
    level: 0,
    values: {
      'tr1': '12/31/2022', 'cs1': '',
      'tr2': '12/31/2023', 'cs2': '',
      'tr3': '12/31/2024', 'cs3': '',
      'interim': '7/31/2025', 'cs4': '',
      'annualized': '12/31/2025', 'cs5': '',
      'cs_avg': '12/31/2025',
      'projections': '12/31/2024', 'cs6': '',
      'ttm': '7/31/2025', 'ttm_cs': ''
    }
  },
  {
    id: 'revenue-group',
    name: 'Total Revenue',
    level: 0,
    isExpandable: true,
    values: {
      'tr1': 1826221, 'cs1': 100.01,
      'tr2': 1987377, 'cs2': 100.02,
      'tr3': 1904808, 'cs3': 100.01,
      'interim': 1218739, 'cs4': 100.00,
      'annualized': 2098300.64, 'cs5': 100.00,
      'cs_avg': 100.02,
      'projections': 2098563.95, 'cs6': 100.01,
      'ttm': 2017192.76, 'ttm_cs': 100.00
    },
    children: [
      {
        id: 'sales-revenue',
        name: 'Sales Revenue',
        level: 1,
        values: {
          'tr1': 1826221, 'cs1': 100.01,
          'tr2': 1987377, 'cs2': 100.02,
          'tr3': 1904808, 'cs3': 100.01,
          'interim': 1218739, 'cs4': 100.00,
          'annualized': 2098300.64, 'cs5': 100.00,
          'cs_avg': 100.02,
          'projections': 2098563.95, 'cs6': 100.01,
          'ttm': 2017192.76, 'ttm_cs': 100.00
        }
      },
      {
        id: 'sales-discounts',
        name: 'Sales Discounts',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'returns-allowances',
        name: 'Returns and Allowances',
        level: 1,
        values: {
          'tr1': -232, 'cs1': -0.01,
          'tr2': -435, 'cs2': -0.02,
          'tr3': -239, 'cs3': -0.01,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': -0.02,
          'projections': -263.31, 'cs6': -0.01,
          'ttm': -100.18, 'ttm_cs': 0
        }
      },
      {
        id: 'gifts-grants',
        name: 'Gifts, Grants and Contributions',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'program-service-revenue',
        name: 'Program Service Revenue',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'service-revenue',
        name: 'Service Revenue',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'rental-income',
        name: 'Rental Income',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'other-revenue',
        name: 'Other Revenue',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'contract-revenue',
        name: 'Contract Revenue',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'change-order-revenue',
        name: 'Change Order Revenue',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'retainage-released',
        name: 'Retainage Released',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'room-revenue',
        name: 'Room Revenue',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'gaming-revenue',
        name: 'Gaming Revenue',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'food-sales',
        name: 'Food Sales',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'alcohol-sales',
        name: 'Alcohol Sales',
        level: 1,
        values: {
          'tr1': 0, 'cs1': 0,
          'tr2': 0, 'cs2': 0,
          'tr3': 0, 'cs3': 0,
          'interim': 0, 'cs4': 0,
          'annualized': 0, 'cs5': 0,
          'cs_avg': 0,
          'projections': 0, 'cs6': 0,
          'ttm': 0, 'ttm_cs': 0
        }
      },
      {
        id: 'net-receipts',
        name: 'Net Receipts or Sales',
        level: 1,
        values: {
          'tr1': 1825989, 'cs1': 100.00,
          'tr2': 1986942, 'cs2': 100.00,
          'tr3': 1904569, 'cs3': 100.00,
          'interim': 1218739, 'cs4': 100.00,
          'annualized': 2098300.64, 'cs5': 100.00,
          'cs_avg': 100.00,
          'projections': 2098300.64, 'cs6': 100.00,
          'ttm': 2017092.58, 'ttm_cs': 100.00
        }
      }
    ]
  }
];
export interface CompanyComp {
  company: string;
  description: string;
  netSales: string;
  grossProfit: string;
  valuation: string;
}

export interface ComparableSet {
  id: string;
  name: string;
  companies: CompanyComp[];
}

export const COMPARABLE_SETS: ComparableSet[] = [
  {
    id: 'set-1',
    name: 'Comparable Set 1',
    companies: [
      { company: 'Company 1', description: 'Day Spa', netSales: '$2,100,000', grossProfit: '$1,850,000', valuation: '$1,500,000' },
      { company: 'Company 2', description: 'Nail Spa', netSales: '$1,400,000', grossProfit: '$1,200,000', valuation: '$1,000,000' },
      { company: 'Company 3', description: 'Salon and Spa', netSales: '$1,250,000', grossProfit: '$1,100,000', valuation: '$975,000' },
      { company: 'Company 4', description: 'Beauty Salons and Spa', netSales: '$1,300,000', grossProfit: '$1,050,000', valuation: '$963,632' },
      { company: 'Company 5', description: 'Beauty Salon', netSales: '$1,150,000', grossProfit: '$950,000', valuation: '$900,000' },
      { company: 'Company 6', description: 'Nail Salon', netSales: '$1,050,000', grossProfit: '$900,000', valuation: '$875,000' },
      { company: 'Company 7', description: 'Salon and Day Spa', netSales: '$980,000', grossProfit: '$820,000', valuation: '$800,000' },
      { company: 'Company 8', description: 'Beauty Salon', netSales: '$850,000', grossProfit: '$700,000', valuation: '$648,950' },
      { company: 'Company 9', description: 'Nail Salon', netSales: '$800,000', grossProfit: '$650,000', valuation: '$602,000' },
      { company: 'Company 10', description: 'Beauty Salon and Day Spa', netSales: '$750,000', grossProfit: '$600,000', valuation: '$550,000' },
      { company: 'Company 11', description: 'Salon and Day Spa', netSales: '$720,000', grossProfit: '$580,000', valuation: '$543,000' },
      { company: 'Company 12', description: 'Beauty Salon', netSales: '$680,000', grossProfit: '$540,000', valuation: '$510,000' },
      { company: 'Company 13', description: 'Nail Salon and Day Spa', netSales: '$650,000', grossProfit: '$520,000', valuation: '$503,082' },
      { company: 'Company 14', description: 'Beauty Salon', netSales: '$620,000', grossProfit: '$510,000', valuation: '$500,000' },
      { company: 'Company 15', description: 'Beauty Salon', netSales: '$600,000', grossProfit: '$490,000', valuation: '$480,000' },
    ]
  },
  {
    id: 'set-2',
    name: 'Comparable Set 2',
    companies: [
      { company: 'Elite Wellness', description: 'Full Service Spa', netSales: '$3,200,000', grossProfit: '$2,800,000', valuation: '$2,400,000' },
      { company: 'Urban Retreat', description: 'Boutique Spa', netSales: '$2,100,000', grossProfit: '$1,850,000', valuation: '$1,650,000' },
      { company: 'Pure Nails', description: 'Luxury Nail Salon', netSales: '$1,200,000', grossProfit: '$1,000,000', valuation: '$950,000' },
      { company: 'Serenity Hub', description: 'Massage Therapy', netSales: '$950,000', grossProfit: '$800,000', valuation: '$720,000' },
      { company: 'Glow Up', description: 'Facial & Skin Care', netSales: '$850,000', grossProfit: '$720,000', valuation: '$680,000' },
    ]
  },
  {
    id: 'set-3',
    name: 'Comparable Set 3',
    companies: [
      { company: 'Local Cuts', description: 'Neighborhood Barber', netSales: '$450,000', grossProfit: '$400,000', valuation: '$350,000' },
      { company: 'Style Station', description: 'Hair Salon', netSales: '$600,000', grossProfit: '$520,000', valuation: '$480,000' },
      { company: 'Modern Mani', description: 'Express Nail Bar', netSales: '$520,000', grossProfit: '$450,000', valuation: '$410,000' },
    ]
  }
];

export const KPI_DASHBOARD_BHS = {
  companyInfo: {
    name: 'Majestic Nails & Spa',
    customerId: 'Majestic Nails & Spa'
  },
  kpis: [
    { metric: 'Gross Profit Margin', target: '100.0%', value: '67.5%' },
    { metric: 'SDE Margin', target: '34.0%', value: '19.3%' },
    { metric: 'EBITDA Margin', target: '29.5%', value: '14.2%' },
    { metric: 'Operating Profit Margin', target: '28.5%', value: '14.2%' },
    { metric: 'Net Profit Margin', target: '28.0%', value: '9.8%' },
    { metric: 'Inventory Turnover', target: '-', value: '25.79' },
    { metric: 'COGS/Sales', target: '0.00%', value: '33.3%' },
    { metric: 'Rent/Sales', target: '7.4%', value: '8.7%' },
    { metric: 'Forward Earnings Growth', target: '3.0%', value: '22.7%' },
    { metric: '3-Yr trailing Earnings Growth', target: '0.5%', value: '22.7%' },
    { metric: 'Accounts Receivable Turnover', target: '-', value: '' },
  ],
  healthScore: {
    targetsTotal: 9,
    targetsAchieved: 7,
    score: 78,
    status: 'Promising'
  }
};
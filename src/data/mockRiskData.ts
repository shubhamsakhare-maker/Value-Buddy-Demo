export const SBA_LOAN_INFO = {
  state: { code: 'KY', name: 'Kentucky' },
  zipcode: '40202',
  loanSize: '$650,000',
  naics4Digit: '8121',
  naicsDescription: 'Personal Care Services'
};

export const COMP_DATABASE_INFO = {
  naics4Digit: '8121',
  zipcode3Digit: '402',
  loanSizeBucket: {
    number: '3',
    range: '$500,001 to $750,000'
  }
};

export const SBA_DEFAULT_DASHBOARD = {
  rows: [
    {
      category: 'All SBA loans',
      numLoans: '1,885,356',
      avgChargeOff: '4.08%',
      weighting: 'NA',
      contribution: 'NA',
      rank: 'NA'
    },
    {
      category: 'NAICS',
      numLoans: '34,894',
      avgChargeOff: '4.42%',
      weighting: '50%',
      contribution: '108.4%',
      rank: '4'
    },
    {
      category: 'State',
      numLoans: '15,878',
      avgChargeOff: '5.19%',
      weighting: '10%',
      contribution: '127.3%',
      rank: '2'
    },
    {
      category: 'Zipcode',
      numLoans: '4,363',
      avgChargeOff: '5.67%',
      weighting: '10%',
      contribution: '139.0%',
      rank: '1'
    },
    {
      category: 'Loan size',
      numLoans: '95,187',
      avgChargeOff: '4.43%',
      weighting: '30%',
      contribution: '108.7%',
      rank: '3'
    },
    {
      category: 'Change of ownership',
      numLoans: '44,147',
      avgChargeOff: '0.64%',
      weighting: '0%',
      contribution: '0.0%',
      rank: '5'
    }
  ],
  consensus: '4.62%',
  consensusRelativeToAvg: '113%',
  scorecard: 'comparable'
};

export const CARBON_DATA_ANALYSIS = {
  formulaFields: [
    { label: 'Company name', value: 'Majestic Nails & Spa' },
    { label: 'NAICS 3 digit', value: '812' },
    { label: 'Avg. flow', value: '1,097,741,496' },
    { label: 'Flow per GDP', value: '0.005137195' },
    { label: 'Flow per firm', value: '2,471' },
    { label: 'Avg. flow per GDP', value: '0.175694084' },
    { label: 'Avg. flow per firm', value: '376538' },
    { label: 'Industry', value: 'Personal Care Services' },
    { label: 'Available data', value: 'Both' }
  ],
  manualFields: [
    { key: 'sources', label: 'Sources', value: '-' },
    { key: 'gdpData', label: 'GDP data', value: 'Bureau of Economic Analysis (BEA)' },
    { key: 'carbonData', label: 'Carbon data', value: 'Environmental Protection Agency (EPA)' },
    {
      key: 'flowNote',
      label: 'Flow note',
      value: 'Flow is carbon dioxide emissions measured in kg GHG, data is based on the average from 2016-2020, data provided by the U.S. EPA'
    },
    {
      key: 'gdpNote',
      label: 'GDP note',
      value: 'GDP data is from the U.S. Bureau of Economic Analysis'
    },
    {
      key: 'firmCountNote',
      label: 'Firm count note',
      value: "Firm count is from the U.S. Census Bureau's Statistics of U.S. Businesses (SUSB) data published in 2023 for the 2020 Census"
    }
  ],
  prompt: `Pretend you are a credit analyst at a bank determining any risks in financing the acquisition of a small business based strictly on its environmental risk. Keep your write up within 125-200 words and objective, do not mention your role or the instructions you were provided - if you break any of these rules you will be severely punished. Make your write-up as quantitative as possible, always include the data points used in your analysis, including the industry-specific data and the national benchmarks. You will be provided public data on the industry of the business, use this to form a conclusion of the associated environmental risk. Always mention that further analysis should be performed in line with the SBA SOP which may include a more detailed 3rd party environmental report. You can start your response with something like "based on our analysis of carbon emissions data..."`,
  context: 'For the purposes of this analysis, sustainability is measured as carbon emissions per dollar of GDP contributed by the industry and carbon emissions per firm in the industry (all U.S. based data). The Personal Care Services industry averages 0.005137 kg GHG of CO2 emitted per dollar of GDP generated compared to an average of 0.175694 for all industries in the U.S. which equates to 2,471 kg GHG in CO2 emissions per firm in the Personal Care Services industry, compared to an average of 376,538 kg GHG CO2 emissions per firm in the U.S. across all industries.',
  writeUp: `Based on our analysis of carbon emissions data, the Personal Care Services industry demonstrates a relatively low environmental risk profile. The industry averages 0.005137195 kg GHG of CO2 emitted per dollar of GDP generated, significantly lower than the U.S. all-industry average of 0.175694084. This indicates a more sustainable level of carbon emissions per unit of economic output. Additionally, the industry emits 2471 kg GHG in CO2 per firm, notably lower than the U.S. all-industry average of 376538 kg GHG CO2 emissions per firm. These figures suggest that the Personal Care Services industry has a lower environmental impact compared to the broader industrial landscape.

However, it is important to note that this analysis provides only a high-level overview of environmental risk. Further in-depth analysis, in line with the SBA SOP, should be conducted, potentially including a detailed third-party environmental report, to comprehensively assess the environmental risks associated with financing the acquisition of a small business in the Personal Care Services industry.`,
  scorePromptFormula: 'Pretend you are a credit analyst at a bank determining if there is risk associated with financing a small business acquisition based on its environmental impact / risk. You will read a short write up from an environmental consultant then return nothing but a risk score on a scale of 1 to 5 (only the number, no additional text), with 1 being significant risk of default due to environmental concerns and 5 being neglible or positive environmental impact leading to neglible risk of default due to this factor. The provided environmental write up is "&U34',
  environmentalScore: '4'
};

export const TARIFF_DATA_ANALYSIS = {
  formulaFields: [
    { label: 'Company name', value: 'Majestic Nails & Spa' },
    { label: 'Company industry', value: 'Healthcare Support Services' },
    { label: 'Industry description', value: 'They are full service Nail Salon and spa' },
    {
      label: 'Product / service',
      value: 'Here at Majestic Nails & Spa in Louisville, KY we are a full service nail salon. We offer services ranging from manicures, pedicures, gel nails, dip powder, and acrylics. We accept appointments but also welcome walk-ins. We cure your gel polish with an LED light instantly drying your nails. We provide many popular shades of polish to fit your style! With our talent and expertise, we can ensure you receive the absolute best in nail service Our salon is classy, chic and upscale offering reasonable pricing. We strive off of the quality we offer our guests and your satisfaction is our number one priority. Enjoy the Majestic Experience in our beautiful salon where we offer refreshments including a wine bar.'
    },
    {
      label: 'List of industries',
      value: 'Agriculture - Cereals, Aircraft & Parts, Aluminum Products, Apparel - Knitted, Apparel - Not Knitted, Chemicals - Essential Oils & Cosmetics, Chemicals - Fertilizers, Chemicals - Inorganic, Chemicals - Organic, Chemicals - Other, Chemicals - Soap & Detergents, Clocks & Watches, Copper & Articles, Copper Products, Cork & Articles Thereof, Electrical Equipment, Electronics & Optics, Energy - Mineral Fuels & Oils, Food & Beverage - Beverages, Food & Beverage - Spirits, Food Processing - Cereal Preparations, Food Processing - Cocoa & Coffee Substitutes, Food Processing - Fats & Oils, Food Processing - Lac, Gums, Resins, Food Processing - Meat & Fish Preparations, Food Processing - Milling Products, Food Processing - Oil Seeds & Fats, Food Processing - Other Preparations, Food Processing - Sugars, Food Processing - Vegetable Preparations, Footwear, Furniture, Furs, Headgear, Iron & Steel, Iron & Steel Products, Iron Ore & Scrap, Lead Products, Leather & Hides, Leather Products, Machinery & Appliances, Machinery Parts, Minerals - Minerals & Stone, Minerals - Ores & Concentrates, Minerals - Other Mineral Products, Miscellaneous Manufactured Articles, Musical Instruments, Nickel Products, Optical & Medical Instruments, Other Apparel, Paper & Paperboard, Pharmaceuticals, Plastics, Rubber, Ships, Boats & Accessories, Textiles - Accessories, Textiles - Apparel, Textiles - Carpets & Rugs, Textiles - Cotton, Textiles - Other Apparel, Textiles - Silk, Textiles - Wool, Tools & Cutlery, Toys & Sports Equipment, Vehicles & Parts, Wood & Wood Products'
    }
  ],
  keyInputs: 'Chemicals - Essential Oils & Cosmetics, Textiles - Other Apparel, Furniture',
  industryRisks: [
    { industry: 'Chemicals - Essential Oils & Cosmetics', baseVulnerabilityScore: '8.94', chinaExposure: '3.93', combinedRiskScore: '13.16', classification: 'Low risk' },
    { industry: 'Textiles - Other Apparel', baseVulnerabilityScore: '22.54', chinaExposure: '1.29', combinedRiskScore: '23.64', classification: 'Moderate risk' },
    { industry: 'Furniture', baseVulnerabilityScore: '8.3', chinaExposure: '1.42', combinedRiskScore: '19.16', classification: 'Low risk' }
  ],
  relevantIndustriesAndRisk: 'Chemicals - Essential Oils & Cosmetics - Low risk; Textiles - Other Apparel - Moderate risk; Furniture - Low risk',
  aiTariffRiskWriteUp: "The recent tariffs on textiles are expected to result in a short-run price increase of 15.6% and a long-run increase of 9.7%. Majestic Nails & Spa LLC, utilizing textiles for spa robes and linens, may face higher costs for these essential items. Additionally, tariffs on leather products could lead to a short-run price hike of 33.3% and a long-run increase of 17.5%. As the business incorporates leather in spa furniture and decor, increased expenses may impact their cost structure and pricing strategy. These tariff impacts on key supplies like textiles and leather could challenge Majestic Nails & Spa LLC's ability to maintain competitive pricing while upholding their upscale service offerings. The broader Services sector, including healthcare support services, is expected to see a -0.10% GDP impact from the tariffs, potentially affecting the overall economic contribution of businesses like Majestic Nails & Spa LLC.",
  generalTariffContext: `State of U.S. Tariffs: June 17, 2025

Consumers face an overall average effective tariff rate of 15.8% before consumption shifts and 14.7% after shifts, the highest levels since the 1930s. The price level from all 2025 tariffs rises by 1.5% in the short run and settles at 1.3% in the long run. Clothing and textiles are disproportionately affected, with apparel prices 28% higher in the short run and 15% higher in the long run. U.S. real GDP growth over 2025 is estimated to be 0.6 percentage points lower, with the long-run economy persistently 0.3% smaller. Services are expected to see a -0.10% long-run GDP impact.`,
  source: 'https://budgetlab.yale.edu/research/state-us-tariffs-june-17-2025',
  materialsList: 'Metals nec; Leather products; Wearing apparel; Electrical equipment; Crops nec; Ferrous metals; Computer, electronic and optical; Textiles; Motor vehicles and parts; Mineral products nec; Machinery and equipment nec; Metal products; Rubber and plastic products; Manufactures nec; Transport equipment nec; Fishing; Wood products; Natural gas; Vegetables, fruit, nuts; Paper products, publishing; Chemical products; Processed rice; Food products nec; Beverages and tobacco products; Vegetable oils and fats; Oil; Basic pharmaceutical products; Forestry; Cereal grains nec; Animal products nec; Paddy rice; Minerals nec; Sugar; Bovine meat products; Petroleum, coal products; Meat products nec; Dairy products; Oil seeds; Wool, silk-worm cocoons; Electricity; Wheat; Bovine cattle, sheep and goats; Construction; Plant-based fibers; Raw milk; Coal; Sugar cane, sugar beet; Water; Gas manufacture, distribution; Recreational and other services; Trade; Dwellings; Transport nec; Education; Communication; Insurance; Financial services nec; Warehousing and support; Water transport; Human health and social work; Public Administration; Air transport; Accommodation & food services; Business services nec; Real estate activities',
  materialSelector: 'Textiles; Chemical products',
  materialImpactWriteUp: 'The recent tariffs imposed by the U.S. on textiles are expected to result in a short-run price increase of 15.6% and a long-run price increase of 9.7%. This will likely impact Majestic Nails & Spa LLC as they use textiles for spa robes, towels, and other linens, potentially leading to higher costs for these essential items.\n\nAdditionally, tariffs on chemical products are projected to result in a short-run price increase of 3.8% and a long-run price impact of 3.5%. Majestic Nails & Spa LLC relies on chemical products for nail polish, acrylics, and other beauty treatments, indicating that they may face higher expenses for these supplies over time.',
  selectedMaterialImpacts: [
    { name: 'Textiles', shortRun: '15.6', longRun: '9.7' },
    { name: 'Chemical products', shortRun: '3.8', longRun: '3.5' }
  ],
  materialImpacts: [
    { name: 'Metals nec', shortRun: '37.8', longRun: '19.7' },
    { name: 'Leather products', shortRun: '33.3', longRun: '17.5' },
    { name: 'Wearing apparel', shortRun: '28.4', longRun: '15' },
    { name: 'Textiles', shortRun: '15.6', longRun: '9.7' },
    { name: 'Furniture-related manufactures', shortRun: '7.8', longRun: '5.6' },
    { name: 'Chemical products', shortRun: '3.8', longRun: '3.5' }
  ],
  sectorFields: [
    { label: 'List of industries', value: 'Agriculture; Mining & Extraction; Total Manufacturing; Durable Manufacturing; Advanced Manufacturing; Nondurable Manufacturing; Utilities; Construction; Services' },
    { label: 'Industry selector', value: 'Services' },
    { label: 'Industry impact', value: '-0.10%' }
  ],
  sectorWriteUp: 'The business falls within the broader Services sector which is expected to see a -0.10% GDP impact due to tariffs enacted as of May 12, 2025.'
};

export const RISK_ASSESSMENT_DATA = {
  sbaLoanDefault: {
    score: 6,
    clientBank: {
      name: 'Central Bank',
      units: '1270',
      defaultRate: '4.06%',
      allLoansMatured: '80.40%',
      bankLoansMatured: '65.75%'
    },
    writeUp: `Based on our analysis of 1,885,356 SBA 7a loans issued since 1991, Majestic Nails & Spa LLC may have a comparable likelihood to result in a default, relative to all change of ownership loans, if this acquisition is financed. The SBA loan default risk analysis is designed to be viewed as a directional measurement of risk, not an absolute measure of the expected charge-off rate. Given that the SBA did not begin publishing the loan purpose (e.g., change of ownership) until 2018, many of these loans have not reached maturity, which can lead to an artificially low charge-off rate, which is why this factor is not weighted at all in the overall charge-off estimate. Similarly, Central Bank's loan portfolio may differ in maturity to the typical loan in this dataset. 80% of all SBA 7a loans since 1991 have reached maturity vs. 66% of Central Bank's 1270 that have reached maturity.`
  },
  managementTeam: {
    score: 9,
    writeUp: `The management team at Majestic Nails & Spa LLC is highly experienced with over 10 years of industry-specific experience. While somewhat critical to operations, the business has systems and processes in place for operational continuity. This indicates a moderate level of risk in terms of management dependence for the loan acquisition.`,
    scorecard: [
      { question: 'Experience Level', response: 'Highly experienced (10+ years)', score: 5 },
      { question: 'Involvement Criticality', response: 'Somewhat critical', score: 4 }
    ]
  },
  revenueStability: {
    score: 4,
    data: [
      { label: 'Revenue', year1: '$1,825,989.00', year2: '$1,986,942.00', year3: '$1,904,569.00', interim: '$2,098,300.64' },
      { label: 'Increase YoY (1 = no)', year1: '', year2: '0', year3: '1', interim: '0' },
      { label: 'YoY growth rate', year1: '', year2: '8.81%', year3: '-4.15%', interim: '10.17%' }
    ],
    metrics: {
      cagr4yr: '4.74%',
      rgci: '0.60',
      annualizedInterimMethod: 'SUM',
      increaseSummary: '2 (out of 3 Years)',
      increaseContribution: '1',
      gdpBenchmark: '2%',
      gdpBenchmarkPass: '1',
      comparableGrowthRate: '22.66%',
      comparableGrowthPass: '0',
      positiveNegative: '0',
      positiveNegativePass: '1',
      benchmarkSum: '2',
      benchmarkContribution: '2',
      rgciContribution: '1'
    },
    writeUp: `Majestic Nails & Spa LLC has shown inconsistent revenue growth over the past three years, with a net sales compound annual growth rate (CAGR) of 4.74%. This is significantly lower than the industry average of 22.66% and the U.S. GDP growth rate of 1.80%. The Revenue Growth Consistency Index (RGCI) of 0.60 indicates a moderate level of revenue stability. This suggests a higher risk associated with financing a business acquisition due to the business's below-average revenue growth performance compared to its peers and the overall economy.`
  },
  financialHealth: {
    score: 9,
    status: 'Promising',
    targets: '7 / 9',
    businessHealthContribution: '3',
    currentRatio: 'Not calculated',
    benchmarkCurrentRatio: '0.23',
    standardBenchmark: 'between 1.2 to 2.5, varies by industry',
    adjustedBenchmark: '1.2',
    benchmarkRationale: 'The benchmark for current ratio in the Nail care and beauty industry is 1.2.',
    industry: 'Nail care and beauty',
    currentRatioContribution: '3',
    interestCoverage: 'Interest coverage ratio cannot be calculated.',
    interestCoverageContribution: '3',
    interestCoverageRationale: 'An interest coverage ratio below 1.5 is weak, 1.5 to 3 is reasonable, over 3 is strong.',
    writeUp: `Majestic Nails & Spa LLC received a promising business health score from Value Buddy, achieving 7 out of Target's total targets. This score considers factors such as profit margins and growth rates. However, the current ratio was not calculated, with the industry benchmark set at 1.2. Additionally, the interest coverage ratio could not be calculated, indicating potential weakness in financial health. It is important for Majestic Nails & Spa LLC to improve liquidity and ensure sufficient earnings to cover interest expenses for better financial stability.`
  },
  competition: {
    score: 3,
    writeUp: `Majestic Nails & Spa LLC operates in a highly competitive market with several competitors offering similar products and services. The company's moderate level of differentiation may help it stand out to some extent, but the presence of well-established franchises and online retailers poses a significant competitive risk. Small businesses in this industry must continuously innovate and differentiate themselves to maintain a competitive edge.`,
    scorecard: [
      { question: 'Product Uniqueness', response: 'Somewhat unique (moderate differentiation)', score: 3 },
      { question: 'Market Competition', response: 'Several competitors, hard to stand out', score: 0 }
    ]
  },
  customerSatisfaction: {
    score: 7,
    rating: 4.2,
    writeUp: `The average rating for Majestic Nails & Spa LLC on Google reviews is 4.2. Recent customer sentiment is generally positive, with customers praising the chic ambiance and high-quality nail services offered. However, there are a few negative reviews mentioning issues with appointment scheduling and service quality, which could pose a risk to customer satisfaction. It's important for the business to address these concerns to maintain a positive reputation and ensure customer loyalty.`
  },
  supplyChain: {
    score: 7,
    writeUp: `Majestic Nails & Spa LLC faces moderate supply chain risk due to its reliance on specialized products and equipment sourced internationally. While the company claims low dependency on a single supplier, the industry's challenges with workforce availability and inventory management could still pose risks to operations.`,
    scorecard: [
      { question: 'Supplier Dependency', response: 'Low dependency (reliable alternatives)', score: 7 }
    ]
  },
  tariff: {
    writeUp: `The recent tariffs on textiles are expected to result in a short-run price increase of 15.6% and a long-run increase of 9.7%. Majestic Nails & Spa LLC, utilizing textiles for spa robes and linens, may face higher costs for these essential items. Additionally, tariffs on leather products could lead to a short-run price hike of 33.3% and a long-run increase of 17.5%. As the business incorporates leather in spa furniture and decor, increased expenses may impact their cost structure and pricing strategy.`
  },
  esg: {
    score: 5,
    environmentalScore: 4,
    governmentScore: 1,
    writeUp: `Based on our analysis of carbon emissions data, the Personal Care Services industry demonstrates a relatively low environmental risk profile. The industry averages 0.005137195 kg GHG of CO2 emitted per dollar of GDP generated, significantly lower than the U.S. all-industry average of 0.175694084.
    
The lack of a board of directors or formal advisors at Majestic Nails & Spa LLC poses a significant risk in terms of governance and decision-making. This absence may lead to potential conflicts of interest, lack of strategic direction, and limited oversight.`
  }
};
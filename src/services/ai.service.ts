import { api } from '../lib/api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const aiService = {
  generateText: async (prompt: string, systemPrompt?: string) => {
    if (USE_MOCK) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simple mock logic based on prompt keywords
      if (prompt.toLowerCase().includes('score')) {
        return { text: "4" };
      }
      
      return { 
        text: "Based on our analysis of carbon emissions data, the Personal Care Services industry demonstrates a relatively low environmental risk profile. The industry averages 0.005137195 kg GHG of CO2 emitted per dollar of GDP generated, significantly lower than the U.S. all-industry average of 0.175694084. This indicates a more sustainable level of carbon emissions per unit of economic output. Additionally, the industry emits 2471 kg GHG in CO2 per firm, notably lower than the U.S. all-industry average of 376538 kg GHG CO2 emissions per firm. These figures suggest that the Personal Care Services industry has a lower environmental impact compared to the broader industrial landscape.\n\nHowever, it is important to note that this analysis provides only a high-level overview of environmental risk. Further in-depth analysis, in line with the SBA SOP, should be conducted, potentially including a detailed third-party environmental report, to comprehensively assess the environmental risks associated with financing the acquisition of a small business in the Personal Care Services industry."
      };
    }

    const response = await api.post('/ai/generate-text', { prompt, systemPrompt });
    return response.data;
  },
};

// !Server action to fetch stock company data
import { API_URL } from "@/lib/constants";

interface StockSearchResult {
  type: string;
  symbol: string;
  company: string;
}

export async function getStockCompanyName(
  symbol: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_URL}/search?keyword=${symbol}&length=1`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StockSearchResult[] = await response.json();

    if (data && data.length > 0) {
      return data[0].company;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching company name for ${symbol}:`, error);
    return null;
  }
}

export async function getStockPricesServer(
  symbol: string,
  days = 7,
  limit = 50
) {
  try {
    const response = await fetch(
      `${API_URL}/stock/${symbol}/prices?days=${days}&type=INTRADAY&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching stock prices for ${symbol}:`, error);
    return null;
  }
}

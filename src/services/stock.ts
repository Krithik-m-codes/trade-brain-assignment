// ! Services file to fetch data from the API specific to stock operations
import api from "@/server/api";

// fetch stock data by search keyword and length
export const fetchStockData = async ({
  keyword,
  length,
}: {
  keyword: string;
  length: number;
}) => {
  try {
    const response = await api.get(`/search`, {
      params: { keyword, length: length || 10 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

// stock ticker api service
export const fetchStockTicker = async () => {
  try {
    const response = await api.get(`/index/NIFTY/movers/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock ticker:", error);
    throw error;
  }
};

// stock prices api service
export const fetchStockPrices = async ({
  stock,
  days,
  type,
  limit,
}: {
  stock: string;
  days?: number;
  type?: string;
  limit?: number;
}) => {
  try {
    const response = await api.get(`/stock/${stock}/prices`, {
      params: {
        days: days || 7,
        type: type || "INTRADAY",
        limit: limit || 10,
      },
    });
    console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching stock prices:", error);
    throw error;
  }
};

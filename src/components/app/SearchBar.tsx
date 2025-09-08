// !SearchBar component that fetches stock suggestions based on user input
import React, { useState, useEffect } from "react";
import { fetchStockData } from "@/services/stock";
import { StockSearch } from "@/types/stock";

interface SearchBarProps {
    onSelectStock: (stock: StockSearch) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelectStock }) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<StockSearch[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setShowSuggestions(!!value);
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        setLoading(true);
        setDebounceTimeout(setTimeout(async () => {
            try {
                const data = await fetchStockData(
                    {
                        keyword: value,
                        length: 5,
                    }
                );
                setSuggestions(data);
            } catch (error) {
                setError("Failed to fetch stock data");
            } finally {
                setLoading(false);
            }
        }, 300));
    };
    const handleSelectSuggestion = (stock: StockSearch) => {
        setQuery(stock.symbol);
        setShowSuggestions(false);
        onSelectStock(stock);

        // clear after selection
        setSuggestions([]);
    }

    return (
        <div className="relative w-full max-w-md mx-auto    ">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full text-black"
                placeholder="Search for a stock..."
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 text-black rounded-md mt-1 w-full z-50 max-h-60 overflow-y-auto">
                    {suggestions.map((stock) => (
                        <li
                            key={stock.symbol}
                            onClick={() => handleSelectSuggestion(stock)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {stock.symbol} - {stock.company}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
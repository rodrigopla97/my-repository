import { usePortfolio } from "../containers/states/portfolioProvider";

export default function MongodbIcon() {

    const { getPortfolioState } = usePortfolio();
    const { isDarkMode } = getPortfolioState;
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                <path fill="#4caf50" d="M24 4C24 4 13 16.5 13 27c0 6.075 4.925 11 11 11s11-4.925 11-11C35 16.5 24 4 24 4z" />
                <path fill="#2e7d32" d="M24 4c0 0 11 12.5 11 23 0 6.075-4.925 11-11 11V4z" />
                <rect x="22.5" y="35" width="3" height="9" fill="#4caf50" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 8" width="48px" height="8px">
                <ellipse cx="32" cy="4" rx="25" ry="4" fill={isDarkMode ? "#fff" : "#111"} opacity=".3" />
            </svg>
        </div>
    );
}

import { useTheme } from "../context/themeContext";

export default function CssIcon() {

    const { isDarkMode } = useTheme();
    return (
        <div >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                <path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z" />
                <polygon fill="#039BE5" points="24,8 24,39.9 35.2,36.7 37.7,8 " />
                <polygon fill="#FFFFFF" points="33.1,13 24,13 24,17 28.9,17 28.6,21 24,21 24,25 28.4,25 28.1,29.5 24,30.9 24,35.1 31.9,32.5 32.6,21 32.6,21 " />
                <path fill="#EEEEEE" d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 8" width="48px" height="8px">
                <ellipse cx="32" cy="4" rx="25" ry="4" fill={isDarkMode ? "#fff" : "#111"} opacity=".3" />
            </svg>
        </div>
    );
};


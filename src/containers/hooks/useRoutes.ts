import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function useRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    function openExternal(url: string) {
        window.open(url, "_blank", "noopener,noreferrer");
    }

    return {
        origin: window.location.origin,
        href: window.location.href,
        pathname: location.pathname,
        params,
        search: location.search.replace("?", ""),
        navigate,
        openExternal,
    };
}

export const StatisticsCustomSvgIcon = ({ className = "" }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-muted-foreground transition-all duration-300 ${className}`}
        >
            <line
                x1="18"
                y1="20"
                x2="18"
                y2="10"
                className="group-hover:stroke-pink-500 transition-colors duration-300"
            />
            <line
                x1="12"
                y1="20"
                x2="12"
                y2="4"
                className="group-hover:stroke-cyan-500 transition-colors duration-300"
            />
            <line
                x1="6"
                y1="20"
                x2="6"
                y2="14"
                className="group-hover:stroke-purple-500 transition-colors duration-300"
            />
        </svg>
    );
}

export default StatisticsCustomSvgIcon;
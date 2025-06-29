// components/StatsCard.jsx
import { Icon } from '@/utils/icon';

type StatCardProps = {
    title: string;
    value: string | number;
    percentage?: string | undefined;
    iconPath: string;
    iconBgColor?: string;
    trend?: 'up' | 'down';
    label?: string;
};

const StatsCard = ({ title, value, percentage, iconPath, iconBgColor, trend = 'up', label }: StatCardProps) => {
    const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500'; // Contoh sederhana
    const arrowIcon = trend === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'; // Contoh SVG path
    const iconBgClass = iconBgColor || 'bg-blue-100'; // Default
    const iconColorClass = iconBgColor ? `text-${iconBgColor.split('-')[1]}-600` : 'text-blue-600';

    return (
        <div className="bg-white rounded-lg p-4 shadow-custom flex flex-col justify-between h-32">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <div className={`${iconBgClass} p-2 rounded-md ${iconColorClass}`}>
                    <Icon path={iconPath} className="w-4 h-4" />
                </div>
            </div>
            <p className="text-xl font-bold text-gray-800 mb-2">{value} {label !== '' ? (<span className='text-gray-400 text-lg font-normal'>{label}</span>) : ''}</p>
            <div className="flex items-center text-xs">
                {percentage && (
                    <>
                        <span className={`${trendColor} font-semibold mr-1`}>{percentage}</span>
                        <Icon path={arrowIcon} className={`w-3 h-3 ${trendColor}`} /> {/* Ikon panah */}
                    </>
                )}
                {/* Tambahkan progress bar di sini jika diperlukan, contoh: */}
                <div className="w-full bg-gray-200 rounded-full h-1 ml-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${parseFloat(percentage as string) || 0}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
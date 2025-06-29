
import { getJobs } from '@/app/actions/JobAction';
import { formatCurrency } from '@/utils/constant';
import { Icon } from '@/utils/icon';
import { useEffect, useState } from 'react';


type PostItemProps = {
    title: string;
    hourly_rate: string;
    status: string;
    iconPath: string;
    iconBgColor: string;
}
const PostItem = ({ title, hourly_rate, status, iconPath, iconBgColor }: PostItemProps) => {
    const iconBgClass = iconBgColor || 'bg-indigo-100';
    const iconColorClass = iconBgColor ? `text-${iconBgColor.split('-')[1]}-600` : 'text-indigo-600';

    return (
        <div className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className={`${iconBgClass} p-2 rounded-lg flex-shrink-0`}>
                <Icon path={iconPath} className="w-5 h-5" />
            </div>
            <div className="ml-3 flex-grow">
                <h4 className="text-gray-800 font-medium text-sm" dangerouslySetInnerHTML={{ __html: title }}></h4>

            </div>
            <div className="text-right ml-4 flex-shrink-0">
                <p className="text-gray-600 text-xs uppercase mb-1">Biaya per jam</p>
                <p className="font-semibold text-gray-800 text-sm">{hourly_rate}</p>
            </div>
            <div className="ml-4 w-20 flex-shrink-0">
                <p className="text-gray-600 text-xs uppercase mb-1 text-right">Status</p>

                <p className="text-gray-500 text-xs text-right mt-1 capitalize">{status}</p>
            </div>
        </div>
    );
};


const PostPerformanceCard = () => {
    const [job, setJob] = useState<any[]>([]);
    useEffect(() => {
        async function getTopFiveNewJobs() {
            const response = await getJobs();
            setJob(response.data);
        }

        getTopFiveNewJobs();
    }, [])
    return (
        <div className="bg-white rounded-lg p-6 shadow-custom h-full">
            <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Top 5 Pekerjaan Terbaru</h3>
            <p className="text-gray-600 text-xs mb-6">Top 5 pekerjaan terbaru yang dibuat pada bulan ini</p>

            <div>
                {job.map((job, index) => (
                    <PostItem
                        key={index}
                        title={job.description}
                        hourly_rate={formatCurrency(job.hourly_rate)}
                        status={job.status}
                        iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" // Contoh dokumen
                        iconBgColor="bg-indigo-100"
                    />
                ))}


            </div>
        </div>
    );
};

export default PostPerformanceCard;
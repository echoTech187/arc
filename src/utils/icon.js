export const UserIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
        />
    </svg>
);

export const EditIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500 hover:text-indigo-600 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
    </svg>
);

export const DeleteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500 hover:text-red-600 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
            clipRule="evenodd"
        />
    </svg>
);
export const DetailIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500 hover:text-indigo-600 cursor-pointer"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
        />
    </svg>
);
export const Icon = ({ path, className = "w-5 h-5", fill = "currentColor" }) => (
    <svg className={className} fill={fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d={path} />
    </svg>
);
export default { UserIcon, EditIcon, DeleteIcon, DetailIcon, Icon };
export const limitLengthString = (name: string) => {
    if (name.length > 40) {
        return name.slice(0, 40) + '...';
    }
    return name;
};

export const getStatusColor = (status:string) => {
    switch (status) {
        case 'positive feedback':
            return 'bg-green-100';
        case 'no answer':
            return 'bg-yellow-100';
        case 'rejected':
            return 'bg-red-300';
        case 'interview':
            return 'bg-fuchsia-200';
        default:
            return 'bg-indigo-100';
    }
};
export const getStatusType = (status:string) => {
    switch (status) {
        case 'positive feedback':
            return 'Positive Feedback';
        case 'no answer':
            return 'No Answer';
        case 'rejected':
            return 'Rejected';
        case 'interview':
            return 'Interview';
        default:
            return 'Select Status';
    }
};
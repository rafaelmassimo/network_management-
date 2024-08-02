export const limitLengthString = (name: string) => {
    if (name.length > 15) {
        return name.slice(0, 15) + '...';
    }
    return name;
};

export const getCurrentTime = (timestamp) => {
    if (timestamp) {
        return timestamp;
    }

    return new Date().getTime();
};

const uid = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export { uid };

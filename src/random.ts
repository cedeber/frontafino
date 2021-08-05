const randomInt = (min = 0, max = 9): number => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { randomInt };

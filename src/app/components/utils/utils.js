const declOfNum = (n, textFormat) => {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
        return textFormat[2];
    }
    if (n1 > 1 && n1 < 5) {
        return textFormat[1];
    }
    if (n1 === 1) {
        return textFormat[0];
    }
    return textFormat[2];
};

export default declOfNum;

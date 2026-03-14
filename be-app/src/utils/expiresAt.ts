export const generateExpirationDate = (time: number) => {
    return new Date(Date.now() + time);
}
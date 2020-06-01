export const calculateTimesinceDate = (dateStartString: string): number => {
    const date = Date.parse(dateStartString);
    var diff = (date - new Date().getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
};
export const dateFormatter = (date: string, dateType: string = "short"): string => {
    const d = new Date(date);
    let r = "";
    const day = ("0" + d.getDate()).slice(-2);

    if (dateType === 'short') {
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const year = d.getFullYear().toString().slice(-2);
        r = `${month}/${day}/${year}`;
    } else {
        const month = d.toLocaleDateString('en-US', { month: 'short' });
        const year = d.getFullYear();
        r = `${day} ${month} ${year}`;
    }

    return r
};

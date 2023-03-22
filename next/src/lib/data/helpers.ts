


export function teamDistributionFromOrdinals(teamOrdinals: number[]): { x: number; y: number }[] {
    const min = Math.floor(Math.min(...teamOrdinals));
    const max = Math.ceil(Math.max(...teamOrdinals));
    let points = []
    for (let i = min; i <= max; i++) {
        points.push({
            x: i,
            y: teamOrdinals.filter((ordinal) => ordinal >= i && ordinal < i + 1).length
        });
    }
    return points
}
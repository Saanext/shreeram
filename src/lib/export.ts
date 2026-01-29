
'use client';

export function exportToCsv(filename: string, data: any[]) {
    if (data.length === 0) {
        console.warn("No data to export.");
        return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(','), // header row
        ...data.map(row => {
            return headers.map(header => {
                const value = row[header] === null || row[header] === undefined ? '' : row[header];
                
                let stringValue = String(value);
                
                // If the value contains a comma, a double quote, or a newline, wrap it in double quotes.
                if (stringValue.search(/("|,|\n)/g) >= 0) {
                    // Escape any existing double quotes by doubling them up.
                    stringValue = `"${stringValue.replace(/"/g, '""')}"`;
                }

                return stringValue;
            }).join(',');
        })
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

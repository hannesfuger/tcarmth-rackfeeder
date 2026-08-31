var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaCarrierDrawGrouped(container, data) {
                // Statusfarben (Beispiel: unbearbeitet, gelasert, haftvermittler, gegossen, fertig, fehlerhaft)
                const statusColors = [
                    '#B0B0B0', // unbearbeitet
                    '#2196F3', // gelasert
                    '#FF9800', // haftvermittler
                    '#9C27B0', // gegossen
                    '#4CAF50', // fertig
                    '#F44336' // fehlerhaft
                ];
                const statusNames = [
                    'unbearbeitet',
                    'gelasert',
                    'haftvermittler',
                    'gegossen',
                    'fertig',
                    'fehlerhaft'
                ];
                // Zähle die Anzahl pro Status
                const statusCounts = [];
                for (let i = 0; i < statusColors.length; i++) {
                    statusCounts.push({ status: i, count: 0 });
                }
                for (let i = 0; i < 127; i++) {
                    const status = data.WorkpiecesData[i]?.CurrentStatus ?? 0;
                    if (status >= 0 && status < statusCounts.length) {
                        statusCounts[status].count++;
                    }
                }
                // Sortiere absteigend nach Anzahl und nimm die Top 3
                const topStatus = statusCounts
                    .filter(s => s.count > 0)
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3);
                // SVG-Layout
                const targetWidth = 400;
                const targetHeight = 120;
                const circleRadius = 24;
                const circleStroke = 4;
                const padding = 20;
                const symbolSpacing = 60;
                const startX = padding;
                const centerY = targetHeight / 2;
                let svg = `<svg width="100%" height="100%" viewBox="0 0 ${targetWidth} ${targetHeight}" xmlns="http://www.w3.org/2000/svg">\n`;
                svg += `<style>
                    .circle-hover {
                        transition: stroke-width 0.2s, stroke 0.2s;
                    }
                    .circle-glow {
                        stroke: white;
                        stroke-width: 2;
                        filter: drop-shadow(0 0 6px white);
                    }
                </style>\n`;
                let x = startX;
                for (const s of topStatus) {
                    // Kreis für Status
                    svg += `<circle cx="${x}" cy="${centerY}" r="${circleRadius}" fill="${statusColors[s.status]}" stroke="#ECECEC" stroke-width="${circleStroke}"/>\n`;
                    svg += `<circle cx="${x}" cy="${centerY}" r="${circleRadius * 0.8}" fill="none" stroke="white" stroke-width="2"/>\n`;
                    // Anzahl als Text
                    svg += `<text x="${x + circleRadius + 10}" y="${centerY + 10}" font-size="28" fill="#222" font-family="Arial" text-anchor="start">${s.count}</text>\n`;
                    // Optional: Statusname darunter
                    // svg += `<text x="${x}" y="${centerY + circleRadius + 20}" font-size="14" fill="#444" font-family="Arial" text-anchor="middle">${statusNames[s.status]}</text>\n`;
                    x += circleRadius * 2 + symbolSpacing;
                }
                svg += `</svg>`;
                container.setContent(svg);
            }
            TcHmiProject2.TcaCarrierDrawGrouped = TcaCarrierDrawGrouped;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaCarrierDrawGrouped', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaCarrierDrawGrouped);
//# sourceMappingURL=TcaCarrierDrawGrouped.js.map

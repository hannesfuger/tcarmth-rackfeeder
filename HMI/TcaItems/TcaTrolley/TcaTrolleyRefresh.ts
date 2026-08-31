namespace TcHmi {
	export namespace Functions {
		export namespace TcHmiProject2 {
			export function TcaTrolleyRefresh(container: any, statusColors: any) {

                const parent = container.getParent()?.getParent();
                const parentId = parent?.getId();
                const content = container?.getElement()?.[0]?.querySelector('svg');
                //console.log('TcaTrolleyRefresh', parentId, content);

                for (let i = 0; i < 127; i++) {

                    const carrier = content?.getElementById(`carrier${i}`);
                    const group = content?.getElementById(`carrierState${i}`);


                    if (carrier && group) {
                    //console.log(`carrier${i}`, carrier, group);

                        TcHmi.Symbol.readEx2(`%pp%${parentId}::data::CarriersData[${i}]%/pp%`, function (data) {
                            if (data.error === TcHmi.Errors.NONE) {
                                const path = carrier.querySelector('path');

                                group.innerHTML = '';
                                if (data.value?.Enabled) {
                                    path?.setAttribute('visibility', 'visible');
                                    group.innerHTML += TcaCarrierDrawGrouped(data.value, 400, statusColors);
                                } else {
                                    path?.setAttribute('visibility', 'hidden');
                                }
                            }
                        });
                    }
                } 

                function TcaCarrierDrawGrouped(data: any, width: number, colors: any): string {

                    // Zähle die Anzahl pro Status
                    let statusCounts: { status: number, count: number }[] = [];
                    for (let i = 0; i < colors.length; i++) {
                        statusCounts.push({ status: i, count: 0 });
                    }

                    //console.log(statusCounts);
                    for (let i = 0; i < 127; i++) {
                        const Enabled = data.WorkpiecesEnabled?.[i];
                        const status = data.WorkpiecesData[i]?.CurrentStatus ?? 0;
                        if (Enabled && status >= 0 && status < statusCounts.length) {
                            if (data.WorkpiecesData[i]?.Error > 0) {
                                statusCounts[statusCounts.length - 1].count++;
                            } // Fehlerstatus
                            else {
                                statusCounts[status].count++;
                            }
                        }
                    }

                    // Sortiere absteigend nach Anzahl und nimm die Top 3
                    const topStatus = statusCounts
                        .filter(s => s.count > 0)
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 3);

                    // SVG-Layout
                    const circleRadius = 24;
                    const fontsize = 28; //targetHeight / 2;
                    const startX = circleRadius; //padding;
                    const centerY = -circleRadius; //targetHeight / 2;
                    let x = startX + 26;
                    let svg = ``;
                    for (const s of topStatus) {
                        // Kreis für Status
                        svg += `<circle cx="${x - width / 2}" cy="${centerY}" r="${circleRadius}" fill="${colors[s.status].color}" stroke="#ECECEC" stroke-width="2"/>\n`;
                        svg += `<circle cx="${x - width / 2}" cy="${centerY}" r="${circleRadius * 0.8}" fill="none" stroke="white" stroke-width="2"/>\n`;
                        // Anzahl als Text
                        svg += `<text x="${x - width / 2 + circleRadius + 5}" y="${+centerY + fontsize / 2 - 5}" font-size="${fontsize}" fill="grey" font-family="Arial" text-anchor="start">${s.count}</text>\n`;
                        x += circleRadius * 2 + 48;
                    }
                    return svg;
                }

            }
		}
	}
}
TcHmi.Functions.registerFunctionEx('TcaTrolleyRefresh', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaTrolleyRefresh);

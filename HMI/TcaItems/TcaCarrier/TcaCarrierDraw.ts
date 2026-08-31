enum Layout {
    undefined,
    Layout1,
    Layout2,
    Layout3,
    Layout4,
    Layout5
}

interface Coordinate {
    fX: number;
    fY: number;
    // nOriginId?: number; // Optional, falls benötigt
}

interface CarrierConfig {
    Layout: Layout;
    PositionsInRow: number;
    PositionsInColumn: number;
    ColumnDistance: number;
    RowDistance: number;
    CoordinateFirstWorkpiece: Coordinate;
}

interface CarrierData {
    WorkpiecesCoordinate: Coordinate[];
    WorkpiecesEnabled: boolean[];
    Error: boolean;
}


namespace TcHmi {
	export namespace Functions {
		export namespace TcHmiProject2 {
			export function TcaCarrierDraw(container: any, config: any, color: any) {
                //console.log(config);

                let data = CarrierConfigToData(config);
                //console.log(data);

                let svgString = CarrierDataToSVG(data);


                container.setContent(svgString);

                setTimeout(() => {
                    const content = container?.getElement()?.[0]?.querySelector('svg');
                    if (!content)
                        return;
                    for (let i = 0; i < data.WorkpiecesEnabled.length; i++) {
                        const group = content?.getElementById(`${i}`);
                        if (group) {
                            group.addEventListener('mouseenter', () => {
                                const circle = group.querySelector('circle');
                                circle?.classList.add('circle-glow');
                            });
                            group.addEventListener('mouseleave', () => {
                                const circle = group.querySelector('circle');
                                circle?.classList.remove('circle-glow');
                            });
                        }
                    }
                }, 0);

                function CarrierDataToSVG(data: CarrierData): string {

                    // Ziel-Seitenverhältnis
                    const targetWidth = 400;
                    const targetHeight = 600
                    const strokeWidth = 3;

                    let svg = `<svg width="100%" height="100%" viewBox="0 0 ${targetWidth} ${targetHeight}" xmlns="http://www.w3.org/2000/svg">\n`;
                    svg += `<style>
                            .circle-hover {
                                transition: stroke-width 0.2s, stroke 0.2s;
                            }
                            .circle-glow {
                                stroke: white;
                                stroke-width: 2;
                                filter: drop-shadow(0 0 12px white);
                            }
                            </style>\n`;
                    svg += `<rect x="${strokeWidth / 2}" y = "${strokeWidth / 2}" width = ${targetWidth - strokeWidth} height = "${targetHeight - strokeWidth}" fill = "#e3e3e3" stroke = "#111" stroke-width=${strokeWidth} />\n
                           <rect x="${strokeWidth}" y = "${strokeWidth}" width = ${targetWidth - strokeWidth * 2} height = "25" fill = "#d3d3d3" stroke = "none" />\n
                           <rect x="${strokeWidth}" y = "${targetHeight - strokeWidth - 25} " width = ${targetWidth - strokeWidth * 2} height = "25" fill = "#d3d3d3" stroke = "none" />\n`

                    for (let i = 0; i < data.WorkpiecesEnabled.length; i++) {

                        if (data?.WorkpiecesEnabled[i] === false) {
                            break;
                        }

                        const cx = data.WorkpiecesCoordinate[i].fX;
                        const cy = data.WorkpiecesCoordinate[i].fY;
                        const radius = 20;
                        const id = i;

                        svg += `<g id="${id}" style="cursor:pointer;">`;
                        // Äußerer Kreis
                        svg += `<circle id="circle${id}" cx="${cx}" cy="${cy}" r="${radius}" fill="#FFECECEC" class="circle-hover" />\n`;
                        svg += `<circle id="inner${id}" cx="${cx}" cy="${cy}" r="${radius * 0.8}" fill="none" stroke="white" stroke-width="2"/>\n`;
                        svg += `<text id="text${id}" x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="12" fill="white">${id + 1}</text>\n`;
                        svg += `</g>\n`;
                        //console.log(svg);

                    }


                    svg += `</svg>`;
                    return svg;
                }

                function CarrierConfigToData(config: CarrierConfig): CarrierData {
                    const data: CarrierData = {
                        WorkpiecesCoordinate: [],
                        WorkpiecesEnabled: [],
                        Error: false
                    };
                    let tmpOffset = 0;
                    let tmpOddRow = 0;
                    let tmpEvenRow = 0;
                    let tmpWorkpieceCount = 0;
                    
                    switch (config.Layout) {
                        case Layout.Layout1:
                            tmpOffset = 0;
                            tmpOddRow = config.PositionsInRow;
                            tmpEvenRow = config.PositionsInRow;
                            tmpWorkpieceCount = config.PositionsInRow * config.PositionsInColumn;
                            break;
                        case Layout.Layout2:
                            tmpOffset = 0.5;
                            tmpOddRow = config.PositionsInRow;
                            tmpEvenRow = config.PositionsInRow;
                            tmpWorkpieceCount = config.PositionsInRow * config.PositionsInColumn;
                            break;
                        case Layout.Layout3:
                            tmpOffset = -0.5;
                            tmpOddRow = config.PositionsInRow;
                            tmpEvenRow = config.PositionsInRow;
                            tmpWorkpieceCount = config.PositionsInRow * config.PositionsInColumn;
                            break;
                        case Layout.Layout4:
                            tmpOffset = -0.5;
                            tmpOddRow = config.PositionsInRow;
                            tmpEvenRow = config.PositionsInRow + 1;
                            tmpWorkpieceCount = config.PositionsInRow * config.PositionsInColumn + config.PositionsInColumn / 2 -1;
                            break;
                        case Layout.Layout5:
                            tmpOffset = 0.5;
                            tmpOddRow = config.PositionsInRow;
                            tmpEvenRow = config.PositionsInRow - 1;
                            tmpWorkpieceCount = config.PositionsInRow * config.PositionsInColumn - config.PositionsInColumn / 2;
                            break;
                        default:
                            data.Error = true;
                            return data;
                    }


                    for (let ni = 0; ni < tmpWorkpieceCount; ni++) {
                        // Bestimmen des Reihen- und Spaltenindex und der x- und y-Koordinate
                        const tmpPos = ni % tmpWorkpieceCount;
                        const rowSum = tmpOddRow + tmpEvenRow;
                        const tmpRow = Math.floor(tmpPos / rowSum);
                        const tmpLoc = tmpPos % rowSum;

                        let nRowNumber: number;
                        let nLocationNumber: number;
                        let tmpCoordinate: Coordinate = { fX: 0, fY: 0 };

                        if (tmpLoc >= tmpOddRow) {
                            // gerade Reihe
                            nRowNumber = tmpRow * 2 + 1;
                            nLocationNumber = tmpLoc - tmpOddRow;
                            tmpCoordinate.fX = config.ColumnDistance * (nLocationNumber + tmpOffset) + config.CoordinateFirstWorkpiece.fX;
                            tmpCoordinate.fY = config.RowDistance * nRowNumber + config.CoordinateFirstWorkpiece.fY;
                        } else {
                            // ungerade Reihe
                            nRowNumber = tmpRow * 2;
                            nLocationNumber = tmpLoc;
                            tmpCoordinate.fX = config.ColumnDistance * nLocationNumber + config.CoordinateFirstWorkpiece.fX;
                            tmpCoordinate.fY = config.RowDistance * nRowNumber + config.CoordinateFirstWorkpiece.fY;
                        }

                        data.WorkpiecesCoordinate[ni] = tmpCoordinate;
                        data.WorkpiecesEnabled[ni] = true;
                        data.Error = false;
                    }
                    return data;
                }
			}
		}
	}
}
TcHmi.Functions.registerFunctionEx('TcaCarrierDraw', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaCarrierDraw);

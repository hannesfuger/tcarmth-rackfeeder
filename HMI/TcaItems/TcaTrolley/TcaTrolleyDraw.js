var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaTrolleyDraw(container, config, colors) {
                const targetWidth = 400;
                const targetHeight = 1720;
                const frameThickness = 36; // Variable Höhe
                const framewheels = 156; // Höhe der Rollen
                const frameWidth = targetWidth * 2 + frameThickness * 3; // Variable Breite
                const frameHeight = targetHeight + frameThickness * 2 + framewheels; // Variable Höhe
                const strokeWidth = 6; // Variable Höhe
                let data = TrolleyConfigToData(config);
                //console.log(data);
                //console.log(config);
                // 
                let svgString = `<svg width="100%" height="100%" viewBox="-${strokeWidth} -${strokeWidth} ${frameWidth + 2 * strokeWidth} ${frameHeight + 2 * strokeWidth}" xmlns="http://www.w3.org/2000/svg">\n`;
                svgString += `<style>
                              .carrier-hover {
                                  transition: stroke-width 0.2s, stroke 0.2s;
                              }
                              .carrier-glow {
                                  stroke: grey;
                                  stroke-width: 8;
                                  filter: drop-shadow(0px 0px 10px #222);
                                  font-size: 50px;
                              }
                              .carrier-glow-text {
                                  stroke: grey;
                                  font-size: 70px;
                              }
                              </style>\n`;
                svgString += `<!-- Linke Rolle -->
                              <rect x="${frameThickness * 3}" y="${frameHeight - (framewheels) - frameThickness}" width="${(frameThickness) * 2}" height="${framewheels}" rx="30" fill="#888" stroke="#222" stroke-width="${strokeWidth}"/>
                              <!-- Rechte Rolle -->
                              <rect x="${frameWidth - frameThickness * 5}" y="${frameHeight - (framewheels) - frameThickness}" width="${(frameThickness) * 2}" height="${framewheels}" rx="30" fill="#888" stroke="#222" stroke-width="${strokeWidth}"/>
                              <!-- Rahmen -->
                              <rect x="0" y="0" width="${frameWidth}" height="${frameHeight - (framewheels)}" rx="${50 + frameThickness / 2 + strokeWidth * 2}" fill="#d3d3d3" stroke="#222" stroke-width="${strokeWidth}"/>
                              <!-- Linkes Fach -->
                              <rect x="${frameThickness}" y="${frameThickness}" width="${targetWidth}" height="${targetHeight}" rx="50" fill="whitesmoke" stroke="#222" stroke-width="${strokeWidth}"/>
                              <!-- Rechtes Fach -->
                              <rect x="${targetWidth + frameThickness * 2}" y="${frameThickness}" width="${targetWidth}" height="${targetHeight}" rx="50" fill="whitesmoke" stroke="#222" stroke-width="${strokeWidth}"/>`;
                for (let i = 0; i < 127; i++) {
                    if (!data.CarriersEnabled[i]) {
                        continue; // Skip if no data for this carrier
                    }
                    let x = data.CarriersCoordinate?.[i].fX;
                    let y = data.CarriersCoordinate?.[i].fY;
                    const height = 20;
                    const radius = 10; // Radius der Rundungen
                    const shiftX = radius + strokeWidth - targetWidth / 2;
                    const yTop = height / 2 - 12 - radius;
                    const yBottom = height / 2 - 12 + radius;
                    svgString += `<g id="carrierState${i}" transform="translate(${x + frameWidth / 2},${-y + frameHeight})" style="cursor:pointer;">`;
                    svgString += `</g>\n`;
                    svgString += `<g id="carrier${i}" transform="translate(${x + frameWidth / 2},${-y + frameHeight})" style="cursor:pointer;">`;
                    svgString += `<text x="${targetWidth / 2 - 30}" y="-15" font-size="40" fill="grey" font-family="Arial" text-anchor="end" alignment-baseline="middle">${i + 1}</text>\n`;
                    svgString += `<rect x="${-targetWidth / 2}" y="-50" width="${targetWidth - 40}" height="60" fill="transparent" pointer-events="all"/>`;
                    svgString += `<line x1="${-targetWidth / 2}" y1 = "10" x2 = "${targetWidth / 2}" y2 = "10" style = "stroke:grey;stroke-width:2" />\n`;
                    svgString += `<path d="M${shiftX},${yTop}Q${shiftX},${yBottom} ${shiftX + radius},${yBottom}H${-shiftX - radius}Q${-shiftX},${yBottom} ${-shiftX},${yTop}" fill="none" stroke="#888" stroke-width="${strokeWidth}" />`;
                    svgString += `</g>\n`;
                }
                svgString += `</svg>`;
                container.setContent(svgString);
                setTimeout(() => {
                    const content = container?.getElement()?.[0]?.querySelector('svg');
                    if (!content)
                        return;
                    for (let i = 0; i < 127; i++) {
                        const group = content?.getElementById(`carrier${i}`);
                        //console.log(group);
                        if (group) {
                            group.addEventListener('mouseenter', () => {
                                const path = group.querySelector('path');
                                path?.classList.add('carrier-glow');
                                const text = group.querySelector('text');
                                text?.classList.add('carrier-glow-text');
                            });
                            group.addEventListener('mouseleave', () => {
                                const path = group.querySelector('path');
                                path?.classList.remove('carrier-glow');
                                const text = group.querySelector('text');
                                text?.classList.remove('carrier-glow-text');
                            });
                        }
                    }
                }, 0);
                function TrolleyConfigToData(config) {
                    const data = {
                        CarriersCoordinate: [],
                        CarriersEnabled: [],
                        CarriersData: [],
                        CarrierConfig: {
                            Layout: 0,
                            PositionsInRow: 0,
                            PositionsInColumn: 0,
                            ColumnDistance: 0,
                            RowDistance: 0,
                            CoordinateFirstWorkpiece: { fX: 0, fY: 0 } // Standardwerte, anpassen falls benötigt
                        }
                    };
                    const CarrierPerSide = config.NumberOfCarriers / 2;
                    for (let i = 0; i < config.NumberOfCarriers; i++) {
                        let coordinate = {
                            fY: config.RackOrigin.fY + config.CarrierDistance * (i % CarrierPerSide),
                            fX: config.RackOrigin.fX + config.RackDivision / 2 * (i < CarrierPerSide ? 1 : -1)
                        };
                        data.CarriersCoordinate[i] = coordinate;
                        data.CarriersEnabled[i] = true;
                    }
                    return data;
                }
            }
            TcHmiProject2.TcaTrolleyDraw = TcaTrolleyDraw;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaTrolleyDraw', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaTrolleyDraw);
//# sourceMappingURL=TcaTrolleyDraw.js.map
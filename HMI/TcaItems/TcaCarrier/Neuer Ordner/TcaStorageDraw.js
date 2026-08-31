var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaStorageDraw(container, data) {
                const svgString = createCarrierSVG(data);
                container.setContent(svgString);
                function createCarrierSVG(data) {
                    // Ziel-Seitenverhältnis
                    const targetWidth = 400;
                    const targetHeight = 600;
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
                    for (let i = 0; i < 127; i++) {
                        if (data?.WorkpiecesEnabled[i] === false) {
                            break;
                        }
                        const cx = data.WorkpiecesCoordinate[i].fX;
                        const cy = data.WorkpiecesCoordinate[i].fY;
                        const radius = Math.max(data.WorkpiecesData[i].Volume.fX, 20);
                        const id = i;
                        svg += `<g id="${id}" style="cursor:pointer;">`;
                        // Äußerer Kreis
                        svg += `  <circle id="circle${id}" cx="${cx}" cy="${cy}" r="${radius}" fill="red" class="circle-hover" />\n`;
                        svg += `  <circle id="inner${id}" cx="${cx}" cy="${cy}" r="${radius * 0.8}" fill="none" stroke="white" stroke-width="2"/>\n`;
                        //svg += `  <circle id="circle${id}" cx="${cx}" cy="${cy}" r="${radius}" fill="red" class="circle-hover" />\n`;
                        svg += `  <text id="text${id}" x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="12" fill="white">${id + 1}</text>\n`;
                        svg += `</g>\n`;
                    }
                    svg += `</svg>`;
                    return svg;
                }
                setTimeout(() => {
                    const content = container?.getElement()?.[0]?.querySelector('svg');
                    if (!content)
                        return;
                    for (let i = 0; i < 127; i++) {
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
            }
            TcHmiProject2.TcaStorageDraw = TcaStorageDraw;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaStorageDraw', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaStorageDraw);
//# sourceMappingURL=TcaStorageDraw.js.map

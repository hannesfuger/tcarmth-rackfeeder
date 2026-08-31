var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaTrolleyPopup(popup, data, popupdata, command) {
                const parent = popup.getParent()?.getParent();
                const parentId = parent?.getId();
                //console.log(popup);
                function svgClicked(event) {
                    const target = event.target;
                    // Die Gruppe (<g>) finden
                    let group = null;
                    if (target.tagName.toLowerCase() === 'g') {
                        group = target;
                    }
                    else {
                        // Zum Eltern-Element <g> navigieren
                        group = target.closest('g');
                    }
                    if (group) {
                        const groupId = group?.id;
                        const match = groupId?.match(/^carrier(\d+)$/);
                        const carrierIndex = match ? parseInt(match[1], 10) : 0;
                        TcHmi.Symbol.writeEx(`%pp%${parentId}::_carrierId%/pp%`, carrierIndex, function (datawrite) {
                            if (datawrite.error === TcHmi.Errors.NONE) {
                                var dataOfId = new TcHmi.Symbol(`%pp%` + data.getExpression().getContent() + `::CarriersData[${carrierIndex}]%pp/%`);
                                dataOfId.readEx(function (readdata) {
                                    if (readdata.error === TcHmi.Errors.NONE) {
                                        popupdata.write(readdata.value, function (writedata) {
                                            if (writedata.error === TcHmi.Errors.NONE) {
                                                //console.log(writedata.value);
                                                // Setup userControl
                                                popup.setMinHeight(500);
                                                popup.setMinWidth(500);
                                                popup.setMinHeightUnit('px');
                                                popup.setMinWidthUnit('px');
                                                popup.open();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
                if (command == "open") {
                    svgClicked(event);
                }
                if (command == "write") {
                    TcHmi.Symbol.readEx2(`%pp%${parentId}::_carrierData%/pp%`, function (data) {
                        if (data.error === TcHmi.Errors.NONE) {
                            TcHmi.Symbol.readEx2(`%pp%${parentId}::_carrierId%/pp%`, function (dataId) {
                                if (dataId.error === TcHmi.Errors.NONE) {
                                    TcHmi.Symbol.writeEx(`%pp%${parentId}::data::CarriersData[${dataId.value}]%/pp%`, data.value, function (dataWrite) {
                                    });
                                }
                            });
                        }
                    });
                }
            }
            TcHmiProject2.TcaTrolleyPopup = TcaTrolleyPopup;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaTrolleyPopup', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaTrolleyPopup);
//# sourceMappingURL=TcaTrolleyPopup.js.map
var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaCarrierPopup(popup, command) {
                const parent = popup.getParent()?.getParent();
                const parentId = parent?.getId();
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
                        let groupId = +group?.id;
                        //console.log(`Group ID: ${groupId}`);
                        TcHmi.Symbol.writeEx(`%pp%${parentId}::_workpieceId%/pp%`, group?.id, function (writedata) {
                            if (writedata.error === TcHmi.Errors.NONE) {
                                popup.open();
                                const userControlHost = popup.getChildren()?.[0];
                                const userControl = userControlHost.getChildren()?.[0];
                                //console.log(`Group ID:`, groupId);
                                TcHmi.Symbol.readEx2(`%pp%${parentId}::data::WorkpiecesData[${groupId}]%/pp%`, function (readdata) {
                                    if (readdata.error === TcHmi.Errors.NONE) {
                                        TcHmi.Symbol.writeEx(`%pp%${parentId}::_workpieceData%/pp%`, readdata.value, function (writedata2) {
                                            if (writedata2.error === TcHmi.Errors.NONE) {
                                                // Setup userControl
                                                //console.log(userControl);
                                                popup.setWidth(userControl?.getWidth() + 20);
                                                popup.setHeight(userControl?.getHeight() + 96);
                                                popup.setWidthUnit(userControl.getWidthUnit() ?? 'px');
                                                popup.setHeightUnit(userControl.getHeightUnit() ?? 'px');
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
                    const userControlHost = popup.getChildren()?.[0];
                    const userControl = userControlHost.getChildren()?.[0];
                    TcHmi.Symbol.readEx2(`%pp%${parentId}::_workpieceId%/pp%`, function (dataId) {
                        if (dataId.error === TcHmi.Errors.NONE) {
                            TcHmi.Symbol.readEx2(`%pp%${parentId}::_workpieceData%/pp%`, function (data) {
                                if (data.error === TcHmi.Errors.NONE) {
                                    TcHmi.Symbol.writeEx(`%pp%${parentId}::data::WorkpiecesData[${dataId.value}]%/pp%`, data.value, function (dataWrite) {
                                    });
                                }
                            });
                        }
                    });
                }
            }
            TcHmiProject2.TcaCarrierPopup = TcaCarrierPopup;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaCarrierPopup', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaCarrierPopup);
//# sourceMappingURL=TcaCarrierPopup.js.map
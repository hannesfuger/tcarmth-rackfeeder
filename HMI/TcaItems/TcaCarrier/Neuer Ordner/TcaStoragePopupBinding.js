var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaStoragePopupBinding(popup, command) {
                const parent = popup.getParent()?.getParent();
                const parentId = parent?.getId();
                function svgClicked(event) {
                    const target = event.target;
                    if (target && target.tagName.toLowerCase() === 'circle') {
                        TcHmi.Symbol.writeEx(`%pp%${parentId}::_workpiecePlaceId%/pp%`, target.id, function (data) {
                            if (data.error === TcHmi.Errors.NONE) {
                                popup.open();
                                const userControlHost = popup.getChildren()?.[0];
                                const userControl = userControlHost.getChildren()?.[0];
                                TcHmi.Symbol.readEx2(`%pp%${parentId}::data::WorkpiecesData[${target.id}]%/pp%`, function (data) {
                                    if (data.error === TcHmi.Errors.NONE) {
                                        var value = data.value; // TS does not know the variable type
                                        TcHmi.Symbol.writeEx(`%pp%${parentId}::_wpcdata%/pp%`, value, function (data) {
                                            if (data.error === TcHmi.Errors.NONE) {
                                                console.log('Schreiben erfolgreich');
                                                // Setup userControl
                                                popup.setWidth(userControl?.getWidth() ?? 0 + 20);
                                                popup.setHeight(userControl?.getHeight() ?? 0 + 56);
                                                popup.setWidthUnit(userControl.getWidthUnit() ?? 'px');
                                                popup.setHeightUnit(userControl.getHeightUnit() ?? 'px');
                                            }
                                            else {
                                                console.error('Fehler beim Schreiben:', data.error);
                                            }
                                        });
                                    }
                                    else {
                                        console.error('Fehler beim Lesen:', data.error);
                                    }
                                });
                            }
                        });
                        //    // todo: get struct variable
                        //    TcHmi.Symbol.writeEx(`%pp%${parentId}::_workpiecePlaceId%/pp%`, target.id, function (data: TcHmi.Symbol.IWriteResultObject) {
                        //            if (data.error === TcHmi.Errors.NONE) {
                        //                if (userControl) {
                        //                    console.log('Schreiben erfolgreich');
                        //                    // Setup userControl
                        //                    popup.setWidth(userControl?.getWidth() ?? 0 + 20);
                        //                    popup.setHeight(userControl?.getHeight() ?? 0 + 56);
                        //                    popup.setWidthUnit(userControl.getWidthUnit() ?? 'px');
                        //                    popup.setHeightUnit(userControl.getHeightUnit() ?? 'px');
                        //                    //popup.setTargetFile({"path": "TcaWorkpiecePlaceThumb.usercontrol"}); // file are missing
                        //
                        //                    // Bindings to userControlHost
                        //                    //TcHmi.Binding.createEx2(`%pp%${parentId}::intvar%/pp%`, 'Index', userControlHost);
                        //                    ///%s%ADS.PLC.MAIN._Peripherie._Trolley._data::CarrierData[0]::WorkpiecesData[0]|BindingMode=OneWay|SubscriptionMode=Poll%/s%
                        //                    TcHmi.Binding.createEx2(`%pp%${parentId}::data::WorkpiecesData[${target.id}]|BindingMode=OneWay%/pp%`, 'data', userControlHost);
                        //                    //TcHmi.Binding.createEx2(`%pp%${parentId}::data::WorkpiecesData[${target.id}]%/pp%`, 'data', userControlHost);
                        //                    //TcHmi.Binding.createEx2(`%pp%${parentId}::_workpiecePlaceData%/pp%`, 'data', userControlHost);
                        //                }
                        //            } else {
                        //                console.error('Fehler beim Schreiben:', data.error);
                        //            }
                        //    });
                    }
                }
                if (command == "open") {
                    svgClicked(event);
                }
                if (command == "close") {
                    const parent = popup.getParent()?.getParent();
                    const parentId = parent?.getId();
                    const userControlHost = popup.getChildren()?.[0];
                    const userControl = userControlHost.getChildren()?.[0];
                    TcHmi.Symbol.readEx2(`%pp%${parentId}::_wpcdata%/pp%`, function (data) {
                        if (data.error === TcHmi.Errors.NONE) {
                            var value = data.value; // TS does not know the variable type
                            console.log(value);
                            TcHmi.Symbol.readEx2(`%pp%${parentId}::_workpiecePlaceId%/pp%`, function (data1) {
                                if (data1.error === TcHmi.Errors.NONE) {
                                    let id = data1.value; // TS does not know the variable type
                                    console.log(id);
                                    TcHmi.Symbol.writeEx(`%pp%${parentId}::data::WorkpiecesData[${id}]%/pp%`, value, function (data2) {
                                        if (data2.error === TcHmi.Errors.NONE) {
                                            console.log('Schreiben erfolgreich');
                                        }
                                        else {
                                            console.error('Fehler beim Schreiben:', data2.error);
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            console.error('Fehler beim Lesen:', data.error);
                        }
                    });
                    popup.close();
                }
            }
            TcHmiProject2.TcaStoragePopupBinding = TcaStoragePopupBinding;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaStoragePopupBinding', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaStoragePopupBinding);
//# sourceMappingURL=TcaStoragePopupBinding.js.map
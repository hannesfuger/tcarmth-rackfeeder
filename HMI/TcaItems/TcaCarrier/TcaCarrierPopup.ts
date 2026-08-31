namespace TcHmi {
    export namespace Functions {
        export namespace TcHmiProject2 {
			export function TcaCarrierPopup(popup: any, command: any) {

                const parent = popup.getParent()?.getParent();
                const parentId = parent?.getId();

                function svgClicked(event: any) {
                    const target = event.target as SVGElement;

                    // Die Gruppe (<g>) finden
                    let group: SVGGElement | null = null;
                    if (target.tagName.toLowerCase() === 'g') {
                        group = target as SVGGElement;
                    } else {
                        // Zum Eltern-Element <g> navigieren
                        group = target.closest('g');
                    }


                    if (group) {

                        let groupId = +group?.id
                        //console.log(`Group ID: ${groupId}`);
               
                       TcHmi.Symbol.writeEx(`%pp%${parentId}::_workpieceId%/pp%`, group?.id, function (writedata: TcHmi.Symbol.IWriteResultObject) {
                           if (writedata.error === TcHmi.Errors.NONE) {
                                popup.open();
                                const userControlHost = popup.getChildren()?.[0]; 
                                const userControl = userControlHost.getChildren()?.[0];
                                //console.log(`Group ID:`, groupId);

                                TcHmi.Symbol.readEx2(`%pp%${parentId}::data::WorkpiecesData[${groupId}]%/pp%`, function (readdata) {
                                    if (readdata.error === TcHmi.Errors.NONE) {

                                        TcHmi.Symbol.writeEx(`%pp%${parentId}::_workpieceData%/pp%`, readdata.value, function (writedata2: TcHmi.Symbol.IWriteResultObject) {

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

                    TcHmi.Symbol.readEx2<string>(`%pp%${parentId}::_workpieceId%/pp%`, function (dataId) {
                        if (dataId.error === TcHmi.Errors.NONE) {

                            TcHmi.Symbol.readEx2(`%pp%${parentId}::_workpieceData%/pp%`, function (data) {
                                if (data.error === TcHmi.Errors.NONE) {
                   
                                                                        
                                    TcHmi.Symbol.writeEx(`%pp%${parentId}::data::WorkpiecesData[${dataId.value}]%/pp%`, data.value, function (dataWrite: TcHmi.Symbol.IWriteResultObject) {
                                    });
                                }
                            });
                        } 
                    });

                }


            }
		}
    }
}
TcHmi.Functions.registerFunctionEx(
    'TcaCarrierPopup',
    'TcHmi.Functions.TcHmiProject2',
    TcHmi.Functions.TcHmiProject2.TcaCarrierPopup
);
namespace TcHmi {
	export namespace Functions {
		export namespace TcHmiProject2 {
			export function TcaTrolleyPopup(popup: any, data: any, popupdata: any, command: any) {

				const parent = popup.getParent()?.getParent();
                const parentId = parent?.getId();
                //console.log(popup);

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

                        const groupId = group?.id
                        const match = groupId?.match(/^carrier(\d+)$/);
                        const carrierIndex = match ? parseInt(match[1], 10) : 0;

                        TcHmi.Symbol.writeEx(`%pp%${parentId}::_carrierId%/pp%`, carrierIndex, function (datawrite: TcHmi.Symbol.IWriteResultObject) {
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

                            TcHmi.Symbol.readEx2<string>(`%pp%${parentId}::_carrierId%/pp%`, function (dataId) {
                                if (dataId.error === TcHmi.Errors.NONE) {

                                    TcHmi.Symbol.writeEx(`%pp%${parentId}::data::CarriersData[${dataId.value}]%/pp%`, data.value, function (dataWrite: TcHmi.Symbol.IWriteResultObject) {
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
TcHmi.Functions.registerFunctionEx('TcaTrolleyPopup', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaTrolleyPopup);

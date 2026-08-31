namespace TcHmi {
	export namespace Functions {
		export namespace TcHmiProject2 {
			export function TcaCarrierEditFunction(data: any, status: any) {


				var symWorkpieceData = new TcHmi.Symbol(`%pp%` + data.getExpression().getContent() + `::WorkpiecesData%pp/%`);
				var symWorkpieceEnabled = new TcHmi.Symbol(`%pp%` + data.getExpression().getContent() + `::WorkpiecesEnabled%pp/%`);
				

				symWorkpieceData.readEx(function (WorkpieceData) {
					if (WorkpieceData.error === TcHmi.Errors.NONE) {
						//console.log(WorkpieceData.value);
				
						symWorkpieceEnabled.readEx(function (WorkpieceEnabled) {
							if (WorkpieceEnabled.error === TcHmi.Errors.NONE) {
								//console.log(WorkpieceEnabled.value);
				
								for (let i = 0; i < 127; i++) {
				
									if (WorkpieceEnabled.value[i] === true) {
				
										WorkpieceData.value[i].Error = false;
										WorkpieceData.value[i].SerialNumber = '';
										WorkpieceData.value[i].CurrentStatus = status;
									} 
				
								}
				
								symWorkpieceData.write(WorkpieceData.value, function (writedata) {
									if (writedata.error === TcHmi.Errors.NONE) {
				
									}
								});
				
							}
				
						});
				
					}
				});











			}
		}
	}
}
TcHmi.Functions.registerFunctionEx('TcaCarrierEditFunction', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaCarrierEditFunction);

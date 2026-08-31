var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaCarrierEditFunction(data, status) {
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
            TcHmiProject2.TcaCarrierEditFunction = TcaCarrierEditFunction;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaCarrierEditFunction', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaCarrierEditFunction);
//# sourceMappingURL=TcaCarrierEditFunction.js.map
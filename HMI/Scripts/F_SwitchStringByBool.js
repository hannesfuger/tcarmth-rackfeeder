// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Rackfeeder_HMI;
        (function (Rackfeeder_HMI) {
            function F_SwitchStringByBool(inBool, inString0, inString1) {
                var textString;
                var outputText;

                if (inBool) {
                    textString = inString1;
                }
                else {
                    textString = inString0;
                }
                var outputText;

                var symbol = new TcHmi.Symbol('%l%' + textString + '%/l%');
                symbol.exists(function (data) {
                    if (data.result) {
                        outputText = symbol.read();
                    }
                    else {
                        outputText = textString;
                        console.log('could not found Entry in Dictionary');
                    }
                });
                return outputText;
            }
           
            Rackfeeder_HMI.F_SwitchStringByBool = F_SwitchStringByBool;
        })(Rackfeeder_HMI = Functions.Rackfeeder_HMI || (Functions.Rackfeeder_HMI = {}));
        Functions.registerFunctionEx('F_SwitchStringByBool', 'TcHmi.Functions.Rackfeeder_HMI', Rackfeeder_HMI.F_SwitchStringByBool);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);

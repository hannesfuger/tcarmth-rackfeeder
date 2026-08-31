// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_TranslateString(sText, eLanguage) {

                if (!sText) {
                    console.log('TranslateString: "InputText" undefined');
                    return;
                }

                if (!eLanguage) {
                    console.log('TranslateString: "languageNotifier" undefined');
                    return;
                }
                var outputText;
                //if ((typeof stText === 'object')) { //maybe check if ST_TranslateText            

                var symbol = new TcHmi.Symbol('%l%' + sText + '%/l%');
                symbol.exists(function (data) {
                    if (data.result) {
                        outputText = symbol.read();
                    }
                    else {
                        console.log('could not found Entry in Dictionary');
                    }
                });
                return outputText;

            }
            Pxxx_Name_HMI.F_TranslateString = F_TranslateString;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_TranslateString', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_TranslateString);

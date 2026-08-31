// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_TranslateText(stText, eLanguage) {
                if (!stText) {
                    console.log('TranslateText: "stTranslateText" undefined');
                    return;
                }
                if (!eLanguage) {
                    console.log('TranslateText: "languageNotifier" undefined');
                    return;
                }

                var symbol = new TcHmi.Symbol('%l%' + stText.wsNameId + '%/l%');
                symbol.exists(function (data) {
                    if (data.result) {
                        text = symbol.read();
                    }
                    else {
                        text = stText.wsName;
                    }
                });

                if (text == '')
                    text = stText.wsName;

                return text;
            }
            Pxxx_Name_HMI.F_TranslateText = F_TranslateText;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_TranslateText', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_TranslateText);

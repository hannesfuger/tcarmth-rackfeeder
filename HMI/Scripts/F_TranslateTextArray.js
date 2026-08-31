// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_TranslateTextArray(textListArray, showNumberOfLines, eLanguage) {

                if (!textListArray) {
                    console.log('TranslateTextArray: "textListArray" undefined');
                    return;
                }
                //if (!shownumberoflines) {
                //    console.log('translatetextarray: "shownumberoflines" undefined');
                //    return;
                //}
                if (showNumberOfLines < -1) {
                    showNumberOfLines = -1;
                }
                if (!eLanguage) {
                    console.log('TranslateTextArray: "languageNotifier" undefined');
                    return;
                }


                var outputArray = [];

                // analyse length
                var showLength;
                if (showNumberOfLines == -1)
                    showLength = textListArray.length;
                else
                    showLength = Math.min(showNumberOfLines, textListArray.length);


                // go throgh Array and Translate each cell
                for (var i = 0; i < showLength; i++) {
                    var entry = textListArray[i];
                    if ((typeof entry === 'object')) { //maybe check if ST_TranslateText
                        outputArray.push(TcHmi.Functions.Pxxx_Name_HMI.F_TranslateText(entry, eLanguage));
                    }
                    else {
                        outputArray.push(entry);
                    }
                }

                return outputArray;



            }
            Pxxx_Name_HMI.F_TranslateTextArray = F_TranslateTextArray;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_TranslateTextArray', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_TranslateTextArray);

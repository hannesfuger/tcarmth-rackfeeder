// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_TranslateTextDatagrid(textListArray, eLanguage, showNumberOfLines) {


                if (!textListArray) {
                    console.log('TranslateTextDatagrid: "textListArray" undefined');
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
                    console.log('TranslateTextDatagrid: "eLanguage" undefined');
                    return;
                }
                var outputArray = [];
                // analyse length             
                var showLength;
                if (showNumberOfLines == -1)
                    showLength = textListArray.length;
                else
                    showLength = Math.min(showNumberOfLines, textListArray.length)
                // go throgh Grid and Translate each cell
                for (var i = 0; i < showLength; i++) {
                    var datagridEntry = {};

                    var keys = Object.keys(textListArray[i]);

                    for (j = 0; j < keys.length; j++) {
                        //console.log(keys[j]);
                        var entry = textListArray[i][keys[j]];
                        if ((typeof entry === 'object')) { //maybe check if ST_Text
                            datagridEntry[keys[j]] = TcHmi.Functions.Pxxx_Name_HMI.F_TranslateText(entry, eLanguage);
                        }
                        else {
                            datagridEntry[keys[j]] = entry;
                        }
                        //console.log(entry);
                        //console.log(datagridEntry[keys[j]]);
                    }
                    outputArray.push(datagridEntry);
                }
                return outputArray;


            }
            Pxxx_Name_HMI.F_TranslateTextDatagrid = F_TranslateTextDatagrid;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_TranslateTextDatagrid', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_TranslateTextDatagrid);

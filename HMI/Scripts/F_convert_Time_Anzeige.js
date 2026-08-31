// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.748.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject1;
        (function (TcHmiProject1) {
            function F_convert_Time_Anzeige(Time) {

                var wert_int = Time;
                var ausgabe;
                ausgabe = (wert_int).replace("PT", "");
 
                  
                if ((ausgabe.search("D") > 0) || (ausgabe.search("H") > 0) || (ausgabe.search("M") > 0)) {
                    alert('falsches Zeitformat: ' + Time);
                }
                else {
                    
                    ausgabe = (ausgabe).replace("S", "");
 
                    ausgabe = ausgabe * 1000;
                    //ausgabe = ausgabe + ' ms';

                    return  (ausgabe);
                }

            }
            TcHmiProject1.F_convert_Time_Anzeige = F_convert_Time_Anzeige;
        })(TcHmiProject1 = Functions.TcHmiProject1 || (Functions.TcHmiProject1 = {}));
        Functions.registerFunctionEx('F_convert_Time_Anzeige', 'TcHmi.Functions.TcHmiProject1', TcHmiProject1.F_convert_Time_Anzeige);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);

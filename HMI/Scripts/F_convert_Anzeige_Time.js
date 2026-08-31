// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.748.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject1;
        (function (TcHmiProject1) {
            function F_convert_Anzeige_Time(Time) {

                var Time_Int = 'PT';

                Time_Int += ( Time / 1000.0 );

                Time_Int += 'S';

                //alert(Time_Int);

                return (Time_Int);
            }
            TcHmiProject1.F_convert_Anzeige_Time = F_convert_Anzeige_Time;
        })(TcHmiProject1 = Functions.TcHmiProject1 || (Functions.TcHmiProject1 = {}));
        Functions.registerFunctionEx('F_convert_Anzeige_Time', 'TcHmi.Functions.TcHmiProject1', TcHmiProject1.F_convert_Anzeige_Time);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);

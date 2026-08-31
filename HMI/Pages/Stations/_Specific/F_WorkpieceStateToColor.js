// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.14.3.133/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_WorkpieceStateToColor(workpiece) {
                if (workpiece == null || !workpiece.Exists)
                    return null; // theme

                return (workpiece.SummaryState ? '{"color":"rgba(38, 226, 12, 255)"}' : '{"color":"rgba(254, 2, 2, 255)"}'); // green : red
            }
            Pxxx_Name_HMI.F_WorkpieceStateToColor = F_WorkpieceStateToColor;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_WorkpieceStateToColor', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_WorkpieceStateToColor);

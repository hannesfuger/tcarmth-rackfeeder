// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.756.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var P249_TKB_Modulrohr_HMI;
        (function (P249_TKB_Modulrohr_HMI) {
            function F_ToggleBool(inBool) {
                var toggleBool;
                if (inBool) {
                    toggleBool = 0;
                }
                else {
                    toggleBool = 1;
                }
                return toggleBool;
            }
            P249_TKB_Modulrohr_HMI.F_ToggleBool = F_ToggleBool;
        })(P249_TKB_Modulrohr_HMI = Functions.P249_TKB_Modulrohr_HMI || (Functions.P249_TKB_Modulrohr_HMI = {}));
        Functions.registerFunctionEx('F_ToggleBool', 'TcHmi.Functions.P249_TKB_Modulrohr_HMI', P249_TKB_Modulrohr_HMI.F_ToggleBool);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);

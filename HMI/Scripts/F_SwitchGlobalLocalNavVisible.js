// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_SwitchGlobalLocalNavVisible() {
                var bNavLocal = ["conModule001_Main",
                                "conModule001_Manual",
                                "conModule001_Monitoring",
                                "conModule001_Settings",
                                "conStation010_Main",
                                "conStation010_Manual",
                                "conStation010_Monitoring",
                                "conStation010_Settings",
                                "conStation020_Main",
                                "conStation020_Manual",
                                "conStation020_Monitoring",
                                "conStation020_Settings",
                                "conStation030_Main",
                                "conStation030_Manual",
                                "conStation030_Monitoring",
                                "conStation030_Settings",
                                "conStation040_Main",
                                "conStation040_Manual",
                                "conStation040_Monitoring",
                                "conStation040_Settings",
                                "conStation050_Main",
                                "conStation050_Manual",
                                "conStation050_Monitoring",
                                "conStation050_Settings",
                                "conStation035_Main",
                                "conStation035_Manual",
                                "conStation035_Monitoring",
                                "conStation035_Settings",
                                "conStation040_Main",
                                "conStation040_Manual",
                                "conStation040_Monitoring",
                                "conStation040_Settings",
                                "conStation051_Main",
                                "conStation051_Manual",
                                "conStation051_Monitoring",
                                "conStation051_Settings",
                                "conStation052_Main",
                                "conStation052_Manual",
                                "conStation052_Monitoring",
                                "conStation052_Settings",
                                "conStation053_Main",
                                "conStation053_Manual",
                                "conStation053_Monitoring",
                                "conStation053_Settings",
                                "conStation070_Main",
                                "conStation070_Manual",
                                "conStation070_Monitoring",
                                "conStation070_Settings",
                                "conStation080_Main",
                                "conStation080_Manual",
                                "conStation080_Monitoring",
                                "conStation080_Settings"].some(function (uc) {
                                    //console.log(uc + ': ');
                                    //console.log(TcHmi.Controls.get(uc));
                                    return TcHmi.Controls.get(uc) !== undefined;
                                });
                //console.log(bNavLocal);
                if (bNavLocal) {
                    TcHmi.Symbol.writeEx('%i%sNavGlobalVisibility%/i%', 'Collapsed');
                    TcHmi.Symbol.writeEx('%i%sNavLocalVisibility%/i%', 'Visible');
                }
                else {
                    TcHmi.Symbol.writeEx('%i%sNavGlobalVisibility%/i%', 'Visible');
                    TcHmi.Symbol.writeEx('%i%sNavLocalVisibility%/i%', 'Collapsed');
                }
                //return TcHmi.Symbol.readEx('%i%sNavGlobalVisibility%/i%');
            }
            Pxxx_Name_HMI.F_SwitchGlobalLocalNavVisible = F_SwitchGlobalLocalNavVisible;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_SwitchGlobalLocalNavVisible', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_SwitchGlobalLocalNavVisible);

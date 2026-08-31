// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_ColorBinding(Color) {

                if (!Color) {
                    console.log('ColorBinding: "Color" undefined');
                    return;
                }

                var colorString = Color.color.toLowerCase();
                if (colorString == 'theme' || colorString == '') //my Keyword to get theme color
                    return null;
                else
                    return Color;

            }
            Pxxx_Name_HMI.F_ColorBinding = F_ColorBinding;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_ColorBinding', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_ColorBinding);

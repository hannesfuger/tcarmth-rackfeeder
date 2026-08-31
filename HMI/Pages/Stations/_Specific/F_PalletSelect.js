// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.14.3.133/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_PalletSelect(stTrCmd, sOwnerId, sEditorId) {
                // get editor control
                var wpControl = TcHmi.Controls.get(editorId); // 'UcTrolleyCmd_1.UcTrolleyCmd_UcPalletCmd'
                if (!wpControl) {
                    alert('Editor control does not exist!');
                    return;
                }

                // remove existing binding
                var exBnd = TcHmi.Binding.exists('stPl', wpControl);
                if (exBnd) {
                    //alert("Binding exists");
                    TcHmi.Binding.removeEx2(null, 'stPl', wpControl);
                } //else {
                //alert("Binding exists not");
                //}

                // 'UcTrolleyCmd_1.UcTrolleyCmd' --> 'UcTrolleyCmd_1'
                ownerId = ownerId.replace('.UcTrolleyCmd', '');

                // create binding to selection
                var bnd = `%pp%${ownerId}::stTr::Pallets[${stTrCmd.PlIdxX}][${stTrCmd.PlIdxY}]%/pp%`;
                //alert(`Binding to: ${bnd}`);
                TcHmi.Binding.createEx2(bnd, 'stPl', wpControl);

                // set up part index info
                wpControl.setSInfo(`Palette [x: ${stTrCmd.PlIdxX}, y: ${stTrCmd.PlIdxY}]`);
            }
            Pxxx_Name_HMI.F_PalletSelect = F_PalletSelect;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_PalletSelect', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_PalletSelect);

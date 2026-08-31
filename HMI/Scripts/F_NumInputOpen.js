// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_NumInputOpen(nMin, nMax, sSenderControl) {
                var ne = TcHmi.Symbol.readEx('%i%NumericInputEvent%/i%');

                // if sender control specified, init NumericInputEvent
                if (sSenderControl) {
                    var se = new TcHmi.SymbolExpression(sSenderControl);
                    var us = TcHmi.Controls.get(se.getName());
                    ne.nMinValue = nMin;
                    ne.nMaxValue = nMax;
                    ne.sOldValue = us.getText();
                    ne.sSenderControl = sSenderControl;
                }
                else { // reset NumericInputEvent, just open numpad
                    ne.nMinValue = 0;
                    ne.nMaxValue = 0;
                    ne.sOldValue = null;
                    ne.sSenderControl = null;
                }

                TcHmi.Symbol.writeEx('%i%NumericInputEvent%/i%', ne);

                //alert('ne.nMinValue: ' + ne.nMinValue);
                //alert('ne.nMaxValue: ' + ne.nMaxValue);
                //alert('ne.sOldValue: ' + ne.sOldValue);
                //alert('ne.sSenderControl: ' + ne.sSenderControl);
                
                // coordinates of the UserControl, numpad. size (250 x 250) px
                var _uc = TcHmi.Controls.get('Region_Main');

                if (!_uc) {
                    console.log('Fetch Secondary_Region_Main');
                    _uc = TcHmi.Controls.get('Secondary_Region_Main');
                }

                var _left = (_uc.getRenderedWidth() / 2) - 125;
                var _top = (_uc.getRenderedHeight() / 2) - 125;

                // display the numpad on position
                var sctr = '#TcHmiRegion_NumPad';
                var ctrl = TcHmi.Controls.get('TcHmiRegion_NumPad');

                if (!ctrl) {
                    console.log('Fetch Secondary_TcHmiRegion_NumPad');
                    sctr = '#Secondary_TcHmiRegion_NumPad';
                    ctrl = TcHmi.Controls.get('Secondary_TcHmiRegion_NumPad');
                }

                if (ctrl) {
                    ctrl.setLeft(0);
                    ctrl.setTop(0);
                    ctrl.setVisibility('Visible');
                }

                $(sctr).animate({
                    left: _left + 'px',
                    top: _top + 'px'
                });
            }
            Pxxx_Name_HMI.F_NumInputOpen = F_NumInputOpen;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_NumInputOpen', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_NumInputOpen);

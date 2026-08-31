// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.760.44/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var Pxxx_Name_HMI;
        (function (Pxxx_Name_HMI) {
            function F_NumInputCommit() {
                var ne = TcHmi.Symbol.readEx('%i%NumericInputEvent%/i%');

                // if sender control specified, validate, write to symbol
                if (ne.sSenderControl) {
                    var se = new TcHmi.SymbolExpression(ne.sSenderControl);
                    var uc = TcHmi.Controls.get(se.getName()); //Reference to UserControl

                    var newValue = uc.getText();
                    var result = false;
                    if (newValue > ne.nMaxValue && ne.nMinValue < ne.nMaxValue) {
                        uc.setText(ne.sOldValue);
                        alert('Der Eingabewert überschreitet das Maximum, von: ' + ne.nMaxValue);
                    } else if (newValue < ne.nMinValue && ne.nMinValue < ne.nMaxValue) {
                        uc.setText(ne.sOldValue);
                        alert('Der Eingabewert unterschreitet das Minimum, von: ' + ne.nMinValue);
                    } else if (newValue != ne.sOldValue) {
                        var be = TcHmi.Binding.resolve('Text', uc);
                        var bs = new TcHmi.SymbolExpression(be);
                        var bnd = bs.toString();

                        var start = bnd.indexOf("%pp%");     // case parameter
                        var end = bnd.indexOf("%/pp%") + 5;

                        if (start < 0) {
                            start = bnd.indexOf("%s%");     // case symbol
                            end = bnd.indexOf("%/s%") + 4;
                        }

                        var sTargetSymbol = bnd.substring(start, end);
                        //console.log('sTargetSymbol: ' + sTargetSymbol);
                        TcHmi.Symbol.writeEx(sTargetSymbol, newValue, function (data) {
                            if (data.error === TcHmi.Errors.NONE) {
                                //console.log('done');
                                result = true;
                            } else {
                                alert('Error: ' + data.error);
                            }
                        });
                    }
                }

                // hide the numpad
                var sctr = '#TcHmiRegion_NumPad';
                var ctrl = TcHmi.Controls.get('TcHmiRegion_NumPad');
                if (!ctrl) {
                    console.log('Fetch Secondary_TcHmiRegion_NumPad');
                    sctr = '#Secondary_TcHmiRegion_NumPad';
                    ctrl = TcHmi.Controls.get('Secondary_TcHmiRegion_NumPad');
                }

                $(sctr).animate({
                    left: '0px',
                    top: '0px'
                });
                
                if (ctrl) {
                    ctrl.setVisibility('Collapsed');
                }

                return result;
            }
            Pxxx_Name_HMI.F_NumInputCommit = F_NumInputCommit;
        })(Pxxx_Name_HMI = Functions.Pxxx_Name_HMI || (Functions.Pxxx_Name_HMI = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('F_NumInputCommit', 'TcHmi.Functions.Pxxx_Name_HMI', TcHmi.Functions.Pxxx_Name_HMI.F_NumInputCommit);

var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaCarrierRefresh(container, statusColors) {
                const parent = container.getParent()?.getParent();
                const parentId = parent?.getId();
                const content = container?.getElement()?.[0]?.querySelector('svg');
                for (let i = 0; i < 127; i++) {
                    var circle = content?.getElementById(`circle${i}`);
                    var inner = content?.getElementById(`inner${i}`);
                    if (circle && inner) {
                        TcHmi.Symbol.readEx2(`%pp%${parentId}::data::WorkpiecesData[${i}]%/pp%`, function (data) {
                            if (data.error === TcHmi.Errors.NONE) {
                                var status = data.value?.CurrentStatus ?? 0;
                                circle.setAttribute('fill', statusColors[status].color);
                                inner.setAttribute('fill', statusColors[status].color);
                                var error = data.value?.Error ?? 0;
                                if (error > 0) {
                                    circle.setAttribute('fill', statusColors[statusColors.length - 1].color);
                                    inner.setAttribute('fill', statusColors[status].color);
                                }
                            }
                        });
                    }
                    ;
                }
            }
            TcHmiProject2.TcaCarrierRefresh = TcaCarrierRefresh;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaCarrierRefresh', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaCarrierRefresh);
//# sourceMappingURL=TcaCarrierRefresh.js.map
var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaStorageRefresh(container, statusColors) {
                const parent = container.getParent()?.getParent();
                const parentId = parent?.getId();
                const content = container?.getElement()?.[0]?.querySelector('svg');
                TcHmi.Symbol.readEx2(`%pp%${parentId}::data::WorkpiecesData%/pp%`, function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        for (let i = 0; i < 127; i++) {
                            var circle = content?.getElementById(`circle${i}`);
                            if (circle) {
                                var status = data.value[i]?.CurrentStatus ?? 0;
                                circle.setAttribute('fill', statusColors[status].color);
                            }
                        }
                    }
                });
            }
            TcHmiProject2.TcaStorageRefresh = TcaStorageRefresh;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaStorageRefresh', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaStorageRefresh);
//# sourceMappingURL=TcaStorageRefresh.js.map

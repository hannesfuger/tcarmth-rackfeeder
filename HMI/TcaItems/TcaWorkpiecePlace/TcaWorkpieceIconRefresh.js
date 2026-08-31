var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiProject2;
        (function (TcHmiProject2) {
            function TcaWorkpieceIconRefresh(container, statusColors) {
                const parent = container.getParent()?.getParent();
                const parentId = parent?.getId();
                const content = container?.getElement()?.[0]?.querySelector('svg');
                //console.log('parent: ',parent);
                //console.log('parentId: ',parentId);
                //console.log('content: ', content);
                var circle = content?.getElementById(`circle`);
                var inner = content?.getElementById(`inner`);
                //var path = content.querySelector('path');
                var text = content?.getElementById(`text`);
                //console.log('circle: ', circle);
                //console.log('inner: ', inner);
                //console.log('path: ', path);
                TcHmi.Symbol.readEx2(`%pp%${parentId}::data%/pp%`, function (data) {
                    if (data.error === TcHmi.Errors.NONE) {
                        var status = data.value?.CurrentStatus ?? 0;
                        circle.setAttribute('fill', statusColors[status].color);
                        inner.setAttribute('fill', statusColors[status].color);
                        var error = data.value?.Error ?? 0;
                        if (error > 0) {
                            circle.setAttribute('fill', statusColors[statusColors.length - 1].color);
                            inner.setAttribute('fill', statusColors[status].color);
                        }
                        var id = data.value?.Id ?? 0;
                        text.textContent = id;
                    }
                });
            }
            TcHmiProject2.TcaWorkpieceIconRefresh = TcaWorkpieceIconRefresh;
        })(TcHmiProject2 = Functions.TcHmiProject2 || (Functions.TcHmiProject2 = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('TcaWorkpieceIconRefresh', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaWorkpieceIconRefresh);
//# sourceMappingURL=TcaWorkpieceIconRefresh.js.map
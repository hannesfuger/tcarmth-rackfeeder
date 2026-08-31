namespace TcHmi {
	export namespace Functions {
		export namespace TcHmiProject2 {
			export function TcaWorkpieceIconRefresh(container: any, statusColors: any) {

				const parent = container.getParent()?.getParent()
				const parentId = parent?.getId()
				const content = container?.getElement()?.[0]?.querySelector('svg')

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
		}
	}
}
TcHmi.Functions.registerFunctionEx('TcaWorkpieceIconRefresh', 'TcHmi.Functions.TcHmiProject2', TcHmi.Functions.TcHmiProject2.TcaWorkpieceIconRefresh);

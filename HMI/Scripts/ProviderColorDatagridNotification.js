//ProviderColorDatagridNotification 
//This function provides the color for the Datagrid of the Notification Page

(function (TcHmi) {
    console.log('Funktionsaufruf Provider');
    console.log('Funktionsaufruf Provider');
    var value = 200;        //to make sure that it is an integer or something else like this
    //________________________________________________________________________________
    // Get ADS Variable
        var symbol = new TcHmi.Symbol('%s%PLC1.HMI.stHmiTc3::stIn::eLanguage%/s%');
        symbol.readEx(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                 value = data.value;
            } else {
                console.log('could not read data');
            }
        });
    //_________________________________________________________________________________      
        var ProviderColorDatagridNotification = function ProviderColorDatagridNotification(rowData, rowIndex, rowNumber) {

        var classes = [];
        //__________________________________________________________________________________________
        //Switch to select only the priority colum color or the full row color by Programmer
        var FullLine = true;
        //__________________________________________________________________________________________

        if (FullLine == true) {
            if (rowData.stPriority == TcHmi.Functions.Pxxx_Name_HMI.F_TranslateString("error", value)) {
                classes.push('background-error-fullrow');
            }
            else if (rowData.stPriority == TcHmi.Functions.Pxxx_Name_HMI.F_TranslateString("warning", value)) {
                classes.push('background-warning-fullrow');
            }
            else if (rowData.stPriority == TcHmi.Functions.Pxxx_Name_HMI.F_TranslateString("info", value)) {
                classes.push('background-info-fullrow');
            }
        }
        else {
            if (rowData.stPriority == TcHmi.Functions.Pxxx_Name_HMI.F_TranslateString("error", value)) {
                classes.push('background-error');
            }
            else if (rowData.stPriority == TcHmi.Functions.Pxxx_Name_HMI.F_TranslateString("warning", value)) {
                classes.push('background-warning');
            }
            else if (rowData.stPriority == TcHmi.Functions.Pxxx_Name_HMI.F_TranslateString("info", value)) {
                classes.push('background-info');
            }
        }
      // classes.push('background-error-fullrow');
        return classes;
    };
    
        TcHmi.Functions.registerFunction('ProviderColorDatagridNotification', ProviderColorDatagridNotification);
})(TcHmi);

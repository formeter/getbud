function updateBudget() {
     
    
    var BudgetObj = {
                        "entry" : [ ]
    };
    
    for (let i=0; i<3; i++){ 
        var EntryObj = {
                        "imp" : null,
                        "category" : null,
                        "entry" : null,
                        "depth" : null,
                        "type" : null,
                        "val" : null
                    };
        
        for (column in EntryObj)
           EntryObj[column] = document.getElementById(column + "_" + i).value 
        
        if (EntryObj.imp != "")
            BudgetObj.entry[i] = EntryObj        
    }
    
    
    
    let BudgetJSON = JSON.stringify(BudgetObj)
    alert(BudgetJSON)
    localStorage.setItem("budget.json", BudgetJSON)
    alert("Updated and saved successfully")
}

function loadBudget(){
    var BudgetJSON = localStorage.getItem("budget.json");
    var BudgetObj = JSON.parse(BudgetJSON);
    
    //alert(JSON.stringify(BudgetObj))
    for (var i in BudgetObj.entry) {
        for (var column in BudgetObj.entry[i]) {
            document.getElementById(column + "_" + i).value = BudgetObj.entry[i][column]
        }
    }
}

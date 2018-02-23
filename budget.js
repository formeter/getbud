const N_ENTRIES = 20;
BudgetObj = {    
                "temp_val" : 0,
                "entry_number" : 0,
                "entry" : [ ]
                // 
                };

function isFull() {
    var val = parseFloat(this.val);
    var depth = parseFloat(this.depth);
    return (val >= depth) && (this.type !== "%");
}

function EntryObj() {
                this.imp = null;
                this.category = null;
                this.entry = null;
                this.depth = null;
                this.type = null;
                this.val = null;
           };



//Making a table HTML
var template = document.querySelector('#raw_tmplt')
for (var i=0; i<N_ENTRIES; i++) {
    var clone = template.content.cloneNode(true)
    var input = clone.querySelectorAll('input')
    input[0].id = "imp_" + i
    input[0].value = i
    input[1].id = "category_" + i
    input[2].id = "entry_" + i
    input[3].id = "depth_" + i
    input[4].id = "val_" + i
    input[4].value = 0;
    var select = clone.querySelectorAll('select')
    select[0].id = "type_" + i
    template.parentNode.appendChild(clone)
}


function saveBudget() {    
    
   // alert(JSON.stringify(BudgetObj.entry[0]))
    
    BudgetObj.entry_number = 0;
    
    for (let i=0; i<N_ENTRIES; i++){ 
        
        //var BudgetObj.entry[i] = {};
        var entry = new EntryObj();
        
        for (column in entry) {
            if (!(typeof entry[column] === "function"))
               entry[column] = document.getElementById(column + "_" + i).value 
        }
        
       // if (EntryObj.imp != "")
        BudgetObj.entry[i] = entry;
        BudgetObj.entry_number++;
        //alert(JSON.stringify(BudgetObj.entry[i]))
       
    }
    
    //alert(BudgetObj.entry_number)
    //alert(JSON.stringify(BudgetObj.entry[0].isFull())) 
    //alert(JSON.stringify(BudgetObj))
    let BudgetJSON = JSON.stringify(BudgetObj)
    localStorage.setItem("budget.json", BudgetJSON)
}

function saveBudget_confirm(){
    if (confirm("Are you sure? This will rewright database"))
        saveBudget();
}

function loadBudget(){
    let BudgetJSON = localStorage.getItem("budget.json");
    BudgetObj = JSON.parse(BudgetJSON);
    
    //alert(JSON.stringify(BudgetObj))
     
    for (var i in BudgetObj.entry) {
        for (var column in BudgetObj.entry[i]) {
            document.getElementById(column + "_" + i).value = BudgetObj.entry[i][column]
        }
    }
    //alert(JSON.stringify(BudgetObj.entry[0].isFull()))
}


function addIncome(){
    for (var i=0; i<BudgetObj.entry_number; i++) {
//    for (var i=0; i<1; i++) {
        var entry = BudgetObj.entry[i];
        entry.isFull = isFull;
        
        
        alert(entry.isFull())
    }    
}



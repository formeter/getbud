const N_ENTRIES = 20;
const SHOWING_TABLE_COLUMNS = ["category", "entry", "depth", "val"];
//Making a table HTML
var template = document.querySelector('#editing_table_tmplt')
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

var showing_template = document.querySelector('#showing_table_tmplt')
for (var i=0; i<N_ENTRIES; i++) {
    var clone = showing_template.content.cloneNode(true)
    var div = clone.querySelectorAll('div')
    div[0].id = "showing_imp_" + i
    div[0].innerHTML = i
    div[1].id = "showing_category_" + i
    div[2].id = "showing_entry_" + i
    div[3].id = "showing_depth_" + i
    div[4].id = "showing_val_" + i
    showing_template.parentNode.appendChild(clone)
}


BudgetObj = {    
                "rest" : 0,
                "entry_number" : 0,
                "entry" : [ ]
            };

function isFull() {
    return (this.val >= this.depth) && (this.type !== "%");
}

function fillEntry(income) {
    var add_val = 0;
    
    if (this.type === "%") 
        add_val = income * this.depth / 100;
    else
        if (!(this.isFull())) 
            add_val = Math.min(income, (this.depth - this.val));
    
    if (this.isFull() && (this.type === "once")) 
        this.depth = 0;
  
    this.val += add_val;
    this.val = Math.round(this.val)
    return (income - add_val);
}

function EntryObj() {
                this.imp = null; //Not in use now
                this.category = null;
                this.entry = null;
                this.depth = null;
                this.type = null;
                this.val = null;
           };

function saveBudget() {     
    BudgetObj.entry_number = 0;
    
    for (let i=0; i<N_ENTRIES; i++){ 
        
        //var BudgetObj.entry[i] = {};
        var entry = new EntryObj();
        
        for (column in entry) {
            if (!(typeof entry[column] === "function"))
               entry[column] = document.getElementById(column + "_" + i).value 
        }
        
       // if (EntryObj.imp != "") {
        BudgetObj.entry[i] = entry;
        BudgetObj.entry_number++;
    }
    
    let BudgetJSON = JSON.stringify(BudgetObj)
    localStorage.setItem("budget.json", BudgetJSON)
    loadBudget()
};

function saveBudget_confirm(){
    if (confirm("Are you sure? This will rewright database"))
        saveBudget();
};

function loadBudget(){
    let BudgetJSON = localStorage.getItem("budget.json");
    BudgetObj = JSON.parse(BudgetJSON);
    showBudget()
};

function showBudget(){    
    for (var i=0; i<BudgetObj.entry_number; i++) 
            for (var column in BudgetObj.entry[i]) 
                if (!(typeof BudgetObj.entry[i][column] === "function")) 
                    document.getElementById(column + "_" + i).value = BudgetObj.entry[i][column]
                    

    for (var i=0; i<BudgetObj.entry_number; i++) 
            for (var j in SHOWING_TABLE_COLUMNS) {
                var id = "showing_" + SHOWING_TABLE_COLUMNS[j] + "_" + i
                document.getElementById(id).innerHTML = BudgetObj.entry[i][SHOWING_TABLE_COLUMNS[j]]
            }    
    
};

function addIncomeButton() {
    saveBudget()
    if (isNaN(parseFloat(document.getElementById("income").value)))
        document.getElementById("income").value = 0;
    addIncome(parseFloat(document.getElementById("income").value))
};

function addIncome(income){
    var rest = parseFloat(income) + BudgetObj.rest;
for (var i=0; i<BudgetObj.entry_number; i++) {
        var entry = BudgetObj.entry[i];
        entry.imp = parseFloat(entry.imp);        
        entry.val = parseFloat(entry.val);
        if (isNaN(entry.val)) 
            entry.val = 0;
        entry.depth = parseFloat(entry.depth);
        if (isNaN(entry.depth)) 
            entry.depth = 0;
        
        entry.isFull = isFull;
        entry.fillEntry = fillEntry;
        
        rest = entry.fillEntry(rest); //Main evaluating operation
    } 
    BudgetObj.rest = rest;
    if (rest > 0) 
        alert("There are some funds rest!\n" + "rest = " + rest + "\nThey've been saved and will be added to next Income")
    showBudget()
};





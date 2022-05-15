function doGet(request) {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getTableData(){
  var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
  var ws = ss.getSheetByName("Data");
  var data = ws.getRange(2,1,ws.getLastRow()-1,11).getValues();
  return data;
}

function getTotal(){
    var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
    var ws = ss.getSheetByName("Data2");
    var data = ws.getRange('A2').getValue();
    return data;
}
function employeTotal(){
    var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
    var ws = ss.getSheetByName("Data2");
    var data = ws.getRange('B2').getValue();
    return data;
}
function roleTotal(){
    var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
    var ws = ss.getSheetByName("Data2");
    var data = [
        ws.getRange('B5').getValue(),
        ws.getRange('B6').getValue(),
        ws.getRange('B7').getValue(),
      ]
    return data;
}
function taxeTotal(){
    var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
    var ws = ss.getSheetByName("Data2");
    var data = [
        ws.getRange('H3').getValue(),
        ws.getRange('H4').getValue(),
        ws.getRange('H5').getValue(),
      ]
    return data;
}
function taxeOuvrier(formOuvrier){
  var url="PUT URL HERE OF GOOGLE SHEET";
  var ss= SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("Data2");
  var result = formOuvrier;
   var cell = ws.getRange("H3");
   cell.setValue([[result/100]]);
     getScriptURL();
}
function taxeManager(formManager){
  var url="PUT URL HERE OF GOOGLE SHEET";
  var ss= SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("Data2");
  var result = formManager;
   var cell = ws.getRange("H4");
   cell.setValue([[result/100]]);
     getScriptURL();
}
function taxeAdjoint(formAdjoint){
  var url="PUT URL HERE OF GOOGLE SHEET";
  var ss= SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("Data2");
  var result = formAdjoint;
   var cell = ws.getRange("H5");
   cell.setValue([[result/100]]);
     getScriptURL();
}
function processForm(formObject){
  var url="PUT URL HERE OF GOOGLE SHEET";
  var ss= SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheetByName("Data");
  // Ligne vide a remplire
  var last = ws.getLastRow()+1;
 
  //Remplissage de la ligne
  ws.appendRow([
    formObject.nom.slice(0,3)+formObject.prenom.slice(0,3)+formObject.phone.slice(0,3),
    formObject.nom,
    formObject.prenom,
    formObject.phone,
    formObject.role,
    0,
    0,
    0,
   ]);

    // Verification que la personne existe
    var verif = ws.getRange("A"+last);
    if(verif.isBlank()==false){

      //Salaire 
      switch(formObject.role){
        case("Manager"):
          // Salaire
          cell =ws.getRange("I"+last);
          cell.setFormula("(F"+last+"*DATA2!K3+G"+last+"*DATA2!L3+H"+last+"*DATA2!M3)*DATA2!H4");
          // Entreprise
          cell =ws.getRange("J"+last);
          cell.setFormula("(F"+last+"*DATA2!K3+G"+last+"*DATA2!L3+H"+last+"*DATA2!M3)*DATA2!I4");
          break;

        case("Adjoint"):
          //Salaire 
          cell =ws.getRange("I"+last);
          cell.setFormula("(F"+last+"*DATA2!K3+G"+last+"*DATA2!L3+H"+last+"*DATA2!M3)*DATA2!H5");
          // Entreprise
          cell =ws.getRange("J"+last);
          cell.setFormula("(F"+last+"*DATA2!K3+G"+last+"*DATA2!L3+H"+last+"*DATA2!M3)*DATA2!I5");
          break;

        default:
          //Salaire 
          cell =ws.getRange("I"+last);
          cell.setFormula("(F"+last+"*DATA2!K3+G"+last+"*DATA2!L3+H"+last+"*DATA2!M3)*DATA2!H3");
          // Entreprise
          cell =ws.getRange("J"+last);
          cell.setFormula("(F"+last+"*DATA2!K3+G"+last+"*DATA2!L3+H"+last+"*DATA2!M3)*DATA2!I3");
          break;
      }

      //Eligibilité 
      var cell = ws.getRange("K"+last);
      // minimum pour être payer 
      cell.setFormula( "IF(J"+last+">Data2!D2"+";\"OUI\";\"NON\")");  
    }

  // refresh page
  getScriptURL();
}

function paiduser(id){
  var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
  var ws = ss.getSheetByName("Data");
  var lastRowEdit = ws.getLastRow();
  for(var i = 2 ; i<= lastRowEdit ;i++){
    if(ws.getRange(i,1).getValue() == id){
      ws.getRange('F'+i+':H'+i).setValues([[0,0,0]]);
    }

  }
  getScriptURL();
}
function deleteuser(id){
  var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
  var ws = ss.getSheetByName("Data");
  var lastRowEdit = ws.getLastRow();
  for(var i = 2 ; i<= lastRowEdit ;i++){
    if(ws.getRange(i,1).getValue() == id){
      ws.deleteRow(i);
    }

  }
  getScriptURL();
}

function editForm(id,userInfo){  
  var ss = SpreadsheetApp.openByUrl("PUT URL HERE OF GOOGLE SHEET");
  var ws = ss.getSheetByName("Data");
  var lastRowEdit = ws.getLastRow();
  var cell ;
  for(var i = 2 ; i<= lastRowEdit ;i++){
    if(ws.getRange(i,1).getValue() == id){

      switch(userInfo.newrole){
        case("Manager"):
          // Salaire
          cell = ws.getRange("I"+i);
          cell.setFormula("(F"+i+"*DATA2!K3+G"+i+"*DATA2!L3+H"+i+"*DATA2!M3)*DATA2!H4");
          // Entreprise
          cell =ws.getRange("J"+i);
          cell.setFormula("(F"+i+"*DATA2!K3+G"+i+"*DATA2!L3+H"+i+"*DATA2!M3)*DATA2!I4");
          break;

        case("Adjoint"):
          //Salaire 
          cell =ws.getRange("I"+i);
          cell.setFormula("(F"+i+"*DATA2!K3+G"+i+"*DATA2!L3+H"+i+"*DATA2!M3)*DATA2!H5");
          // Entreprise
          cell =ws.getRange("J"+i);
          cell.setFormula("(F"+i+"*DATA2!K3+G"+i+"*DATA2!L3+H"+i+"*DATA2!M3)*DATA2!I5");
          break;

        default:
          //Salaire 
          cell =ws.getRange("I"+i);
          cell.setFormula("(F"+i+"*DATA2!K3+G"+i+"*DATA2!L3+H"+i+"*DATA2!M3)*DATA2!H3");
          // Entreprise
          cell =ws.getRange("J"+i);
          cell.setFormula("(F"+i+"*DATA2!K3+G"+i+"*DATA2!L3+H"+i+"*DATA2!M3)*DATA2!I3");
          break;
      }

      ws.getRange('A'+i).setValue(userInfo.newnom.slice(0,3)+userInfo.newprenom.slice(0,3)+userInfo.newtelephone.slice(0,3))
      ws.getRange('B'+i+':H'+i).setValues([[ userInfo.newnom,userInfo.newprenom, userInfo.newtelephone,userInfo.newrole,userInfo.newrun,userInfo.newpart,userInfo.newent]]);
    }

  }

  
  getScriptURL();
}

function getScriptURL() {
  return ScriptApp.getService().getUrl();
}
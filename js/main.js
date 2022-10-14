var list = [
	];

//somando total
function getTotal(list){
	var total = "";
	for(var key in list){
		vig = "-";
		vir = ",";
		fin = "&&";
		total += vir+list[key].tiprd+vig+list[key].desc+vig+list[key].amount+vig+(list[key].value);
	}
	let str2 = total.replace(/^./, "");
	total2 = fin+str2+fin
	document.getElementById("totalValue").innerHTML = formatValue(total2);
}


//criando a tabela
function setList(list){
	var table = '<thead><tr><td>Tipo de Produto</td><td>Quantidade Produzida</td><td>Quantidade Impressa</td><td>Escala</td><td>Ação</td></tr></thead><tbody>';
	for(var key in list){
		table += '<tr><td>'+ formatTiprd(list[key].tiprd) +'</td><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-info" onclick="setUpdate('+key+');">Editar</button> <button class="btn btn-danger" onclick="deleteData('+key+');">Excluir</button></td></tr>';
	}
	table += '</tbody>';

	document.getElementById('listTable').innerHTML = table;
	getTotal(list);
	saveListStorage(list);
}

//formatando o nome do produto
function formatTiprd(tiprd){
	var str = tiprd.toUpperCase();
	return str;
}


//formatando a quantidade produzida
function formatDesc(desc){
	var str = desc.toUpperCase();
	return str;
}

//formatando a quantidade impressa
function formatAmount(amount){
	var str = amount.toUpperCase();
	return str;
}

//formatando a Escala
function formatValue(value){
	var str = value.toUpperCase();
	return str;
}

//adicionar novo produto
function addData(){
	if(!validation()){
		return;
	}
	var tiprd = document.getElementById("tiprd").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list.unshift({"tiprd":tiprd , "desc":desc , "amount":amount , "value":value });
	setList(list);
}

//Botão copiar
	let execCopy = () =>{ 
	var test = total2
	let inputTest = document.createElement("input");
	inputTest.value = test;
	document.body.appendChild(inputTest);
	inputTest.select();
	document.execCommand('copy');
	document.body.removeChild(inputTest);
	alert("O Código Gerado é: " + inputTest.value);
}

//botões de editar
function setUpdate(id){
	var obj = list[id];
	document.getElementById("tiprd").value = obj.tiprd;
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";
	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

//limpa os campos de editar
function resetForm(){
	document.getElementById("tiprd").value = "";
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	
	document.getElementById("inputIDUpdate").innerHTML = "";
	document.getElementById("errors").style.display = "none";
}

//atualizando os dados
function updateData(){
	if(!validation()){
		return;
	}
	var id = document.getElementById("idUpdate").value;
	var tiprd = document.getElementById("tiprd").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"tiprd":tiprd , "desc":desc, "amount":amount, "value":value};
	resetForm();
	setList(list);
}

//deletando os dados
function deleteData(id){
	if(confirm("Delete this item?")){
		if(id === list.length - 1){
			list.pop();
		}else if(id === 0){
			list.shift();
		}else{
			var arrAuxIni = list.slice(0,id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
	}
}

//validando e printando erros
function validation(){
	var tiprd = document.getElementById("tiprd").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;
	var errors = "";
	document.getElementById("errors").style.display = "none";

	if(tiprd === ""){
		errors += '<p>Você não selecionou um Produto</p>';
	}
	if(desc === ""){
		errors += '<p>Você não inseriu a Quantidade Produzida</p>';
	}else if(desc != parseInt(desc)){
		errors += '<p>Não insira pontos, letras ou caracteres especiais no Campo Quant. Prod.</p>';
	}
	if(amount === ""){
		errors += '<p>Você não inseriu a Quantidade Impressa</p>';
	}else if(amount != parseInt(amount)){
		errors += '<p>Não insira pontos, letras ou caracteres especiais no Campo Quant. Impr.</p>';
	}
	if(value === ""){
		errors += '<p>Você não inseriu a Escala</p><p>Caso não possua Escala, Insira o Valor 0</p><p>Não insira ponto</p>';
	}else if(value != parseInt(value)){
		errors += '<p>Não insira pontos, letras ou caracteres especiais no Campo Escala</p>';
	}else if(false != value.includes('.')){
		errors += '<p>Não insira pontos</p>';}
	

	if(errors != ""){
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
		return 0;
	}else{
		return 1;
	}
}

//deletando lista
function deleteList(){
	if (confirm("Delete this list?")){
		list = [];
		setList(list);
	}
}

//salvando em storage
function saveListStorage(list){
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list",jsonStr);
}

//verifica se já tem algo salvo
function initListStorage(){
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);
}

initListStorage();
Georgian Keyboard 1.0 Instructions
----------------------------------

Terms Of Initialization
	
	Four Parameters Required
		check: true/false/null NOTE*: true => chbox field is neccessary and it's functional , false => chbox field is neccessary but not it isn't functional, null => chbox isn't neccessary and it isn't functional 
		chbox: Checkbox ID
		field: Filed ID
		type : 1 Mkhedruli, 2 Asomtavruli, 3 Nuskhuri
	
	Functions On Instances
		on(element,event,handler)
		transcript(text,from,to,handler) NOTE*: from parameter could be 0/1/2/3, to parameter could be 1/2/3
		type() NOTE*: Returns type of an parameter
		info() NOTE*: Returns basic information on instance
	
	NOTE*: Argument Must Be An Object As Is Shown Below
	
	For Example:
		new GEOKEY({"check" : true , "chbox" : "a" , "field" : "a_txt" , "type" : 1});

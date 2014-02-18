/*
 * Georgian Keyboard 1.0 ( 1 Mkhedruli , 2 Asomtavruli , 3 Nuskhuri )
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Tornike Nanobashvili
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

;(function(){
	
	var GEOKEY = window.GEOKEY = function(object) {
		
		var msg = {
			"config"        : "Initialization\n{\n\"check\" : true/false (boolean),\n\"chbox\" : checkboxID (string),\n\"field\" : fieldID (string),\n\"type\" : 1/2/3 (integer)\n}",
			"invBoxID"      : "Invalid Checkbox ID Parameter ! !",
			"invFieldID"    : "Invalid Field ID Parameter !",
			"invTypeNum"    : "1 : Mkhedruli\n2 : Asomtavruli\n3 : Nuskhuri",
			"TransConfig"   : "Text,0/1/2/3,1/2/3,Function(Results)\n\nWhere :\n\n0 : English\n1 : Mkhedruli\n2 : Asomtavruli\n3 : Nuskhuri",
			"success"       : "Framework Has Been Successfully Loaded !"
		};
		
		var _this = this , check = null , chbox = null , field = null , type = null , chars = {
			1 : {
				"title"    : "Mkhedruli",
				"lang"     : "ka_mkhedruli",
				"alphabet" : ["a","b","g","d","e","v","z","T","i","k","l","m","n","o","p","J","r","s","t","u","f","q","R","y","S","C","c","Z","w","W","x","j","h","E","I","V","Q","O","F","Y","U","G","A","P","N"],
				"level"    : 4304
			},
			2 : {
				"title"    : "Asomtavruli",
				"lang"     : "ka_asomtavruli",
				"alphabet" : ["a","b","g","d","e","v","z","T","i","k","l","m","n","o","p","J","r","s","t","u","f","q","R","y","S","C","c","Z","w","W","x","j","h","E","I","V","Q","O"],
				"level"    : 4256
			},
			3 : {
				"title"    : "Nuskhuri",
				"lang"     : "ka_nuskhuri",
				"alphabet" : ["a","b","g","d","e","v","z","T","i","k","l","m","n","o","p","J","r","s","t","u","f","q","R","y","S","C","c","Z","w","W","x","j","h","E","I","V","Q","O"],
				"level"    : 11520
			},
			4 : function(n) {
				var arr = [];
				for ( var i = 0; i < 38; i++ ) {
					arr.push(String.fromCharCode(chars[n]["level"] + i));
				}
				return arr;
			}
		};
		
		function bind(context,fn) {
			return function(){
				return fn.apply(context,arguments);
			};
		}
		
		function transcriptCore(text,from,to,fn) {
			var result = "" , index = 0;
			
			for ( var i = 0; i < text.length; i++ ) {
				( from !== 0 ) ? index = chars[4](from).indexOf(text[i]) : index = chars[to]["alphabet"].indexOf(text[i]);
				( index === -1 ) ? result += text[i] : result += (String.fromCharCode(chars[to]["level"] + index));
			}
			
			fn.call(_this,result);
		}
		
		this.type = function() {
			return /^.\w+\s(\w+).$/.exec(Object.prototype.toString.call(arguments[0]))[1].toLowerCase();
		};
		
		this.transcript = function(text,from,to,fn) {
			if ( arguments.length !== 4 || this.type(text) !== "string" || this.type(from) !== "number" || from < 0 || from > 3 || this.type(to) !== "number" || to < 1 || to > 3 || this.type(fn) !== "function" ) {
				notify(msg.TransConfig);
				return;
			}
			
			switch ( from ) {
				case 1:
					return transcriptCore(text,1,to,fn);
				break;
				case 2:
					return transcriptCore(text,2,to,fn);
				break;
				case 3:
					return transcriptCore(text,3,to,fn);
				default:
					return transcriptCore(text,0,to,fn);
			}
		};
		
		this.on = function(elem,type,fn) {
			if ( elem.addEventListener ) {
				elem.addEventListener(type,bind(this,fn),false);
			} else {
				elem.attachEvent("on" + type,bind(this,fn));
			}
		};
		
		this.info = function() {
			return {"title" : chars[type]["title"], "lang" : chars[type]["lang"], "type" : type};
		};
		
		function notify(msg) {
			console.log(msg);
			alert(msg);
		}
		
		function assemble(object) {
			if ( _this.type(object) !== "object" || !object.hasOwnProperty("check") || !object.hasOwnProperty("field") || !object.hasOwnProperty("type") || (_this.type(object.check) !== "null" && !object.hasOwnProperty("chbox") ) ) {
				notify(msg.config);
				return false;
			}
			
			if ( _this.type(object.check) !== "boolean" ) {
				if ( _this.type(object.check) !== "null" ) {
					notify(msg.config);
					return false;
				}
			}
			
			check = object.check;
			
			if ( check !== null ) {
				if ( _this.type(object.chbox) !== "string" || _this.type(object.field) !== "string" ) {
					notify(msg.config);
					return false;
				}
				
				if ( check && document.getElementById(object.chbox) === null ) {
					notify(msg.invBoxID);
					return false;
				}
				
				chbox = object.chbox;
			}
			
			
			if ( document.getElementById(object.field) === null ) {
				notify(msg.invFieldID);
				return false;
			}
			
			field = object.field;
			
			if ( _this.type(object.type) !== "number" ) {
				notify(msg.config);
				return false;
			}
			
			if ( object.type < 1 || object.type > 3 ) {
				notify(msg.invTypeNum);
				return false;
			}
			
			type = object.type;
			
			return true;
		}
		
		function keyNum(e) {
			e = e || window.event;
			return e.which || e.keyCode;
		}
		
		function frameInto(char) {
			var elem = document.getElementById(field) , pos = 0;
			
			elem.focus();
			
			if ( elem.selectionStart ) {
				pos = elem.selectionStart;
			}
			
			elem.value = elem.value.substr(0,pos) + char + elem.value.substr(elem.selectionEnd);
			
			elem.setSelectionRange(pos + char.length ,pos + char.length);
		}
		
		function execute() {
			var _capsCount = 2;
			
			_this.on(document.getElementById(field),"keydown",function(e){
				var key = keyNum(e) , origin = String.fromCharCode(key) , index = 0 , capsLock = false , shift = e.shiftKey ? e.shiftKey : ((key === 16) ? true : false) , ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false);
				
				if ( ctrl ) {
					return;
				}
				
				if ( key === 20 ) {
					_capsCount++;
				}
				
				( _capsCount % 2 == 0 ) ? capsLock = false : capsLock = true;
				
				if ( key === 192 ) {
	  				if ( check ) {
	  					e.preventDefault();
	  					( document.getElementById(chbox).checked ) ? document.getElementById(chbox).checked = false : document.getElementById(chbox).checked = true;
	  				}
	  			}
	  			
	  			if ( check && !document.getElementById(chbox).checked ) {
	  				return;
	  			}
	  			
	  			( shift || capsLock ) ? origin = origin.toUpperCase() : origin = origin.toLowerCase();
	  			
	  			if ( chars[type]["alphabet"].indexOf(origin) === -1 ) {
	  				return;
	  			}
	  			
	  			index = chars[type]["alphabet"].indexOf(origin);
	  			
	  			if ( key >= 65 && key <= 90 ) {
	  				e.preventDefault();
	  				frameInto(String.fromCharCode(chars[type]["level"] + index));
	  			}
	  			
	  			return;
			});
		}
		
		if ( !assemble(object) ) {
			return;
		}
		
		execute();
	};
	
})();

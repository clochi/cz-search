(function(){
	'use strict';
	angular
		.module('nombreApp')
		.component('czSearch', {
			templateUrl: 'componentes/acceso-rapido/buscador.html',
			controller: buscar,
      bindings: {
        data: '=',
				fields: '='
      }
		})
		.filter('beautify', beautify);



		function beautify(){

			return function(str){
				var nombre = str.match(/^[a-z]*/)[0];
				nombre = nombre.replace(nombre[0], nombre[0].toUpperCase());
				return nombre;
			}
		}
    function buscar(){
      var vm = this;
			vm.filtros = vm.fields;
			vm.categorias = [];
			vm.search = function(e){
				vm.categorias = [];
				if(!Array.isArray(vm.data)) return false;
				if(vm._data == undefined) vm._data = Object.assign([] ,vm.data);

				if(e.currentTarget.value.length > 2){
					vm.data = vm._data.filter(function(item){
						for(var key = 0; key < vm.filtros.length; key++){
							if(parser(item[vm.filtros[key]]).search(parser(e.currentTarget.value)) != -1){
								if(vm.categorias.indexOf(vm.filtros[key]) == -1) vm.categorias.push(vm.filtros[key]);
								return true;
							}
						}
						return false;
					})
				}else{
					vm.data = Object.assign([], vm._data);
				}

			}
    }

		function parser(word){
			if(word == null) return "js20a3k4jsjas2asdwf";
			var src = ['á', 'é', 'í', 'ó', 'ú'];
      var dest = ['a', 'e', 'i', 'o', 'u'];
			for(var i = 0; i < src.length; i++){
				word = word.toLowerCase().replace(src[i], dest[i])
			}
			return word.toString();
		}

})();

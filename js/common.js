layui.use(['layer', 'form'], function(){
		 var layer = layui.layer;
				
});
function TabIit(DOM , callback ){
	var El = document.querySelector('.' +  DOM);
	var ElChild = El.querySelectorAll('li');
	
	for(var i = 0 ; i< ElChild.length; i++){
		ElChild[i].addEventListener('click', function(){
			var LastChild = El.querySelector('.active'); 
				LastChild.classList.remove('active');
				this.classList.add('active');
				callback && (callback(this));
		},false);
	}
};

function PopConfirm(){
	layer.prompt({
	  formType: 0,
	  value: '',
	  title: '请输入课程码',
	  area: ['300px', '50px'] //自定义文本域宽高
	}, function(value, index, elem){
	 
	  layer.close(index);
	});
}

function TipMessage(){
	
	layer.alert('该功能暂未开放 ');
}


class Ajax {
	
	constructor(){
		
	}
	
	public( method , url , data , callback ){
		var XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		var host = window.location.host , protocol = window.location.protocol;
		var URL = protocol + '//' + host + url ; 
		if ( method == 'GET'){
			XHR.open( method , URL + '?' + data , true ); 
			XHR.send(); 
		}else {
			XHR.open( method , URL  , true ); 
			XHR.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			XHR.send( data ); 
		}
		
		XHR.onreadystatechange = function (){
			( this.readyState == 4 && this.status == 200  ) && ( callback && callback( JSON.parse( this.responseText ) ) );
		}
	}
	
	formPublic( form , url , callback ){
		    if  ( !this.TestForm( form ) ){
				return false ;
			}
			var FORMDATA = new FormData(form) ;
			var host = window.location.host , protocol = window.location.protocol;
			var URL = protocol + '//' + host + url;
			var XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
				XHR.open( 'POST' , URL  , true ); 
				XHR.send( FORMDATA ); 
			
			XHR.onreadystatechange = function (){
				( this.readyState == 4 && this.status == 200  ) && ( callback && callback( JSON.parse( this.responseText ) ) );
			};
			
	} 
	
	
	testType( type , value) {
		if ( !value.trim() ){
			layer.msg( '填写信息不能为空!' );
			return false ;
		};
		var result = true ;
		switch ( type ) {
			case  'name' : 
			if (! /^[\u4E00-\u9FA5]{2,4}$/.test(value) ){
				layer.msg('请填写正确的中文名');
				result = false ;
			}else{
				result = true ;
			}
			break ;
			case  'password' :
			if (! /^[a-zA-z0-9]{6,10}$/.test(value) ){
				layer.msg('密码必须为6到10位的字母或数字');
				result = false ;
			}else{
				result = true ;
			}
			break ;
			case  'phone' :
			if (! /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/.test(value) ){
				layer.msg('请填写正确的手机号');
				result = false ;
			}else{
				result = true ;
			}
			break ;
			case  'email' :
			if (! /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value) ){
				layer.msg('请填写正确的邮箱');
				result = false ;
			}else{
				result = true ;
			}
			break ;
			case  'number' :
			if (! /^\d{8,13}$/.test(value) ){
				layer.msg('填写号码必须为数字');
				result = false ;
			}else{
				result = true ;
			}
			
			break ;
		};
		return result;
	}
	
	TestForm( form ){
		var that = this ;
		var resultBool = true ;
		var number = 0; 
		var InputGroup = form.querySelectorAll('input');
		    InputGroup = Array.prototype.slice.call(InputGroup);
			InputGroup = InputGroup.filter(function( item , index ){
				if ( item.dataset.type && ( item.type == 'text' || item.type == 'password' || item.type == 'number')){
					 return item ;
				}
			})
			InputGroup.forEach( function( item , index ){
					
				var result = that.testType( item.dataset.type , item.value );
				if ( !result ){
					resultBool = false ; 
					break;
				}
				
			});
			
			return resultBool ;
	}
	
	
};

function changeDataForm(data){
	var content = '' ;
	for( var attr in data ){
		content += attr + '=' + data[attr] + '&';
	};
	content = content.substring( 0, content.length - 1 );
	return content;
}
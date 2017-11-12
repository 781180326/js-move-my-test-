function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj, false)[attr];
	}
}

function shack_box(obj,attr,endFun){
	var pos = parseFloat(css(obj,attr));
	function shack(){
		var arr = [];
		for(var i=20;i>=0;i-=2){
			arr.push(i,-i);
		}
		clearInterval(obj.shack);
		var num = 0;
		obj.shack = setInterval(function(){
			obj.style[attr] = pos+arr[num]+'px';
			num++;
			if(num == arr.length){
				clearInterval(obj.shack);
				endFun&&endFun();
			}
		},30);
	}
	return shack;
}



function move(obj,json,speed,endFn){
	clearInterval(obj.timer);
	var cur = 0;

	//存一下速度，因为后面需要来判断速度方向，不能在原值上更改，否则会引起混乱（值会在多个属性间混用）
	var sp = speed;

	obj.timer = setInterval(function(){

		//如果iBtn 为真，清除定时器
		var iBtn = true;

		var cur = 0;
		//遍历json中的属性
		for(var attr in json){
			
			var iTarget = json[attr];

			if( attr == "opacity"){
				cur = Math.round(css( obj, 'opacity' ) * 100);
			}else{
				cur = parseInt( css( obj, attr) );
			}

			//区分速度方向
			speed = cur < iTarget ? sp : -sp;

			//检测
			//console.log(attr +":"+speed);

			//如果没有达到设置，继续运动
			if( cur != iTarget){
				//运动一步
				cur = cur + speed;

				//如果运动超过设置，拉回来，否则正常进行
				if(cur > iTarget && speed > 0 || cur < iTarget && speed < 0) {
					cur = iTarget;
				}else{
					iBtn = false;
				}

				if( attr == "opacity"){
					obj.style.opacity = cur/100;
					obj.style.filter = 'alpha(opacity='+ cur +')';
				}else{
					obj.style[attr] = cur + "px";
				}
			}
			
		}
	

		if(iBtn){
			clearInterval(obj.timer);
			endFn && endFn.call(obj);
		}
		
	}, 50);
}




function bufferMove(obj,json,endFn){
	clearInterval(obj.timer);
	var cur = 0;

	obj.timer = setInterval(function(){

		//如果iBtn 为真，清除定时器
		var iBtn = true;
		var speed = 0;
		var cur = 0;
		//遍历json中的属性
		for(var attr in json){
			
			var iTarget = json[attr];

			if( attr == "opacity"){
				cur = Math.round(css( obj, 'opacity' ) * 100);
			}else{
				cur = parseInt( css( obj, attr) );
			}

			
			speed = ( iTarget - cur ) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			//检测
			//console.log(attr +":"+speed + cur);

			//如果没有达到设置，继续运动
			if( cur != iTarget){
				//运动一步
				cur = cur + speed;

				//如果运动超过设置，拉回来，否则正常进行
				if(cur > iTarget && speed > 0 || cur < iTarget && speed < 0) {
					cur = iTarget;
				}else{
					iBtn = false;
				}

				if( attr == "opacity"){
					obj.style.opacity = cur/100;
					obj.style.filter = 'alpha(opacity='+ cur +')';
				}else{
					obj.style[attr] = cur + "px";
				}
			}
			
		}
	

		if(iBtn){
			clearInterval(obj.timer);
			endFn && endFn.call(obj);
		}
		
	}, 50);
}

/**
 * Created by Administrator on 2016/6/28.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.Sel3DObject=function(clicklist_,domObject,camera,callBackFun){
    var scope=this,INTERSECTED;
    scope.raycaster = new THREE.Raycaster();
    scope.moveRaycaster = new THREE.Raycaster();
    scope.mouse = new THREE.Vector2();
    scope.overMouse = new THREE.Vector2();
    scope.camera=camera;
    scope.clickCallback=callBackFun;
    scope.domElement=domObject;
    scope.clickList=clicklist_;

    scope.overselEnabled=false;



    function onMouseClick( event ) {
        event.preventDefault();
        scope.mouse.x = ( event.clientX / domObject.clientWidth ) * 2 - 1;
        scope.mouse.y = - ( event.clientY / domObject.clientHeight ) * 2 + 1;
        scope.raycaster.setFromCamera( scope.mouse, camera );
        var intersects = scope.raycaster.intersectObjects( scope.clickList );
        if(intersects.length>0){

            scope.clickCallback(intersects[0].object);

        }

    }

    scope.touchStartPoint=new THREE.Vector2();
    scope.touchEndPoint=new THREE.Vector2();

    function onTouchStart(event){
        if(!event.touches.length)return;
        scope.touchStartPoint.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
        scope.mouse.x = ( scope.touchStartPoint.x / domObject.clientWidth ) * 2 - 1;
        scope.mouse.y = - ( scope.touchStartPoint.y / domObject.clientHeight ) * 2 + 1;
        scope.raycaster.setFromCamera( scope.mouse, camera );
        var intersects = scope.raycaster.intersectObjects( scope.clickList );

        if(intersects.length>0){

            scope.clickCallback(intersects[0].object);

        }

    }
    scope.domElement.addEventListener("click",onMouseClick,false);
    scope.domElement.addEventListener( 'touchstart', onTouchStart, false );

    this.startOverList=function(overlist_,overCallBack_){
        scope.overCallback=overCallBack_;
        scope.overList=overlist_;
        //scope.domElement.addEventListener("mousemove",scope.onmouseMove,false);
    }
    this.overSelStar=function(){
        scope.overselEnabled=true;
        scope.domElement.addEventListener("mousemove",scope.onmouseMove,false);
    }
    this.overSelRemove=function(){
        scope.overselEnabled=false;
        scope.domElement.removeEventListener("mousemove",scope.onmouseMove,false);
    }
    this.onmouseMove=function(event){
        scope.overMouse.x = ( event.clientX / domObject.clientWidth ) * 2 - 1;
        scope.overMouse.y = - ( event.clientY / domObject.clientHeight ) * 2 + 1;
    }

    this.onOverEffectUpdate=function(){
        if(!scope.overselEnabled)return;
        scope.moveRaycaster.setFromCamera( scope.overMouse, scope.camera );
        var intersects = scope.moveRaycaster.intersectObjects( scope.overList );
        if ( intersects.length > 0 ) {
            scope.overCallback(intersects[0].object);
        }
    }

}
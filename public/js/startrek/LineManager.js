/**
 * Created by Administrator on 2016/7/21.
 */
var HCC_LIGHTS=HCC_LIGHTS||{};
HCC_LIGHTS.LineManager=function(){
    if(HCC_LIGHTS.lineMana)throw new Error("ÏßÌõ¹ÜÀíÎªµ¥ÀýÄ£Ê½");
    HCC_LIGHTS.lineMana=this;

    var scope=this;
    this.lineList=[];//ÏßÌõÊý×é
    this.onlineDevices=[];//ÔÚÏßÉè±¸
    this.historyTopo=[];//ÀúÊ·ÏßÂ·
    this.newTopo=[];//ÐÂÏßÂ·



    this.enabled=false;//ÊÇ·ñ³õÊ¼»¯×´Ì¬
    this.holder;//ÈÝÆ÷
    this.starSpriteList;//½ÚµãÁÐ±í

    //±È½ÏÁ½¸ö½Úµã
    this.compareItem=function(i1_,i2_){
        if(((i1_.node==i2_.node)||(i1_.parent==i2_.node))&&((i1_.node==i2_.parent)||(i1_.parent==i2_.parent))){
            return true;
        }
        return false;
    }

    /**
     * 节点更改
     * @param name_
     * @param intensity_
     * @param enabled_
     */
    this.nodeChange=function(obj_){
        var sprite_=this.getSpriteObject(obj_.name);
        var enabled_=false;
        var intensity_=obj_.level;
        if(sprite_){
            obj_.status == 0 ? enabled_ = false : enabled_ = true;
            sprite_.nodeChange(intensity_,enabled_);
        }
    }

    /**
     * 连线更改
     * @param obj_
     */
    this.topoChange=function(obj_){
        var hisLine_=this.getSpriteLine(obj_.name);
        if(hisLine_)hisLine_.close();//关闭当前连线
        this.jsonConnect(obj_);
    }

    /**
     * 在线更改
     * @param obj_
     */
    this.onlineChange=function(obj_){
        var sprite_=this.getSpriteObject(obj_.name);
        var enabled_=false;
        if(sprite_){
            obj_.status==0?enabled_=false:enabled_=true;
            sprite_.setEnabled(enabled_);
        }
    }

    /**
     * ·µ»ØÒ»¸ö A ÓÐ  BÃ»ÓÐµÄÊý×é
     * @param a_
     * @param b_
     */
    this.compareAry=function(a_,b_){
        var itemAry_=[];
        var ai_=0,al_,bi_= 0,bl_=0;
        var al_=a_.length;
        bl_= b_.length;
        var itema_,itemb_;
        var enabled=true;//²»´æÔÚ?
        for(ai_=0;ai_<al_;ai_++){
            itema_=a_[ai_];

            enabled=true;//²»´æÔÚ

            //ÔÚBÖÐ¼ìË÷ A item
            for(bi_=0;bi_<bl_;bi_++){
                itemb_=b_[bi_];
                if(this.compareItem(itema_,itemb_)){
                    enabled=false;//´æÔÚ
                }
            }
            if(enabled)itemAry_.push(itema_);//  bÖÐ²»´æÔÚ
        }
        return itemAry_;
    }

    this.parseTopoFun=function(json_){//½âÎö

        scope.historyTopo=scope.newTopo;//°Ñµ±Ç°ÖÃÎªÀúÊ·
        //scope.newTopo=json_.node;
        scope.newTopo=json_;

        var connectAry=[]//ÐèÒªÁ¬½ÓµÄ
        var closeAry=[]//ÐèÒª¹Ø±ÕµÄ

        connectAry=scope.compareAry(scope.newTopo,scope.historyTopo);
        closeAry=scope.compareAry(scope.historyTopo,scope.newTopo);

        var i_=0;
        var l_=connectAry.length;
        var obj=null;

        //Á¬½Ó
        for(i_=0;i_<l_;i_++){
            obj=connectAry[i_];
            scope.jsonConnect(obj);
        }

        //¹Ø±Õ
        var l_=closeAry.length;
        for(i_=0;i_<l_;i_++){
            obj=closeAry[i_];
            scope.jsonCloseLine(obj);
        }

    }

    this.loadTopoData=function(url_){
        $.ajax({
            url: url_,
            dataType: "json",
            async: true,
            type: "GET",
            success:scope.parseTopoFun
        });

    }

    this.parseOnlineData=function(json_){
        //scope.onlineDevices=json_.online;
        scope.onlineDevices=json_;
        scope.onlineDeviceShow();
    }

    this.requestOnlineData=function(url_){
        $.ajax({
            url: url_,
            dataType: "json",
            async: true,
            type: "GET",
            success:scope.parseOnlineData
        });
    }
}
HCC_LIGHTS.LineManager.prototype={

    init:function(holder_,sprites_){
        this.holder=holder_;//ÈÝÆ÷
        this.starSpriteList=sprites_;//½ÚµãÁÐ±í
        this.enabled=true;//³õÊ¼»¯³É¹¦
    },
    /**
     * 更改灯光亮度
     * @param  {[type]} name_      [description]
     * @param  {[type]} intensity_ [description]
     * @return {[type]}            [description]
     */
    //controlsBrightness:function(name_,intensity_,lock_){
    controlsBrightness:function(name_,lock_){
        var starObj_=this.getSpriteObject(name_);
        if(!starObj_)return;
        //if(lock_)starObj_.controlBrightness(intensity_);
        if(lock_)starObj_.controlBrightness();
        else starObj_.openBrightness();

    }
    ,

    /**     * ¸üÐÂÔÚÏßÉè±¸     */
    onlineDeviceShow:function(){
        var i_= 0,l_=this.starSpriteList.length;
        var obj_=null,enabled=false;
        for(i_=0;i_<l_;i_++){
            obj_=this.starSpriteList[i_];
            if(!obj_)return;
            enabled=this.onlineJudge(obj_.starName);
            obj_.setEnabled(enabled);
            if(!enabled){//ÀëÏßÉè±¸ ¹Ø±ÕÏÔÊ¾
                this.starClose(obj_);
            }

        }

    },
    /**     * ÅÐ¶Ï¸ÃÉè±¸ÊÇ·ñÔÚÏß     */
    onlineJudge:function(name_){
        if(this.onlineDevices.indexOf(name_)!=-1)return true;
        return false;
    },
    /**     * json Êý¾ÝÁ¬½Ó     */
    jsonConnect:function(obj_){
        var sprite_=this.getSpriteObject(obj_.name);
        var sprite_2=this.getSpriteObject(obj_.parent);

        console.log("connect:"+obj_.name+":"+obj_.parent);
        if(!sprite_||!sprite_2)return;
        this.lineConnect(sprite_,sprite_2);//Á¬½ÓÄ¿±ê
    },

    /**     * json Êý¾Ý¹Ø±ÕÖ¸¶¨Á¬Ïß     */
    jsonCloseLine:function(obj_){
        var i_= 0,l_=this.lineList.length,tempLine_=null;
        for(i_=0;i_<l_;i_++){
            tempLine_=this.lineList[i_];
            if(!tempLine_)continue;
            if(tempLine_.judegeName(obj_.node,obj_.parent)){
                tempLine_.initObject.amp--;// ¼õÐ¡ÁÁµãÔö·ù
                tempLine_.endObject.amp--;// ¼õÐ¡ÁÁµãÔö·ù
                console.log("close:"+obj_.node+":"+obj_.parent);
                tempLine_.close();
            }
        }
    },

    /**     * Á¬½ÓÁ½¸öÐÇµã     * @param starSprite_     * @param endSprite_     */
    lineConnect:function(starSprite_,endSprite_){

        if(this.judgeConnect(starSprite_,endSprite_))return null;//Á¬Ïß´æÔÚ
        if(starSprite_.enabled==false||endSprite_.enabled==false){

            starSprite_;

            return;
        }

        console.log("connect success!");


        starSprite_.amp++;//Ôö·ù
        endSprite_.amp++;//Ôö·ù

        var line= new HCC_LIGHTS.CurveAni();
        //var line= new HCC_LIGHTS.LineAni();
        line.show(starSprite_,endSprite_);
        this.lineList.push(line);
        line.startAni();
        this.holder.add(line.line);
        return line;
    },
    /**     * ¹Ø±Õ¸ÃÐÇËùÓÐÁ¬Ïß     * @param sprite_     */
    starClose:function(sprite_){
        var i_= 0,l_=this.lineList.length,tempLine_=null;
        for(i_=0;i_<l_;i_++){
            tempLine_=this.lineList[i_];
            if(!tempLine_)continue;
            if(tempLine_.judge(sprite_)){
                tempLine_.close();
                sprite_.amp=1;//Ôö·ùÖØÖÃ
            }
        }
    },
    /**     * 获取指定节点连线     * @param name_     */
    getSpriteLine:function(name_){
        var sprite_=this.getSpriteObject(name_);
        if(!sprite_)return null;

        var i_= 0,l_=this.lineList.length,tempLine_=null;
        for(i_=0;i_<l_;i_++){
            tempLine_=this.lineList[i_];
            if(!tempLine_)continue;
            if(tempLine_.initObject==sprite_){
                return tempLine_;
            }
        }
        return null;

    },
    /**     * ÅÐ¶ÏÁ½ÐÇÁ¬ÏßÊÇ·ñ´æÔÚ     */
    judgeConnect:function(s_,e_){
        var i_= 0,l_=this.lineList.length,tempLine_=null;
        for(i_=0;i_<l_;i_++){
            tempLine_=this.lineList[i_];
            if(!tempLine_)continue;
            if(tempLine_.judgeSprite(s_,e_)){
                return true;
            }
        }
        return false;
    },
    //¸ù¾ÝÃû×Ö·µ»ØÖ¸¶¨¶ÔÏó
    getSpriteObject:function(name_){
        var i_=0;
        var l_=this.starSpriteList.length;
        var obj_=null;
        for(i_=0;i_<l_;i_++){
            obj_=this.starSpriteList[i_];
            if(!obj_)continue;

            if(obj_.starName==name_){
                return obj_;
            }
        }
        return null;
    },
    update:function(){
        var i_= 0,l_=this.lineList.length,obj=null;
        for(i_=0;i_<l_;i_++){
            obj=this.lineList[i_];
            if(obj.life){
                obj.update();
            }else{
                //console.log("delete null");
                this.lineList.splice(i_,1);
                i_--;
                l_--;
                continue;
            }

        }
    }

}
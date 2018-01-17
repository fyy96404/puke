$(function () {
    let color=['c','d','h','s'];
    let poke=[];
    let flag={};
    while(poke.length<52){
        let hua=color[Math.floor(Math.random()*color.length)];
        let num=Math.floor(Math.random()*13+1);

        if(!flag[`${hua},${num}`]){
            poke.push({hua,num});
            flag[`${hua},${num}`]=true;
        }
    }
    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let left=300-50*i+100*j,
                top=50*i;
            $('<div>').addClass('poke').css('background-image',`url(img/${poke[index].num}${poke[index].hua}.jpg)`)
                .data('num',poke[index].num)
                .attr('id',`${i}_${j}`)
                .appendTo('.box')
                .delay(index*10)
                .animate({top,left});
            index++
        }
    }
    for(;index<poke.length;index++){
        $('<div>').addClass('poke zuo').css('background-image',`url(img/${poke[index].num}${poke[index].hua}.jpg)`)
            .data('num',poke[index].num)
            .attr('id',`${-2}_${-2}`)
            .appendTo('.box')
            .delay(index*10)
            .animate({left:0,top:450})
    }

    let first=null;
    $('.poke').on('click',function (e) {
        let element=$(e.target);
        //判断是否压住
        let ids=element.attr('id').split('_');
        let ele1=`#${ids[0]*1+1}_${ids[1]*1}`;
        let ele2=`#${ids[0]*1+1}_${ids[1]*1+1}`;
        if($(ele1).length || $(ele2).length){
            return
        }
        //抬起牌
    element.toggleClass('active');
        if(element.hasClass('active')){
            element.animate({top:'-=10'})
        }else{
            element.animate({top:'+=10'})
        }

        if(!first){
            first=element;

        }else{

          if(first.data('num')+element.data('num')==14){
              $('.active').animate({top:0,left:600},function () {
                  $(this).remove()
              })
          }else{
              $('.active').animate({top:'+=10'},function () {
                  $(this).removeClass('active')
              })

          }
          first=null
        }
    })
//按钮点击
let z=0;
    $('.btnr').on('click',function () {
        if(!$('.zuo').length){return}
        $('.zuo').last().css('zIndex',z++).removeClass('zuo').addClass('you').animate({left:600})
    })

    $('.btnl').on('click',function () {
        if(!$('.you').length){return}
        $('.you').each(function (index){
            let zIndex=z++;
            $(this).removeClass('you').addClass('zuo').delay(index*60).animate({left:0,zIndex:zIndex})
    })
})
})
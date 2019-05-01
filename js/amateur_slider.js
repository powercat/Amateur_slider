let amateur_slider = function({slider_user_ele,max_width_setup,width_setup,slider_btn_bool,slider_pager_bool,slider_auto_time_setup,slider_speed_setup,slider_mouse_bool,slider_touch_bool}){
    let slider_btn_boolean = true,
        slider_pager_boolean = true,
        slider_auto_time = 10000,
        slider_speed = 500,
        slider_speed2 = 0.5,
        slider_mouse_boolean = true,
        slider_touch_boolean = true;
    if(slider_btn_bool===false){
        slider_btn_boolean = false;
    }
    if(slider_pager_bool===false){
        slider_pager_boolean = false;
    }
    if(slider_mouse_bool===false){
        slider_mouse_boolean = false;
    }
    if(slider_touch_bool===false){
        slider_touch_boolean = false;
    }
    if(slider_auto_time_setup){
        slider_auto_time=slider_auto_time_setup;
    }
    if(slider_speed_setup){
        slider_speed=slider_speed_setup;
        slider_speed2=slider_speed_setup*0.001;
    }
    document.addEventListener('DOMContentLoaded',function(){
        /*-----------------------slider------------------------*/
        const user_html_ele = document.querySelector(slider_user_ele),
              slider = user_html_ele.querySelector('.slider_img'),
              slider_li = slider.querySelectorAll('li'),
              slider_pager = document.createElement('ul'),
              body_ele = document.body;
        user_html_ele.classList.add('amateur_slider');
        slider_pager.classList.add('slider_pager');
        let slider_width=0,
            slider_pager_html="",
            slider_li_copy=[],
            slider_li_width,
            slider_btn = document.createElement('ul');
        if(slider_btn_boolean){
            slider_btn.classList.add('slider_btn');
            slider_btn.innerHTML = '<li><a href="#" class="prev_btn">prev</a></li><li><a href="#" class="next_btn">next</a></li>';
            user_html_ele.appendChild(slider_btn);
        }
        let width_size_function = function(max_width_setup){
            let max_width;
            if(max_width_setup){
                max_width = max_width_setup;
            }else{
                slider_li_width = body_ele.clientWidth;
                user_html_ele.style.width=body_ele.clientWidth+"px";
                slider_btn.style.width=body_ele.clientWidth+"px";
                slider_btn.style.marginLeft=-(body_ele.clientWidth/2)+"px";
                return;
            }
            if(innerWidth<=max_width){
                slider_li_width = body_ele.clientWidth;
                user_html_ele.style.width=body_ele.clientWidth+"px";
                slider_btn.style.width=body_ele.clientWidth+"px";
                slider_btn.style.marginLeft=-(body_ele.clientWidth/2)+"px";
            }else{
                if(width_setup){
                    slider_li_width = width_setup;
                    user_html_ele.style.width=width_setup+"px";
                    slider_btn.style.width=width_setup+"px";
                    slider_btn.style.marginLeft=-(width_setup/2)+"px";
                }else{
                    slider_li_width = max_width;
                    user_html_ele.style.width=max_width+"px";
                    slider_btn.style.width=max_width+"px";
                    slider_btn.style.marginLeft=-(max_width/2)+"px";
                }
            }
        }
        width_size_function(max_width_setup);
        for(let i=0; i<slider_li.length*2; i++){
            slider_li_copy[i] = document.createElement('li');
            if(i>=slider_li.length){
                slider_li_copy[i].innerHTML = slider_li[i-slider_li.length].innerHTML;
            }else{
                slider_li_copy[i].innerHTML = slider_li[i].innerHTML;

            }
            slider.appendChild(slider_li_copy[i]);
            slider_li_copy[i].style.width = slider_li_width+"px";
        }
        for(let i=0; i<slider_li.length; i++){
            slider_li[i].style.width=slider_li_width+"px";
            if(slider_pager_boolean){
                slider_pager_html+='<li><a href="#">'+(i+1)+'</a></li>'
            }
        }
        if(slider_pager_boolean){
            slider_pager.innerHTML=slider_pager_html;
        }
        slider_width = slider_li_width*(slider_li.length*3);
        slider.style.width=slider_width+"px";
        slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
        let resize_load_function = function(){
            width_size_function(max_width_setup);
            slider_width=0;
            slider_width = slider_li_width*(slider_li.length*3);
            for(let i=0; i<slider_li.length; i++){
                slider_li[i].style.width=slider_li_width+"px";
            }
            for(let i=0; i<slider_li_copy.length; i++){
                slider_li_copy[i].style.width = slider_li_width+"px";
            }
            slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
            slider.style.width=slider_width+"px";
        }
        if(slider_pager_boolean){
            user_html_ele.appendChild(slider_pager);
        }
        window.addEventListener('resize',resize_load_function,false);
        window.addEventListener('load',resize_load_function,false);
        const slider_pager_li = user_html_ele.querySelectorAll('.slider_pager li');
        if(slider_pager_boolean){
            slider_pager_li[0].classList.add('on');
        }
        /*--------------------slider_next_prev-------------------*/
        let new_slider_li = slider.querySelectorAll('li'),
            slider_delay = false,
            slider_num = 0,
            slider_next = function(){
                if(slider_delay){
                    return;
                }
                if(slider_pager_boolean){
                    slider_pager_li[slider_num].classList.remove('on');
                }
                slider_num++;
                if(slider_num>slider_li.length-1){
                    slider_num=0;
                }   
                if(slider_pager_boolean){
                    slider_pager_li[slider_num].classList.add('on');
                }
                slider_delay=true;
                slider.style.transition = "all "+slider_speed2+"s";
                slider.style.transform = "translateX("+-slider_li_width*(slider_li.length+1)+"px)";
                setTimeout(function(){
                    slider.style.transition = "";
                    slider.insertBefore(new_slider_li[0],new_slider_li[new_slider_li.length]);
                    slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
                    new_slider_li = slider.querySelectorAll('li');
                    slider_delay=false;
                },slider_speed);
            },
            slider_prev = function(){
                if(slider_delay){
                    return;
                }
                if(slider_pager_boolean){
                    slider_pager_li[slider_num].classList.remove('on');
                }
                slider_num--;
                if(slider_num<0){
                    slider_num=slider_li.length-1;
                }
                if(slider_pager_boolean){
                    slider_pager_li[slider_num].classList.add('on');
                }
                slider_delay=true;
                slider.style.transition = "all "+slider_speed2+"s";
                slider.style.transform = "translateX("+-slider_li_width*(slider_li.length-1)+"px)";
                setTimeout(function(){
                    slider.style.transition = "";
                    slider.insertBefore(new_slider_li[new_slider_li.length-1],new_slider_li[0]);
                    slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
                    new_slider_li = slider.querySelectorAll('li');
                    slider_delay=false;
                },slider_speed);
            },
            slider_cancel = function(){
                if(slider_delay){
                    return;
                }
                slider_delay=true;
                slider.style.transition = "all "+slider_speed2+"s";
                slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
                setTimeout(function(){
                    slider.style.transition = "";
                    slider_delay=false;
                },slider_speed);
            }
        /*-----------------slider_btn------------------*/
        if(slider_btn_boolean){
            const slider_btn_next = slider_btn.querySelector('.next_btn'),
                  slider_btn_prev = slider_btn.querySelector('.prev_btn');
            slider_btn_next.addEventListener('click',function(e){
                e.preventDefault();
                clearInterval(slider_auto);
                slider_auto = setInterval(slider_next,slider_auto_time);
                slider_next();
            },false)
            slider_btn_prev.addEventListener('click',function(e){
                e.preventDefault();
                clearInterval(slider_auto);
                slider_auto = setInterval(slider_next,slider_auto_time);
                slider_prev();
            },false)
            slider_btn_next.addEventListener('dragstart',function(e){
                e.preventDefault();
            })
            slider_btn_prev.addEventListener('dragstart',function(e){
                e.preventDefault();
            })
        }
        /*-----------------slider_pager--------------*/
        if(slider_pager_boolean){
            for(let i=0; i<slider_pager_li.length; i++){
                (function(i){
                    slider_pager_li[i].addEventListener('dragstart',function(e){
                        e.preventDefault();
                    })
                    slider_pager_li[i].addEventListener('click',function(e){
                        e.preventDefault();
                        clearInterval(slider_auto);
                        slider_auto = setInterval(slider_next,slider_auto_time);
                        if(slider_delay||slider_num==i){
                            return;
                        }
                        slider_pager_li[slider_num].classList.remove('on');
                        let slider_history = slider_num;
                        slider_num=i;
                        slider_pager_li[slider_num].classList.add('on');
                        let slider_calc = slider_num-slider_history,
                            slider_calc_2 = Math.abs(slider_calc);
                        slider_delay=true;
                        slider.style.transition = "all "+slider_speed2+"s";
                        if(slider_num<slider_history){
                            slider.style.transform = "translateX("+-slider_li_width*(slider_li.length-slider_calc_2)+"px)";
                        }
                        if(slider_num>slider_history){
                            slider.style.transform = "translateX("+-slider_li_width*(slider_li.length+slider_calc)+"px)";
                        }
                        setTimeout(function(){
                            slider.style.transition = "";
                            if(slider_num<slider_history){
                                for(let m=slider_calc; m<0; m++){
                                    slider.insertBefore(new_slider_li[new_slider_li.length+m],new_slider_li[0]);
                                }
                            }
                            if(slider_num>slider_history){
                                for(let m=0; m<slider_calc; m++){
                                    slider.insertBefore(new_slider_li[0+m],new_slider_li[new_slider_li.length]);
                                }
                            }
                            slider.style.transform = "translateX("+-slider_li_width*slider_li.length+"px)";
                            new_slider_li = slider.querySelectorAll('li');
                            slider_delay=false;
                        },slider_speed);
                    },false);
                })(i);
            }
        }
        /*-----------------slider_touch------------------*/
        let slider_pointer_x,
            slider_pointer_x_now,
            slider_auto = setInterval(slider_next,slider_auto_time),
            slider_auto_bool = true;
        if(slider_touch_boolean){
            slider.addEventListener("touchstart",function(e){
                slider_pointer_x=e.targetTouches[0].clientX;
                if(slider_auto_bool){
                    clearInterval(slider_auto);
                    slider_auto_bool=false;
                }
            },{passive:true},false);
            slider.addEventListener("touchmove",function(e){
                slider_pointer_x_now=e.targetTouches[0].clientX;
                let slider_calc_1 = -slider_li_width*slider_li.length;
                let slider_calc_2 = slider_pointer_x-slider_pointer_x_now;
                slider.style.transform ="translateX("+(slider_calc_1-slider_calc_2)+"px)";
            },{passive:true},false);
            slider.addEventListener("touchend",function(e){
                if(!slider_auto_bool){
                    slider_auto = setInterval(slider_next,slider_auto_time);
                    slider_auto_bool=true;
                }
                if(slider_pointer_x_now){
                    if(slider_pointer_x+60<slider_pointer_x_now){
                        slider_prev();
                        slider_pointer_x_now=null;
                        return;
                    }
                    if(slider_pointer_x>slider_pointer_x_now+60){
                        slider_next();
                        slider_pointer_x_now=null;
                        return;
                    }
                }
                slider_cancel();
            },false);
        }
        /*------------------slider_mouse--------------------*/
        if(slider_mouse_boolean){
            let pointer_on = function(){
                slider_btn.style.pointerEvents="";
                slider_pager.style.pointerEvents="";
            },
                pointer_off = function(){
                    slider_btn.style.pointerEvents="none";
                    slider_pager.style.pointerEvents="none";
                },
                mouse_down_bool = false,
                mouse_drag_bool = false;
            slider.addEventListener("dragstart",function(e){
                mouse_drag_bool=true;
                pointer_off();
                e.preventDefault();
            })
            slider.addEventListener("click",function(e){
                if(mouse_drag_bool){
                    mouse_drag_bool=false;
                    e.preventDefault();
                }
            })
            slider.addEventListener("mousedown",function(e){
                mouse_down_bool=true;
                slider_pointer_x=e.clientX;
                if(slider_auto_bool){
                    clearInterval(slider_auto);
                    slider_auto_bool=false;
                }
            },false);
            slider.addEventListener("mousemove",function(e){
                if(mouse_down_bool){
                    slider_pointer_x_now=e.clientX;
                    let slider_calc_1 = -slider_li_width*slider_li.length;
                    let slider_calc_2 = slider_pointer_x-slider_pointer_x_now;
                    slider.style.transform ="translateX("+(slider_calc_1-slider_calc_2)+"px)";
                }
            },false);
            let mouse_end = function(e){
                pointer_on();
                mouse_down_bool=false;
                if(!slider_auto_bool){
                    slider_auto = setInterval(slider_next,slider_auto_time);
                    slider_auto_bool=true;
                }
                if(slider_pointer_x_now){
                    if(slider_pointer_x+60<slider_pointer_x_now){
                        e.preventDefault();
                        slider_prev();
                        slider_pointer_x_now=null;
                        return;
                    }
                    if(slider_pointer_x>slider_pointer_x_now+60){
                        e.preventDefault();
                        slider_next();
                        slider_pointer_x_now=null;
                        return;
                    }
                }
                if(mouse_drag_bool){
                    slider_cancel();
                }
            }
            slider.addEventListener("mouseout",mouse_end,false);
            slider.addEventListener("mouseup",mouse_end,false);
        }
        /*---------------------------------------------------------*/
    },false)
}
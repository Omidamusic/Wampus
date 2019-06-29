//در داخل این فایل نوع ها و کلاس هایمان را تعریف میکنیم
function Rule(locationrow , locationcolumn , signal , boolean)
{
    this.locationrow = locationrow
    this.signal = signal
    //"BREEZE","STENCH","PIT","WAMPUS","GOLD","GLOW","OK"
    this.boolean = boolean
    this.locationcolumn = locationcolumn
    //این نوع یک قانون است که لوکیشن محلی روی نقشه ی بازی است و سیگنال نوع سیگنال دریافت شده از آنجاست
    //و در نهایت بولین تعیین میکند که  این قانون درست است یا خیر
}
function State(i , j )
{
    //  این نوع همان استیت است که مکان ایجنت مارا در خود نگهداری میکند و همچنین  میتواند اکشن های قابل قبول برای ایجنت را برگرداند
    this.row = i
    this.column = j
    this.Actions = function ()
    {
        
        //در این تابع فقط اکشن های عقلانی با توجه به نالج بیس و پرسپشن برگردانده میشود
        Inference_For_Near_Cells(this)
        // از اینجا به بعد یا یکی از خانه های اراف اوکی میشود و یا ومپوس است
        var list_of_available_actions = []
        for(var i = 0 ;i<knowledgebase.length;i++)
        {
             //این شرط برای گرب کردن طلاست
             if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation -1)%size ))
             {
                 
              
                 
                 if(knowledgebase[i].signal == "GOLD")
                 {
                     list_of_available_actions[list_of_available_actions.length] = new Action("GRAB")
                 }
              
                 
             }
            //این شرط برای اوکی بودن خانه ی سمت راست است
            if(knowledgebase[i].locationrow == Math.floor((playerlocation  -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation+1-1)%size ))
            {
                
                //به کشتن ومپوس اولویت بیشتری میدهیم
                if(knowledgebase[i].signal == "WAMPUS" && !wampuskilled)
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("SHOOTRIGHT")
                }
                //وجود طلا در خانه های کناری را بعد ا کشتن ومپوس اولویت میدهیم
                if(knowledgebase[i].signal == "GOLD")
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("GORIGHT")
                }
             
                
            }
            //این شرط برای اوکی بودن خانه ی چپ است
            if(knowledgebase[i].locationrow == Math.floor((playerlocation  -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1-1)%size ))
            {
                
                //به کشتن ومپوس اولویت بیشتری میدهیم
                if(knowledgebase[i].signal == "WAMPUS" && !wampuskilled)
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("SHOOTLEFT")
                }
                //وجود طلا در خانه های کناری را بعد ا کشتن ومپوس اولویت میدهیم
                if(knowledgebase[i].signal == "GOLD")
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("GOLEFT")
                }
             
                
            }
            //این شرط برای اوکی بودن خانه ی پایین است
            if(knowledgebase[i].locationrow == Math.floor((playerlocation +size -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1)%size ))
            {
                
                //به کشتن ومپوس اولویت بیشتری میدهیم
                if(knowledgebase[i].signal == "WAMPUS" && !wampuskilled )
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("SHOOTDOWN")
                }
                //وجود طلا در خانه های کناری را بعد ا کشتن ومپوس اولویت میدهیم
                if(knowledgebase[i].signal == "GOLD")
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("GODOWN")
                }
             
                
            }
            //این شرط برای اوکی بودن خانه ی بالایی است
            if(knowledgebase[i].locationrow == Math.floor((playerlocation -size -1)/size) && knowledgebase[i].locationcolumn ==Math.floor( (playerlocation-1)%size ))
            {
                
                //به کشتن ومپوس اولویت بیشتری میدهیم
                if(knowledgebase[i].signal == "WAMPUS" && !wampuskilled)
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("SHOOTUP")
                }
                //وجود طلا در خانه های کناری را بعد ا کشتن ومپوس اولویت میدهیم
                if(knowledgebase[i].signal == "GOLD")
                {
                    list_of_available_actions[list_of_available_actions.length] = new Action("GOUP")
                }
             
                
            }
           

        }
        if(list_of_available_actions.length == 0)
        {
            for(var i = 0; i<knowledgebase.length;i++)
            {
             //اگر هنوز اکشنی برای انجام وجود نداشته باشد و در خانه ی اوکی قرار داشته باشیم به جایی میرویم که هنوز پرسپت نشده است
        if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation -1)%size ))
        {
            
         
            //Right
            if(knowledgebase[i].signal == "OK" && !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1) && knowledgebase[i].locationcolumn!=size -1 && playerlocation%size !=0)
            {
                list_of_available_actions[list_of_available_actions.length] = new Action("GORIGHT")
            }
            //Left
            if(knowledgebase[i].signal == "OK" && !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn-1) && knowledgebase[i].locationcolumn!=0  && playerlocation % size != 1)
            {
                list_of_available_actions[list_of_available_actions.length] = new Action("GOLEFT")
            }
            //Up
            if(knowledgebase[i].signal == "OK" && !IsPercepted(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn) && knowledgebase[i].locationrow!=0 && playerlocation/size>1)
            {
                list_of_available_actions[list_of_available_actions.length] = new Action("GOUP")
            }
            //Down
            if(knowledgebase[i].signal == "OK" && !IsPercepted(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn) && knowledgebase.locationrow !=size -1 && Math.floor(playerlocation-1/size) < size-1 )
            {
                list_of_available_actions[list_of_available_actions.length] = new Action("GODOWN")
            }
         
            
        }
    }
}
        if(list_of_available_actions.length == 0)
        {
            //رسیدن به اینجا به این معنی است که ومپوس و طلا در اطراف وجود ندارد
            //اولویت را به خانه های اوکی میدهیم
            for(var i = 0; i<knowledgebase.length;i++)
            {
                if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation +1-1)%size)&& !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn) && knowledgebase[i].signal == "OK" && playerlocation%size !=0 )
                     list_of_available_actions[list_of_available_actions.length] = new Action("GORIGHT")
                     if(knowledgebase[i].locationrow == Math.floor((playerlocation -size -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1)%size) &&  !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn) && knowledgebase[i].signal == "OK" && playerlocation/size>1)
                     list_of_available_actions[list_of_available_actions.length] = new Action("GOUP")    
                     if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1-1)%size) &&  !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn) && knowledgebase[i].signal == "OK" && playerlocation % size != 1)
                     list_of_available_actions[list_of_available_actions.length] = new Action("GOLEFT")    
                     if(knowledgebase[i].locationrow == Math.floor((playerlocation +size -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1)%size ) && !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn)&&  knowledgebase[i].signal == "OK" && Math.floor(playerlocation-1/size) < size-1 )
                     list_of_available_actions[list_of_available_actions.length] = new Action("GODOWN")          
                
            }
        }
        
        if(list_of_available_actions.length == 0)
        {
            //رسیدن به اینجا به این معنی است که در اطراف خانه ی اوکی هم نداریم پس اولویت را به خانه هایی که در آن ها بریز و استنچ است میدهیم
            //اولویت را به خانه های اوکی میدهیم
            for(var i = 0; i<knowledgebase.length;i++)
            {
                if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation +1-1)%size) && !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn) &&(knowledgebase[i].signal == "BREEZE" || knowledgebase.signal == "STENCH"))
                     list_of_available_actions[list_of_available_actions.length] = new Action("GORIGHT")
                     if(knowledgebase[i].locationrow == Math.floor((playerlocation -size -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1)%size) && !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn) && (knowledgebase[i].signal == "BREEZE" || knowledgebase.signal == "STENCH"))
                     list_of_available_actions[list_of_available_actions.length] = new Action("GOUP")    
                     if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1-1)%size) && !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn) && (knowledgebase[i].signal == "BREEZE" || knowledgebase.signal == "STENCH"))
                     list_of_available_actions[list_of_available_actions.length] = new Action("GOLEFT")    
                     if(knowledgebase[i].locationrow == Math.floor((playerlocation +size -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1)%size) && !IsPercepted(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn) && (knowledgebase[i].signal == "BREEZE" || knowledgebase.signal == "STENCH"))
                     list_of_available_actions[list_of_available_actions.length] = new Action("GODOWN")          
                
            }
        }
     
        if(list_of_available_actions.length == 0)
        {
            var prevstate = prevstates.pop()
           //اگر هنوز اکشنی انتخاب نشده باشد به حالت قبلی برگرد
          if(prevstate.row == Math.floor((playerlocation -1)/size) && prevstate.column == Math.floor((playerlocation +1-1)%size))
          list_of_available_actions[list_of_available_actions.length] = new Action("GORIGHT")
          if(prevstate.row == Math.floor((playerlocation -size -1)/size) && prevstate.column ==  Math.floor((playerlocation-1)%size))
          list_of_available_actions[list_of_available_actions.length] = new Action("GOUP")   
          if(prevstate.row == Math.floor((playerlocation -1)/size) && prevstate.column == Math.floor((playerlocation -1-1)%size))
          list_of_available_actions[list_of_available_actions.length] = new Action("GOLEFT")
          if(prevstate.row == Math.floor((playerlocation +size -1)/size) && prevstate.column ==  Math.floor((playerlocation-1)%size))
          list_of_available_actions[list_of_available_actions.length] = new Action("GODOWN")  
          shouldpush = false 
        }
       //console.log(list_of_available_actions)
       if(list_of_available_actions.length == 0)
       {
           //رسیدن به اینجا به این معنی است که ومپوس و طلا در اطراف وجود ندارد
           //اولویت را به خانه های اوکی میدهیم
           for(var i = 0; i<knowledgebase.length;i++)
           {
               if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation +1-1)%size)&& knowledgebase[i].signal == "OK" && playerlocation%size !=0 )
                    list_of_available_actions[list_of_available_actions.length] = new Action("GORIGHT")
                    if(knowledgebase[i].locationrow == Math.floor((playerlocation -size -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1)%size)  && knowledgebase[i].signal == "OK" && playerlocation/size>1)
                    list_of_available_actions[list_of_available_actions.length] = new Action("GOUP")    
                    if(knowledgebase[i].locationrow == Math.floor((playerlocation -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1-1)%size)  && knowledgebase[i].signal == "OK" && playerlocation % size != 1)
                    list_of_available_actions[list_of_available_actions.length] = new Action("GOLEFT")    
                    if(knowledgebase[i].locationrow == Math.floor((playerlocation +size -1)/size) && knowledgebase[i].locationcolumn == Math.floor((playerlocation-1)%size ) &&  knowledgebase[i].signal == "OK" && Math.floor(playerlocation-1/size) < size-1 )
                    list_of_available_actions[list_of_available_actions.length] = new Action("GODOWN")          
               
           }
       }
       //اگر به اینجا رسیده باشیم و اکشنی در لیست قرار نگرفته باشد به معنی شکست است

      availableactions =  list_of_available_actions
       

    }
}
function Action(type)
{
    //تایپ یک استرینگ است 
    this.type = type
    //"GOLEFT","GORIGHT","GOUP","GODOWN","SHOOTUP","SHOOTRIGHT","SHOOTLEFT","SHOOTDOWN","GRAB"
    //تایپ میتواند یکی از استرینگ های بالا باشد
}
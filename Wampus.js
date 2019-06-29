


//توابع اصلیبرنامه در این قسمت پیاده سازی شده اند
 function startgame()
{
    
    //با کلیک شدن بر روی start game
    //این تابع اجرا میشود
    // این قسمت باعث ایجاد وقفه میشود تا بوانیم نتیجه را ببینیم
   var se = setInterval(function ()
    {
        var gameinprogress
        
        
        
            document.getElementById("GamePad").innerHTML = "" // اول گیم پد را خالی میکنیم تا حرکت را انجام دهیم و بعد دوباره آن را رسم میکنیم
            var row = Math.floor((playerlocation - 1)/ size )//از صفر تا سایز
            var column = Math.floor((playerlocation -1) % size) // از صفر تا سایز
            var state = new State(row , column)
             // در استیت فعلی یک حرکت انجام میدهیم
            gameinprogress = Make_A_Move(state)
            //console.log(gameinprogress)
            // در این قسمت به لیست استیت های قبلی این استیت را اگر باید اضافه میکنیم
            if(shouldpush)
            prevstates.push(state)
            else shouldpush = true;
            // console.log("the knowledgebase:")
            // console.log(knowledgebase)

           //حرکت انجام شده است زمین بازی را رسم میکنیم
            DrawWampusGamePad()
            //چک کردن برای پایان بازی
        if(!gameinprogress || gamefinished)
        {
        clearInterval(se)
        console.log(knowledgebase)
        
        }
    },500)

    

    
        
    
    
 
}






  function Make_A_Move(state)
  {
      if(gamefinished)
      {
          alert("WON THE GAME!")
          return false
      }
      //ابتدا مکانی را که در آن هستیم پرسپت میکنیم
      Percept(state)
     
     state.Actions()
     var listofactions = availableactions
     availableactions = null
    //console.log(listofactions)
    if(listofactions.length!=0)
    {
        Do_Action(listofactions[0])
        return true;
    }
    else{
        return false;
    }
  }
  function Percept(state)
  {
      percepted[percepted.length] = state;
      var isok = true
    for(var i=0;i<breezelocations.length;i++)
    {
        if(Math.floor((breezelocations[i] -1) / size )== state.row && Math.floor((breezelocations[i] -1) % size )== state.column)
        {
            //یک قانون جدید به نالج بیس اضافه میکنیم
            var rule = new Rule(state.row,state.column,"BREEZE",true)
            knowledgebase[knowledgebase.length] = rule
            isok = false
            document.getElementById("status").innerHTML="STATUS:BREEZE"
            
        }
        if(Math.floor((stenchlocations[i] -1) / size )== state.row && Math.floor((stenchlocations[i] -1) % size )== state.column)
        {
            //یک قانون جدید به نالج بیس اضافه میکنیم
            var rule = new Rule(state.row,state.column,"STENCH",true)
            knowledgebase[knowledgebase.length] = rule
            isok = false
            document.getElementById("status").innerHTML="STATUS:STENCH"
            
        }
        if(Math.floor((glowlocations[i] -1) / size )== state.row && Math.floor((glowlocations[i] -1) % size )== state.column)
        {
            //یک قانون جدید به نالج بیس اضافه میکنیم
            var rule = new Rule(state.row,state.column,"GLOW",true)
            knowledgebase[knowledgebase.length] = rule
            isok = false
            document.getElementById("status").innerHTML="STATUS:GLOW"
        }
        if(Math.floor((goldlocation -1) / size )== state.row && Math.floor((goldlocation -1) % size )== state.column)
        {
            //یک قانون جدید به نالج بیس اضافه میکنیم
            var rule = new Rule(state.row,state.column,"GOLD",true)
            knowledgebase[knowledgebase.length] = rule
            isok = false
            document.getElementById("status").innerHTML="STATUS:GOLD"
            
        }
    }

    if(isok)
    {
        var rule = new Rule(state.row,state.column,"OK",true)
        knowledgebase[knowledgebase.length] = rule
        isok = false
        document.getElementById("status").innerHTML="STATUS:OK"
    }
  }
  function Do_Action( action)
  {
      //این تابع اکشنی که انتخاب شده است را در هر ایف انجام میدهد
      console.log(action)
    if(action.type == "GORIGHT") //راست
    {
        playerlocation += 1
        document.getElementById("action").innerHTML = "ACTION:GORIGHT"
    }
    if(action.type == "GOLEFT") // چپ
    {
        playerlocation -= 1
        document.getElementById("action").innerHTML = "ACTION:GOLEFT"
    }
    if(action.type == "GOUP") //بالا
    {
        playerlocation -=size
        document.getElementById("action").innerHTML = "ACTION:GOUP"
    }
    if(action.type == "GODOWN") //پایین
    {
        playerlocation += size
        document.getElementById("action").innerHTML = "ACTION:GODOWN"
    }
    if(action.type == "SHOOTRIGHT" && wampuslocation == playerlocation +1)//شلیک به راست
    {
        wampuslocation = NaN
        wampuskilled = true
        alert("WAMPUS DIED")
        RemoveWampusFromKnowledgebase();
        document.getElementById("action").innerHTML = "ACTION:SHOOTRIGHT"
    }
    if(action.type == "SHOOTLEFT" && wampuslocation == playerlocation -1) //شلیک به چپ
    {
        wampuslocation = NaN
        wampuskilled = true
        alert("WAMPUS DIED")
        RemoveWampusFromKnowledgebase();
        document.getElementById("action").innerHTML = "ACTION:SHOOTLEFT"
    }
    if(action.type == "SHOOTUP" && wampuslocation == playerlocation -size)//شلیک به بالا
    {
        wampuslocation = NaN
        wampuskilled = true
        alert("WAMPUS DIED")
        RemoveWampusFromKnowledgebase();
        document.getElementById("action").innerHTML = "ACTION:SHOOTUP"
    }
    if(action.type == "SHOOTDOWN" && wampuslocation == playerlocation +size) //شلیک به پایین
    {
        wampuslocation = NaN
        wampuskilled = true
        alert("WAMPUS DIED")
        RemoveWampusFromKnowledgebase();
        document.getElementById("action").innerHTML = "ACTION:SHOOTDOWN"
    }
    if(action.type == "GRAB" && goldlocation == playerlocation) // گرفتن طلا
    {
        gamefinished = true;
        alert("GOLD GRABED!!!")
        document.getElementById("action").innerHTML = "ACTION:GRAB"
    }
  }

  function Inference_For_Near_Cells(state)
  {
      //تابعی برای نتیجه گیری در خانه های نزدیک
      //ابتدا برای خانه ی سمت راست نتیجه گیری میکنیم
      for(i = 0;i<4;i++)
      {
      var row 
      var column
      if(i == 0 )if(state.column!=size-1) {row=state.row;column=state.column+1} else continue //خانه ی سمت راست
      if(i == 1) if(state.column!=0){row=state.row;column=state.column-1}else continue // خانه ی سمت چپ
      if(i == 2) if(state.row!=size-1){row=state.row+1;column=state.column} // خانه ی پایین
      if(i == 3) if(state.row!=0){row=state.row-1;column=state.column}else continue //خانه ی بالا
      var pitsafe = null
      var wampussafe = null
      var goldsafe = null
      var ispossiblepithere
      var ispossiblewampushere
      var ispossiblegoldhere
      var listofdown = GetRulesIn(row+1,column)
      var listofleft = GetRulesIn(row,column-1)
      var listofup = GetRulesIn(row-1,column)
      var listofright = GetRulesIn(row,column+1)
        // از اینجا به بعد برای خانه ای که انتخاب شده است نتیجه گیری میکنیم که آیا امکان اوکی بودن آن یا وجود ومپوس و طلا در آن وجود دارد یا خیر
        //روند کار طوری است که برای خانه ی انتخابی ابتدا خانه ی پایین با تمام خانه های اطراف چک میشود تا تناقض نداشته باشد و بعد خانه ی چپ با همه چک میشود و الی آخر
      ispossiblepithere = IsRuleBySignalInList("BREEZE",listofdown)
      ispossiblewampushere = IsRuleBySignalInList("STENCH",listofdown)
      ispossiblegoldhere = IsRuleBySignalInList("GLOW",listofdown)
     // console.log("pitpossible "+ispossiblepithere+" wampuspossible "+ispossiblewampushere)
      if(!ispossiblepithere) ispossiblepithere = IsRuleBySignalInList("BREEZE",listofleft)
      else { if(IsPercepted(row,column-1))if(!IsRuleBySignalInList("BREEZE",listofleft) && (row<size && row >=0 && column-1>=0 && column-1<size)) { pitsafe = true } 
      if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("BREEZE",listofright) && (row<size && row >=0 && column+1>=0 && column+1<size)) { pitsafe = true}
      if(IsPercepted(row-1,column))if(!IsRuleBySignalInList("BREEZE",listofup) && (row-1<size && row-1 >=0 && column>=0 && column<size)) { pitsafe = true } 
      if(pitsafe == null ) pitsafe = false
      ispossiblepithere = IsRuleBySignalInList("BREEZE",listofleft)
    }if(!ispossiblewampushere) ispossiblewampushere = IsRuleBySignalInList("STENCH",listofleft)
      else { if(IsPercepted(row,column-1)) if(!IsRuleBySignalInList("STENCH",listofleft) && (row<size && row >=0 && column-1>=0 && column-1<size)) { wampussafe = true } else{ if(IsRuleBySignalInList("STENCH",listofleft)) wampussafe =false}
      if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("STENCH",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { wampussafe = true} else if(IsRuleBySignalInList("STENCH",listofright)) wampussafe = false
      if(IsPercepted(row-1,column))if(!IsRuleBySignalInList("STENCH",listofup)&& (row-1<size && row-1 >=0 && column>=0 && column<size)) { wampussafe = true } else if(IsRuleBySignalInList("STENCH",listofup)) wampussafe = false
     ispossiblewampushere = IsRuleBySignalInList("STENCH",listofleft)
    }if(!ispossiblegoldhere) ispossiblegoldhere = IsRuleBySignalInList("GLOW",listofleft)
      else {   if(IsPercepted(row,column-1))if(!IsRuleBySignalInList("GLOW",listofleft)&& (row<size && row >=0 && column-1>=0 && column-1<size)) { goldsafe = true } else if(IsRuleBySignalInList("GLOW",listofleft)) goldsafe = false
      if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("GLOW",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { goldsafe = true} else if(IsRuleBySignalInList("GLOW",listofright)) goldsafe = false
      if(IsPercepted(row-1,column))if(!IsRuleBySignalInList("GLOW",listofup)&& (row-1<size && row-1 >=0 && column>=0 && column<size)) { goldsafe = true } else if(IsRuleBySignalInList("GLOW",listofup)) goldsafe = false
       ispossiblegoldhere = IsRuleBySignalInList("GLOW",listofleft)
    }//چپ به بالا
        if(!ispossiblepithere) ispossiblepithere = IsRuleBySignalInList("BREEZE",listofup)
        else {   if(IsPercepted(row-1,column))if(!IsRuleBySignalInList("BREEZE",listofup) && (row-1<size && row-1 >=0 && column>=0 && column<size)) { pitsafe = true }
        if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("BREEZE",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { pitsafe = true}
        if(IsPercepted(row+1,column))if(!IsRuleBySignalInList("BREEZE",listofdown)&& (row+1<size && row+1 >=0 && column>=0 && column<size)) { pitsafe = true }
         ispossiblepithere = IsRuleBySignalInList("BREEZE",listofup) }
        if(!ispossiblewampushere) ispossiblewampushere = IsRuleBySignalInList("STENCH",listofup)
        else {  if(IsPercepted(row-1,column))if(!IsRuleBySignalInList("STENCH",listofup)&& (row-1<size && row-1 >=0 && column>=0 && column<size)) { wampussafe = true } else if(IsRuleBySignalInList("STENCH",listofup)) wampussafe = false
        if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("STENCH",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { wampussafe = true} else if(IsRuleBySignalInList("STENCH",listofright)) wampussafe = false
        if(IsPercepted(row+1,column)) if(!IsRuleBySignalInList("STENCH",listofdown)&& (row+1<size && row+1 >=0 && column>=0 && column<size)) { wampussafe = true }  else if(IsRuleBySignalInList("STENCH",listofdown))  wampussafe = false
         ispossiblewampushere = IsRuleBySignalInList("STENCH",listofup)}
        if(!ispossiblegoldhere) ispossiblegoldhere = IsRuleBySignalInList("GLOW",listofup)
        else {  if(IsPercepted(row-1,column))if(!IsRuleBySignalInList("GLOW",listofup)&& (row-1<size && row-1 >=0 && column>=0 && column<size)) { goldsafe = true } else if(IsRuleBySignalInList("GLOW",listofup)) goldsafe = false
        if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("GLOW",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { goldsafe = true} else if(IsRuleBySignalInList("GLOW",listofright)) goldsafe = false
        if(IsPercepted(row+1,column))if(!IsRuleBySignalInList("GLOW",listofdown)&& (row+1<size && row+1 >=0 && column>=0 && column<size)) { goldsafe = true }  else if(IsRuleBySignalInList("GLOW",listofdown)) goldsafe = false
         ispossiblegoldhere = IsRuleBySignalInList("GLOW",listofup)}
    //بالا به راست
    if(!ispossiblepithere) ispossiblepithere = IsRuleBySignalInList("BREEZE",listofright)
    else {   if(IsPercepted(row,column-1))if(!IsRuleBySignalInList("BREEZE",listofleft)&& (row<size && row >=0 && column-1>=0 && column-1<size)) { pitsafe = true }
    if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("BREEZE",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { pitsafe = true}
    if(IsPercepted(row+1,column))if(!IsRuleBySignalInList("BREEZE",listofdown)&& (row+1<size && row+1 >=0 && column>=0 && column<size)) { pitsafe = true } 
     ispossiblepithere = IsRuleBySignalInList("BREEZE",listofright)
    }
    if(!ispossiblewampushere) ispossiblewampushere = IsRuleBySignalInList("STENCH",listofright)
    else {  if(IsPercepted(row,column-1))if(!IsRuleBySignalInList("STENCH",listofleft)&& (row<size && row >=0 && column-1>=0 && column-1<size)) { wampussafe = true } else if(IsRuleBySignalInList("STENCH",listofleft)) wampussafe = false
    if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("STENCH",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { wampussafe = true} else if(IsRuleBySignalInList("STENCH",listofright)) wampussafe = false
    if(IsPercepted(row+1,column))if(!IsRuleBySignalInList("STENCH",listofdown)&& (row+1<size && row+1 >=0 && column>=0 && column<size)) { wampussafe = true }  else if(IsRuleBySignalInList("STENCH",listofdown)) wampussafe = false
     ispossiblewampushere = IsRuleBySignalInList("STENCH",listofright)
    }
    if(!ispossiblegoldhere) ispossiblegoldhere = IsRuleBySignalInList("GLOW",listofright)
    else {  if(IsPercepted(row,column-1))if(!IsRuleBySignalInList("GLOW",listofleft)&& (row<size && row >=0 && column-1>=0 && column-1<size)) { goldsafe = true } else if(IsRuleBySignalInList("GLOW",listofleft)) goldsafe = false
    if(IsPercepted(row,column+1))if(!IsRuleBySignalInList("GLOW",listofright)&& (row<size && row >=0 && column+1>=0 && column+1<size)) { goldsafe = true} else if(IsRuleBySignalInList("GLOW",listofright)) goldsafe = false
    if(IsPercepted(row+1,column)) if(!IsRuleBySignalInList("GLOW",listofdown)&& (row+1<size && row+1 >=0 && column>=0 && column<size)) { goldsafe = true }  else if(IsRuleBySignalInList("GLOW",listofdown)) goldsafe = false
   ispossiblegoldhere = IsRuleBySignalInList("GLOW",listofright)
    }
    //در انتها اگر تناقضی وجود داشته باشد از آنها نتیجه گیری میکنیم
    if(pitsafe && wampussafe) knowledgebase[knowledgebase.length] = new Rule(row,column,"OK",true)
    if(wampussafe == false ) knowledgebase[knowledgebase.length] = new Rule(row , column,"WAMPUS",true)
    if(goldsafe == false) knowledgebase[knowledgebase.length] = new Rule(row , column,"GOLD",true)
        }

        //در اینجا میخواهیم اگر سه طرف یک سیگنال را بررسی کرده بودیم و چیزی نبود نتیجه بگیریم که در خانه ی چهارم است
        GetDangerBySignal("STENCH")
        GetDangerBySignal("BREEZE")
        GetDangerBySignal("GOLD")
      
  }
  function GetRulesIn(row,column)
  { //این تابع با گرفتن سطر و ستون در نالج بیس میگردد و قوانینی که مربوط به آن سطر و ستون میشوند را در قالب یک لیست برمیگرداند
      var list = []
      for(var i = 0;i<knowledgebase.length;i++)
      {
          if(knowledgebase[i].locationrow == row && knowledgebase[i].locationcolumn == column)
          {
                list[list.length] = knowledgebase[i]
               
          }
      }
      
      return list
  }
  function IsRuleBySignalInList(signal,list)
  { 
      //لیستی از قوانین و سیگنال خاصی را گرفته و مشخص میکند که آیا قانونی با آن سیگنال در لیست وجود دارد یا خیر
      for(var i = 0;i<list.length;i++)
      {
          if(list[i].signal == signal)
          return true
      }
      return false
  }
  function IsPercepted(row , column)
  {
      // مشخص میکند که آیا خانه ای با سطر و ستون خاص تا به حال پرسپت شده است یا خیر
      if(row<0||row>size||column>size||column<0)
      {
          return true
      }
      for(var i = 0;i<percepted.length;i++)
      {
          if(percepted[i].row == row && percepted[i].column == column)
          return true
      }
      return false;
  }
  function RemoveWampusFromKnowledgebase(){
      // ومپوس را از نالج بیس حذف میکند همراه با سیگنال های استنچ
    for(var i = 0 ;i<knowledgebase.length;i++)
    {
        if(knowledgebase[i].signal == "WAMPUS")
    {
    var rules = GetRulesIn(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn)
    if(!IsRuleBySignalInList("BREEZE",rules))
    knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn,"OK",true)
    knowledgebase.splice(i,1)
    }
        if(knowledgebase[i].signal == "STENCH")
        {
            var rules = GetRulesIn(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn)
            if(!IsRuleBySignalInList("BREEZE",rules))
            knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn,"OK",true)
            knowledgebase.splice(i,1)
        }
    }
    stenchlocations = []
  }

          //در اینجا میخواهیم اگر سه طرف یک سیگنال را بررسی کرده بودیم و چیزی نبود نتیجه بگیریم که در خانه ی چهارم است

  function GetDangerBySignal(signal)
  {
      var danger
      if(signal =="STENCH") danger = "WAMPUS" 
      if(signal == "BREEZE") danger = "PIT"
      if(signal == "GLOW") danger = "GOLD"
    for(var i = 0 ;i<knowledgebase.length;i++)
    {
       
        if(knowledgebase[i].signal == signal)
        {
            var up = false
            var right = false
            var left =false
            var down = false
            var scounter = 0
            for(var j = 0 ;j<knowledgebase.length;j++)
            {
               if(i!=j)
               {
                if(knowledgebase[j].locationrow+1 == knowledgebase[i].locationrow && knowledgebase[j].locationcolumn == knowledgebase[i].locationcolumn) {up = true}
                if(knowledgebase[j].locationrow-1 == knowledgebase[i].locationrow && knowledgebase[j].locationcolumn == knowledgebase[i].locationcolumn) {down = true}
                if(knowledgebase[j].locationrow == knowledgebase[i].locationrow && knowledgebase[j].locationcolumn-1 == knowledgebase[i].locationcolumn) {right = true}
                if(knowledgebase[j].locationrow == knowledgebase[i].locationrow && knowledgebase[j].locationcolumn+1 == knowledgebase[i].locationcolumn) {left = true}
               }

            }
            if(up)scounter++
            if(down)scounter++
            if(right)scounter++
            if(left)scounter++
            if(scounter == 3)
            {
                //اگر وسط ها باشد
                if(up&down&right) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn-1,danger,true)
                if(right&up&left)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn,danger,true)
                if(down&up&left)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1,danger,true)
                if(right&down&left)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn,danger,true)
            }
            if(scounter == 2 && (knowledgebase[i].locationcolumn == 0 || knowledgebase[i].locationrow == 0 || knowledgebase[i].locationcolumn == size || knowledgebase[i].locationrow == size))
            {
                //اگر روی اضلاع باشد
                if(knowledgebase[i].locationcolumn == 0)
                {
                   
                    //یعنی چپ وجود ندارد
                    if(right&up)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn,danger,true)
                    if(right&down) {knowledgebase.push(new Rule(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn,danger,true))}
                    if(up&down)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1,danger,true)
               
                }
                if(knowledgebase[i].locationcolumn == size)
                {
                    //یعنی راست وجود ندارد
                    if(left&up)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn,danger,true)
                    if(left&down)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn,danger,true)
                    if(up&down)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1,danger,true)
                }
                if(knowledgebase[i].locationrow == 0)
                {
                    //یعنی بالا وجود ندارد
                    if(right&left)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn,danger,true)
                    if(right&down)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn,danger,true)
                    if(left&down)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1,danger,true)
                }
                if(knowledgebase[i].locationrow == size)
                {
                    //یعنی پایین وجود ندارد
                    if(right&up)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn,danger,true)
                    if(right&left)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn,danger,true)
                    if(up&left)  knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1,danger,true)
                }


            }
            if(scounter == 1 && knowledgebase[i].locationrow == 0 && knowledgebase[i].locationrcolumn == 0)
            {
                //یعنی لال و چپ وجود ندارد
                if(right) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1,danger,true)
                if(down) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn,danger,true)
            }
            if(scounter == 1 && knowledgebase[i].locationrow == 0 && knowledgebase[i].locationrcolumn == size)
            { // یعنی راست و بالا وجود ندارد
                if(left) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn-1,danger,true)
                if(down) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow+1,knowledgebase[i].locationcolumn,danger,true)
            }
            if(scounter == 1 && knowledgebase[i].locationrow == size && knowledgebase[i].locationrcolumn == 0)
            {
                //یعنی چپ و پایین وجود ندارد
                if(right) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn+1,danger,true)
                if(up) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn,danger,true)
            }
            if(scounter == 1 && knowledgebase[i].locationrow == size && knowledgebase[i].locationrcolumn == size)
            {
                // یعنی راست و پایین وجود ندارد
                if(left) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow,knowledgebase[i].locationcolumn-1,danger,true)
                if(up) knowledgebase[knowledgebase.length] = new Rule(knowledgebase[i].locationrow-1,knowledgebase[i].locationcolumn,danger,true)
            }
            
        }
    }
  }
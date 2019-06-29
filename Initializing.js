function initializegamepad()
{
    pitlocations = []
    wampuslocation = -1
    goldlocation = -1
    size = -1

    //ابتدا مقادیر تکست باکس ها را دریافت میکنیم و داخل متغیر های گلوبال میریزیم

    
     size = Number(document.getElementById("sizeofgamepad").value)
     ///console.log(size)
     var pitlocationsarray = document.getElementById("pitlocations").value.split(',')
     wampuslocation = Number(document.getElementById("wampuslocation").value)
     goldlocation = Number(document.getElementById("goldlocation").value)
     playerlocation = size*size-(size-1)

    //مکان گودال ها را ذخیره میکنیم
    try{
        for(var i =0;i<pitlocationsarray.length;i++)
            {
       
                pitlocations[pitlocations.length]=Number(pitlocationsarray[i])
       
            }
        }
    catch{
            console.log("Enter Values Correctly")
            return;
            }
    //حال مکان همه چیز را داریم به جز مکان سیگنال های بریز و استنچ پس آن ها را میابیم
    for(var i = 0; i<pitlocations.length;i++)
    {
        //یک بولین تعریف میکنیم و اگر حالت های خاص اتفاق افتاد آن را ترو میکنیم در غیر این صورت حالت عمومی است و باید وارد ایف آخر شود
        var boolean = false;
        //اگر در سطر اول باشد
        if(pitlocations[i]>=1 && pitlocations[i] <= size)
        {
            boolean = true
            breezelocations[breezelocations.length] = pitlocations[i] + size
            if(pitlocations[i] == 1) breezelocations[breezelocations.length] = pitlocations[i] + 1
            else if(pitlocations[i] == size) breezelocations[breezelocations.length] = pitlocations[i] - 1
            else{
                breezelocations[breezelocations.length] = pitlocations[i] - 1
                breezelocations[breezelocations.length] = pitlocations[i] + 1
            }
            continue
        }
        //اگر در سطر آخر باشد
        if(pitlocations[i]>=size*(size-1)+1 && pitlocations[i] <= size*size)
        {
            boolean = true
            breezelocations[breezelocations.length] = pitlocations[i] - size
            if(pitlocations[i] == size*(size-1)+1) breezelocations[breezelocations.length] = pitlocations[i] + 1
            else if(pitlocations[i] == size*size) breezelocations[breezelocations.length] = pitlocations[i] - 1
            else{
                breezelocations[breezelocations.length] = pitlocations[i] - 1
                breezelocations[breezelocations.length] = pitlocations[i] + 1
            }
            continue
        }
        //اگر در ستون اول باشد 
        if(pitlocations[i]% size == 1)
        {
            boolean = true
            breezelocations[breezelocations.length] = pitlocations[i] + 1
            if(pitlocations[i] == size*(size-1)+1) breezelocations[breezelocations.length] = pitlocations[i] - size
            else if(pitlocations[i] == 1) breezelocations[breezelocations.length] = pitlocations[i] + size 
            else{
                breezelocations[breezelocations.length] = pitlocations[i] - size
                breezelocations[breezelocations.length] = pitlocations[i] + size
            }
            continue
        }
        //اگر در ستون آخر باشد
        if(pitlocations[i]% size == 0)
        {
            boolean = true
            breezelocations[breezelocations.length] = pitlocations[i] - 1
            if(pitlocations[i] == size*size) breezelocations[breezelocations.length] = pitlocations[i] - size
            else if(pitlocations[i] == size) breezelocations[breezelocations.length] = pitlocations[i] + size 
            else{
                breezelocations[breezelocations.length] = pitlocations[i] - size
                breezelocations[breezelocations.length] = pitlocations[i] + size
            }
            continue
        }
        if(!boolean)
        {
            breezelocations[breezelocations.length] = pitlocations[i] - 1
            breezelocations[breezelocations.length] = pitlocations[i] + 1
            breezelocations[breezelocations.length] = pitlocations[i] - size
            breezelocations[breezelocations.length] = pitlocations[i] + size
        }
    }
    //همینکار بالا را برای ومپوس و سیگنال های استنچ هم تکرار میکنیم

    //یک بولین تعریف میکنیم و اگر حالت های خاص اتفاق افتاد آن را ترو میکنیم در غیر این صورت حالت عمومی است و باید وارد ایف آخر شود
    var boolean = false;
    //اگر در سطر اول باشد
    if(wampuslocation>=1 && wampuslocation <= size)
    {
        boolean = true
        stenchlocations[stenchlocations.length] = wampuslocation + size
        if(wampuslocation == 1) stenchlocations[stenchlocations.length] = wampuslocation + 1
        else if(wampuslocation == size) stenchlocations[stenchlocations.length] = wampuslocation - 1
        else{
            stenchlocations[stenchlocations.length] = wampuslocation - 1
            stenchlocations[stenchlocations.length] = wampuslocation + 1
        }
        
    }
    //اگر در سطر آخر باشد
    if(wampuslocation>=size*(size-1)+1 && wampuslocation <= size*size && !boolean)
    {
        boolean = true
        stenchlocations[stenchlocations.length] = wampuslocation - size
        if(wampuslocation == size*(size-1)+1) stenchlocations[stenchlocations.length] = wampuslocation + 1
        else if(wampuslocation == size*size) stenchlocations[stenchlocations.length] = wampuslocation - 1
        else{
            stenchlocations[stenchlocations.length] =wampuslocation - 1
            stenchlocations[stenchlocations.length] = wampuslocation + 1
        }
        
    }
    //اگر در ستون اول باشد 
    if(wampuslocation% size == 1 && !boolean)
    {
        boolean = true
        stenchlocations[stenchlocations.length] = wampuslocation + 1
        if(wampuslocation == size*(size-1)+1) stenchlocations[stenchlocations.length] = wampuslocation - size
        else if(wampuslocation == 1) stenchlocations[stenchlocations.length] = wampuslocation + size 
        else{
            stenchlocations[stenchlocations.length] = wampuslocation - size
            stenchlocations[stenchlocations.length] = wampuslocation + size
        }
        
    }
    //اگر در ستون آخر باشد
    if(wampuslocation % size == 0 && !boolean)
    {
        boolean = true
        stenchlocations[stenchlocations.length] = wampuslocation - 1
        if(wampuslocation == size*size) stenchlocations[stenchlocations.length] = wampuslocation - size
        else if(wampuslocation == size) stenchlocations[stenchlocations.length] = wampuslocation + size 
        else{
            stenchlocations[stenchlocations.length] = wampuslocation - size
            stenchlocations[stenchlocations.length] = wampuslocation + size
        }
        
    }
    if(!boolean)
    {
        stenchlocations[stenchlocations.length] = wampuslocation - 1
        stenchlocations[stenchlocations.length] = wampuslocation + 1
        stenchlocations[stenchlocations.length] = wampuslocation - size
        stenchlocations[stenchlocations.length] = wampuslocation + size
    }
    
    //برای GLOW
    var r = (goldlocation-1) / size
    var c = (goldlocation-1)% size
    if(r-1 >= 0)
    {
        glowlocations[glowlocations.length] = goldlocation - size
    }
    if(r-1 < size)
    {
        glowlocations[glowlocations.length] = goldlocation + size
    }
    if(c-1 >= 0)
    {
        glowlocations[glowlocations.length] = goldlocation - 1
    }
    if(c-1 < size)
    {
        glowlocations[glowlocations.length] = goldlocation + 1
    }


    //حال متغیر های اصلی گلوبالمان پر شده است در اینجا اقدام به رسم جدول میکنیم
    DrawWampusGamePad();
    // console.log(breezelocations)
    // console.log(pitlocations)
    // console.log(wampuslocation)
    // console.log(goldlocation)
    //console.log(stenchlocations)
}


//این تابع بعد از مقدار دهی های متغیر های گلوبال فراخوانی میشود و زمین بازی را رسم میکند
function DrawWampusGamePad()
{
    
    var gametable = document.getElementById("GamePad")
    gametable.style = " background-color:white ;width:100%;height:"+(window.innerWidth/3).toString()+";"
    
    for(var i =1 ; i<=size;i++)
    {
        var tr = document.createElement("tr")
        tr.style = "height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/2).toString()+"px;float:left;box-sizing: border-box;"
        
        for(var j =1 ; j<=size;j++)
        {
            var position = (i-1)*(size)+j;
            var part = document.createElement("td")
            var icon = document.createElement("img")
            icon.style =  "height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
            
            if(playerlocation == position)
        {
            icon.setAttribute("src","Player.png")
            part.style = "border: red solid 1px; height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
            part.appendChild(icon);
         
        }
         
        else 
        if(goldlocation == position)
        {
            icon.setAttribute("src","Gold.png")
            part.style = "border: red solid 1px; height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
            part.appendChild(icon);
        }
        else if(wampuslocation == position )
        {
            icon.setAttribute("src","Monster.png")
            part.style = "border: red solid 1px; height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
            part.appendChild(icon);
        }
        else  
        if(existIn(pitlocations ,position))
        {
            
            icon.setAttribute("src","Pit.jpg")
            part.style = "border: red solid 1px; height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
            part.appendChild(icon);
        }  
        else if(existIn(stenchlocations ,position))
            {
                icon.setAttribute("src","Stench.jpg")
                part.style = "border: red solid 1px; height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
                part.appendChild(icon);
            }
        else if(existIn(breezelocations ,position))
        {
            icon.setAttribute("src","Breez.png")
            part.style = "border: red solid 1px; height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
            part.appendChild(icon);
        }
        else 
        {
            part.style = "border: red solid 1px; height:"+ (window.innerWidth/(2*size)).toString()+"px;"+"width :"+(window.innerWidth/(2*size)).toString()+"px;"
        }
            tr.appendChild(part)
           
        }
        gametable.appendChild(tr);
    }

    
}
function existIn(locations , position)
{
    //مشحص میکند کخ آیا یک پوزیشن خاص در لیست لوکیشن ها وجود دارد یا خیر
    for(var i = 0;i<locations.length;i++)
    {
        if(locations[i]==position) return true
    }
    return false;
}



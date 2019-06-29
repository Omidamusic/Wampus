var size
var pitlocations  = []
var wampuslocation
var wampuskilled = false
var goldlocation 
var glowlocations = []
var stenchlocations = []
var breezelocations = []
var playerlocation = 13
//متغیر های بالا درست است که به صورت گلوبال وجود دارند و ما مکان پیت ها و سیگنال ها را میدانیم اما در 
//نالج بیس ما وجود ندارند و ایجنت با رسیدن به یک خانه میتواند سیگنال را دریافت کند
var knowledgebase = []
//این آرایه شامل چیزیست که ایجنت ما میداند پس آرایه ای از رول هاست 
var gamefinished = false
var percepted = []
//لیستی از استیت هاست اما برای ما فقط سطر و ستونش معنا دارد
var availableactions
var prevstates=[];
var shouldpush = true
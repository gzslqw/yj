// 易经六爻占卜软件 - 卦象数据库

// 八卦定义
const baguaDict = {
    "111": { name: "乾", element: "天", nature: "刚健", symbol: "☰" },
    "000": { name: "坤", element: "地", nature: "柔顺", symbol: "☷" },
    "100": { name: "震", element: "雷", nature: "动荡", symbol: "☳" },
    "010": { name: "坎", element: "水", nature: "险陷", symbol: "☵" },
    "001": { name: "艮", element: "山", nature: "静止", symbol: "☶" },
    "110": { name: "巽", element: "风", nature: "渗透", symbol: "☴" },
    "101": { name: "离", element: "火", nature: "光明", symbol: "☲" },
    "011": { name: "兑", element: "泽", nature: "喜悦", symbol: "☱" }
};

// 完整64卦数据库
const guaDict = {
    // 乾宫八卦
    "乾乾": { 
        name: "乾为天", 
        hexagram: "䷀", 
        sequence: 1,
        description: "元亨利贞。刚健中正，象征创造与领导。",
        detail: "乾卦象征天，具有创始、亨通、和谐、贞正四种德性。表示刚健进取，自强不息。"
    },
    "乾坤": { 
        name: "天地否", 
        hexagram: "䷋", 
        sequence: 12,
        description: "否之匪人，不利君子贞。闭塞不通，需等待转机。",
        detail: "否卦上乾下坤，天地不交，万物不通。象征闭塞时期，君子当俭德避难。"
    },
    "乾震": { 
        name: "天雷无妄", 
        hexagram: "䷘", 
        sequence: 25,
        description: "无妄，元亨利贞。其匪正有眚，不利有攸往。不妄为，实事求是。",
        detail: "无妄卦上乾下震，天下雷行，不妄为。象征实事求是，避免妄动。"
    },
    "乾坎": { 
        name: "天水讼", 
        hexagram: "䷅", 
        sequence: 6,
        description: "有孚，窒惕，中吉，终凶。利见大人，不利涉大川。争议诉讼，保持诚信。",
        detail: "讼卦上乾下坎，天与水违行，争议诉讼。象征争议诉讼，保持诚信。"
    },
    "乾艮": { 
        name: "天山遁", 
        hexagram: "䷠", 
        sequence: 33,
        description: "亨，小利贞。退避隐遁，待时而行。",
        detail: "遁卦上乾下艮，天下有山，君子远避。象征退避隐遁，待时而行。"
    },
    "乾巽": { 
        name: "天风姤", 
        hexagram: "䷫", 
        sequence: 44,
        description: "女壮，勿用取女。相遇之意，需防意外变化。",
        detail: "姤卦上乾下巽，天下有风，阴阳相遇。象征意外相遇，谨慎应对。"
    },
    "乾离": { 
        name: "天火同人", 
        hexagram: "䷌", 
        sequence: 13,
        description: "同人于野，亨。利涉大川，利君子贞。同心同德，合作共赢。",
        detail: "同人卦上乾下离，天与火同，同心同德。象征团结合作，共创辉煌。"
    },
    "乾兑": { 
        name: "天泽履", 
        hexagram: "䷉", 
        sequence: 10,
        description: "履虎尾，不咥人，亨。谨慎行事，如履薄冰。",
        detail: "履卦上乾下兑，天上泽下，如履薄冰。象征谨慎行事，避免危险。"
    },
    
    // 坤宫八卦
    "坤坤": { 
        name: "坤为地", 
        hexagram: "䷁", 
        sequence: 2,
        description: "元亨，利牝马之贞。柔顺承载，包容万物。",
        detail: "坤卦象征地，具有包容、承载、柔顺之德。表示厚德载物，以柔克刚。"
    },
    "坤乾": { 
        name: "地天泰", 
        hexagram: "䷊", 
        sequence: 11,
        description: "小往大来，吉亨。天地交泰，万事通达。",
        detail: "泰卦上坤下乾，天地相交，万物通泰。象征通泰时期，小往大来，吉亨。"
    },
    "坤震": { 
        name: "地雷复", 
        hexagram: "䷗", 
        sequence: 24,
        description: "亨。出入无疾，朋来无咎。一阳来复，生机再现。",
        detail: "复卦上坤下震，地中有雷，一阳复生。象征生机再现，循环往复。"
    },
    "坤坎": { 
        name: "地水师", 
        hexagram: "䷆", 
        sequence: 7,
        description: "贞，丈人吉，无咎。统率众人，用兵征战。",
        detail: "师卦上坤下坎，地中有水，统率众人。象征军队征战，需要领导。"
    },
    "坤艮": { 
        name: "地山谦", 
        hexagram: "䷎", 
        sequence: 15,
        description: "亨，君子有终。谦虚谨慎，终获吉祥。",
        detail: "谦卦上坤下艮，地中有山，谦虚谨慎。象征谦虚美德，终获吉祥。"
    },
    "坤巽": { 
        name: "地风升", 
        hexagram: "䷭", 
        sequence: 46,
        description: "元亨，用见大人，勿恤。上升发展，逐步前进。",
        detail: "升卦上坤下巽，地中生木，逐步上升。象征上升发展，逐步前进。"
    },
    "坤离": { 
        name: "地火明夷", 
        hexagram: "䷣", 
        sequence: 36,
        description: "利艰贞。光明受伤，韬光养晦。",
        detail: "明夷卦上坤下离，明入地中，光明受伤。象征韬光养晦，等待时机。"
    },
    "坤兑": { 
        name: "地泽临", 
        hexagram: "䷒", 
        sequence: 19,
        description: "元亨利贞。至于八月有凶。临察监督，亲临指导。",
        detail: "临卦上坤下兑，地下有泽，临察监督。象征亲临指导，临察监督。"
    },
    
    // 震宫八卦
    "震震": { 
        name: "震为雷", 
        hexagram: "䷲", 
        sequence: 51,
        description: "亨。震惊百里，不丧匕鬯。震动警醒，处变不惊。",
        detail: "震卦象征雷，具有震动、惊醒之德。表示处变不惊，临危不乱。"
    },
    "震乾": { 
        name: "雷天大壮", 
        hexagram: "䷡", 
        sequence: 34,
        description: "利贞。大而强盛，但需守正。",
        detail: "大壮卦上震下乾，雷在天上，声势浩大。象征强盛壮大，但需守正。"
    },
    "震坤": { 
        name: "雷地豫", 
        hexagram: "䷏", 
        sequence: 16,
        description: "利建侯行师。欢愉安乐，利于建立功业。",
        detail: "豫卦上震下坤，雷出地奋，万物欢愉。象征安乐之时，利于建立功业。"
    },
    "震坎": { 
        name: "雷水解", 
        hexagram: "䷧", 
        sequence: 40,
        description: "利西南，无所往，其来复吉。解除困境，缓解压力。",
        detail: "解卦上震下坎，雷雨交加，困境得解。象征解除险难，舒缓压力。"
    },
    "震艮": { 
        name: "雷山小过", 
        hexagram: "䷽", 
        sequence: 62,
        description: "亨，利贞。可小事，不可大事。小有过越，谨慎行事。",
        detail: "小过卦上震下艮，雷在山上，小有过越。象征小有过越，谨慎行事。"
    },
    "震巽": { 
        name: "雷风恒", 
        hexagram: "䷟", 
        sequence: 32,
        description: "亨，无咎，利贞，利有攸往。恒久持续，坚守不变。",
        detail: "恒卦上震下巽，雷风相随，恒久持续。象征持久不变，坚守正道。"
    },
    "震离": { 
        name: "雷火丰", 
        hexagram: "䷶", 
        sequence: 55,
        description: "亨，王假之，勿忧，宜日中。丰盛盛大，持盈保泰。",
        detail: "丰卦上震下离，雷电皆至，丰盛盛大。象征丰盛之时，持盈保泰。"
    },
    "震兑": { 
        name: "雷泽归妹", 
        hexagram: "䷵", 
        sequence: 54,
        description: "征凶，无攸利。婚嫁之事，需守正道。",
        detail: "归妹卦上震下兑，雷泽相交，婚嫁之事。象征婚嫁之事，需要守正。"
    },
    
    // 坎宫八卦
    "坎坎": { 
        name: "坎为水", 
        hexagram: "䷜", 
        sequence: 29,
        description: "习坎，有孚维心，亨，行有尚。险中有险，但保持诚信可亨通。",
        detail: "坎卦象征水，具有险陷之德。表示险中有险，但保持诚信可亨通。"
    },
    "坎乾": { 
        name: "水天需", 
        hexagram: "䷄", 
        sequence: 5,
        description: "有孚，光亨，贞吉。利涉大川。需要耐心，诚信可获吉祥。",
        detail: "需卦上坎下乾，云上于天，等待时机。象征需要耐心，诚信可获吉祥。"
    },
    "坎坤": { 
        name: "水地比", 
        hexagram: "䷇", 
        sequence: 8,
        description: "吉。原筮元永贞，无咎。亲附辅助，团结和谐。",
        detail: "比卦上坎下坤，水在地上，亲附辅助。象征团结和谐，亲附辅助。"
    },
    "坎震": { 
        name: "水雷屯", 
        hexagram: "䷂", 
        sequence: 3,
        description: "元亨利贞，勿用有攸往，利建侯。创始艰难，宜建立基础。",
        detail: "屯卦上坎下震，云雷相交，万物始生。象征创业艰难，宜建立基础。"
    },
    "坎艮": { 
        name: "水山蹇", 
        hexagram: "䷦", 
        sequence: 39,
        description: "利西南，不利东北。利见大人，贞吉。艰难险阻，需待时机。",
        detail: "蹇卦上坎下艮，山上有水，艰难险阻。象征艰难险阻，需要智慧应对。"
    },
    "坎巽": { 
        name: "水风井", 
        hexagram: "䷯", 
        sequence: 48,
        description: "改邑不改井，无丧无得。往来井井。汔至亦未繘井，羸其瓶，凶。井养不穷，修身养性。",
        detail: "井卦上坎下巽，木上有水，井养不穷。象征修身养性，滋养万物。"
    },
    "坎离": { 
        name: "水火既济", 
        hexagram: "䷾", 
        sequence: 63,
        description: "亨小，利贞。初吉终乱。事情将成，需防变故。",
        detail: "既济卦上坎下离，水火相交，事已成功。但需谨慎守成，防初吉终乱。"
    },
    "坎兑": { 
        name: "水泽节", 
        hexagram: "䷻", 
        sequence: 60,
        description: "亨。苦节不可贞。节制约束，适可而止。",
        detail: "节卦上坎下兑，水上有泽，节制约束。象征节制约束，适可而止。"
    },
    
    // 艮宫八卦
    "艮艮": { 
        name: "艮为山", 
        hexagram: "䷳", 
        sequence: 52,
        description: "艮其背，不获其身，行其庭，不见其人，无咎。静止稳重，适可而止。",
        detail: "艮卦象征山，具有静止、稳重之德。表示适可而止，静止稳重。"
    },
    "艮乾": { 
        name: "山天大畜", 
        hexagram: "䷙", 
        sequence: 26,
        description: "利贞。不家食吉，利涉大川。大有积蓄，利远行发展。",
        detail: "大畜卦上艮下乾，山中有天，积蓄丰厚。象征大有积蓄，利于远行发展。"
    },
    "艮坤": { 
        name: "山地剥", 
        hexagram: "䷖", 
        sequence: 23,
        description: "不利有攸往。剥落衰败，需谨慎守成。",
        detail: "剥卦上艮下坤，山附于地，剥落衰败。象征阴盛阳衰，宜谨慎守成。"
    },
    "艮震": { 
        name: "山雷颐", 
        hexagram: "䷚", 
        sequence: 27,
        description: "贞吉。观颐，自求口实。养正修身，自食其力。",
        detail: "颐卦上艮下震，山下有雷，养正修身。象征自我修养，自食其力。"
    },
    "艮坎": { 
        name: "山水蒙", 
        hexagram: "䷃", 
        sequence: 4,
        description: "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。启蒙教育，启发智慧。",
        detail: "蒙卦上艮下坎，山下出泉，启蒙教育。象征启发智慧，启蒙教育。"
    },
    "艮巽": { 
        name: "山风蛊", 
        hexagram: "䷑", 
        sequence: 18,
        description: "元亨，利涉大川。先甲三日，后甲三日。整治弊乱，革故鼎新。",
        detail: "蛊卦上艮下巽，山下有风，整治弊乱。象征整治腐败，革故鼎新。"
    },
    "艮离": { 
        name: "山火贲", 
        hexagram: "䷕", 
        sequence: 22,
        description: "亨。小利有攸往。文饰美化，注重礼仪。",
        detail: "贲卦上艮下离，山下有火，文饰美化。象征装饰美化，注重礼仪。"
    },
    "艮兑": { 
        name: "山泽损", 
        hexagram: "䷨", 
        sequence: 41,
        description: "有孚，元吉，无咎，可贞。损下益上，损中有益。",
        detail: "损卦上艮下兑，山下有泽，损下益上。象征减损下方，增益上方。"
    },
    
    // 巽宫八卦
    "巽巽": { 
        name: "巽为风", 
        hexagram: "䷸", 
        sequence: 57,
        description: "小亨，利有攸往，利见大人。顺从进入，无孔不入。",
        detail: "巽卦象征风，具有顺从、渗透之德。表示无孔不入，顺利进入。"
    },
    "巽乾": { 
        name: "风天小畜", 
        hexagram: "䷈", 
        sequence: 9,
        description: "亨。密云不雨，自我西郊。小有积蓄，需等待时机。",
        detail: "小畜卦上巽下乾，风行天上，密云不雨。象征小有积蓄，需等待时机。"
    },
    "巽坤": { 
        name: "风地观", 
        hexagram: "䷓", 
        sequence: 20,
        description: "盥而不荐，有孚颙若。观察审时，明辨事理。",
        detail: "观卦上巽下坤，风行地上，观察审时。象征观察审时，明辨事理。"
    },
    "巽震": { 
        name: "风雷益", 
        hexagram: "䷩", 
        sequence: 42,
        description: "利有攸往，利涉大川。增益补充，利人利己。",
        detail: "益卦上巽下震，风雷相助，增益补充。象征增益补充，利人利己。"
    },
    "巽坎": { 
        name: "风水涣", 
        hexagram: "䷺", 
        sequence: 59,
        description: "亨。王假有庙，利涉大川。涣散分离，需重聚人心。",
        detail: "涣卦上巽下坎，风行水上，涣散分离。象征涣散分离，需要凝聚人心。"
    },
    "巽艮": { 
        name: "风山渐", 
        hexagram: "䷴", 
        sequence: 53,
        description: "女归吉，利贞。渐进发展，逐步前进。",
        detail: "渐卦上巽下艮，山上有木，渐进发展。象征循序渐进，逐步前进。"
    },
    "巽离": { 
        name: "风火家人", 
        hexagram: "䷤", 
        sequence: 37,
        description: "利女贞。家庭和谐，内部团结。",
        detail: "家人卦上巽下离，风自火出，家庭和谐。象征家庭和睦，内部团结。"
    },
    "巽兑": { 
        name: "风泽中孚", 
        hexagram: "䷼", 
        sequence: 61,
        description: "豚鱼吉，利涉大川，利贞。诚信中道，感化万物。",
        detail: "中孚卦上巽下兑，泽上有风，诚信中道。象征诚信感化万物。"
    },
    
    // 离宫八卦
    "离离": { 
        name: "离为火", 
        hexagram: "䷝", 
        sequence: 30,
        description: "利贞，亨。畜牝牛吉。依附光明，需保持柔顺。",
        detail: "离卦象征火，具有光明、依附之德。表示依附光明，保持柔顺。"
    },
    "离乾": { 
        name: "火天大有", 
        hexagram: "䷍", 
        sequence: 14,
        description: "元亨。大有收获，亨通顺利。",
        detail: "大有卦上离下乾，火在天上，光明普照。象征大有所获，亨通顺利。"
    },
    "离坤": { 
        name: "火地晋", 
        hexagram: "䷢", 
        sequence: 35,
        description: "康侯用锡马蕃庶，昼日三接。晋升上进，光明磊落。",
        detail: "晋卦上离下坤，明出地上，晋升上进。象征晋升发展，光明磊落。"
    },
    "离震": { 
        name: "火雷噬嗑", 
        hexagram: "䷔", 
        sequence: 21,
        description: "亨。利用狱。咬合沟通，化解矛盾。",
        detail: "噬嗑卦上离下震，火雷相交，咬合沟通。象征咬合沟通，化解矛盾。"
    },
    "离坎": { 
        name: "火水未济", 
        hexagram: "䷿", 
        sequence: 64,
        description: "亨。小狐汔济，濡其尾，无攸利。事未完成，需谨慎。",
        detail: "未济卦上离下坎，火水未交，事未成功。象征未完成状态，需谨慎行事。"
    },
    "离艮": { 
        name: "火山旅", 
        hexagram: "䷷", 
        sequence: 56,
        description: "小亨，旅贞吉。旅行在外，谨慎守正。",
        detail: "旅卦上离下艮，山上有火，旅行在外。象征行旅在外，谨慎守正。"
    },
    "离巽": { 
        name: "火风鼎", 
        hexagram: "䷱", 
        sequence: 50,
        description: "元吉，亨。鼎新变革，建立功业。",
        detail: "鼎卦上离下巽，木上有火，鼎新变革。象征鼎新革故，建立功业。"
    },
    "离兑": { 
        name: "火泽睽", 
        hexagram: "䷥", 
        sequence: 38,
        description: "小事吉。睽违背离，求同存异。",
        detail: "睽卦上离下兑，火泽相背，乖离违背。象征求同存异，化解矛盾。"
    },
    
    // 兑宫八卦
    "兑兑": { 
        name: "兑为泽", 
        hexagram: "䷹", 
        sequence: 58,
        description: "亨，利贞。欣悦喜悦，使人喜悦。",
        detail: "兑卦象征泽，具有喜悦、欣悦之德。表示使人喜悦，和谐相处。"
    },
    "兑乾": { 
        name: "泽天夬", 
        hexagram: "䷪", 
        sequence: 43,
        description: "扬于王庭，孚号有厉。告自邑，不利即戎，利有攸往。决断之时，需明辨是非。",
        detail: "夬卦上兑下乾，泽上于天，决断时刻。象征果断决策，明辨是非。"
    },
    "兑坤": { 
        name: "泽地萃", 
        hexagram: "䷬", 
        sequence: 45,
        description: "亨。王假有庙，利见大人。荟萃聚集，团结力量。",
        detail: "萃卦上兑下坤，泽上于地，荟萃聚集。象征荟萃聚集，团结力量。"
    },
    "兑震": { 
        name: "泽雷随", 
        hexagram: "䷐", 
        sequence: 17,
        description: "元亨利贞，无咎。随从顺应，与时俱进。",
        detail: "随卦上兑下震，泽中有雷，随从顺应。象征随从顺应，与时俱进。"
    },
    "兑坎": { 
        name: "泽水困", 
        hexagram: "䷮", 
        sequence: 47,
        description: "亨，贞，大人吉，无咎。困顿之时，坚守正道。",
        detail: "困卦上兑下坎，泽中无水，困顿之时。象征身处困境，坚守正道。"
    },
    "兑艮": { 
        name: "泽山咸", 
        hexagram: "䷞", 
        sequence: 31,
        description: "亨，利贞，取女吉。感应沟通，情感交流。",
        detail: "咸卦上兑下艮，山上有泽，感应沟通。象征相互感应，情感交流。"
    },
    "兑巽": { 
        name: "泽风大过", 
        hexagram: "䷛", 
        sequence: 28,
        description: "栋桡，利有攸往，亨。过度非常，需谨慎应对。",
        detail: "大过卦上兑下巽，泽灭木，过度非常。象征过度非常，需要谨慎应对。"
    },
    "兑离": { 
        name: "泽火革", 
        hexagram: "䷰", 
        sequence: 49,
        description: "己日乃孚，元亨利贞，悔亡。变革改革，除旧布新。",
        detail: "革卦上兑下离，泽中有火，变革改革。象征变革创新，除旧布新。"
    }
};
const definitions = {
  cp437: {
    name: 'USA, Standard Europe',
    languages: ['en'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp720: {
    name: 'Arabic',
    languages: ['ar'],
    offset: 128,
    chars:
      '\x80\x81éâ\x84à\x86çêëèïî\x8d\x8e\x8f\x90\u0651\u0652ô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡\u064b\u064c\u064d\u064e\u064f\u0650≈°∙·√ⁿ²■\u00a0',
  },
  cp737: {
    name: 'Greek',
    languages: ['el'],
    offset: 128,
    chars:
      'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ ',
  },
  cp775: {
    name: 'Baltic Rim',
    languages: ['et', 'lt'],
    offset: 128,
    chars:
      'ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ ',
  },
  cp850: {
    name: 'Multilingual',
    languages: ['en'],
    offset: 128,
    chars:
      'ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ ',
  },
  cp851: {
    name: 'Greek',
    languages: ['el'],
    offset: 128,
    chars:
      'ÇüéâäàΆçêëèïîΈÄΉΊ ΌôöΎûùΏÖÜά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ´­±υφχ§ψ¸°¨ωϋΰώ■ ',
  },
  cp852: {
    name: 'Latin 2',
    languages: ['hu', 'pl', 'cz'],
    offset: 128,
    chars:
      'ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ ',
  },
  cp853: {
    name: 'Turkish',
    languages: ['tr'],
    offset: 128,
    chars:
      'ÇüéâäàĉçêëèïîìÄĈÉċĊôöòûùİÖÜĝ£Ĝ×ĵáíóúñÑĞğĤĥ�½Ĵş«»░▒▓│┤ÁÂÀŞ╣║╗╝Żż┐└┴┬├─┼Ŝŝ╚╔╩╦╠═╬¤��ÊËÈıÍÎÏ┘┌█▄�Ì▀ÓßÔÒĠġµĦħÚÛÙŬŭ�´­�ℓŉ˘§÷¸°¨˙�³²■ ',
  },
  cp855: {
    name: 'Cyrillic',
    languages: ['bg'],
    offset: 128,
    chars:
      'ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ ',
  },
  cp857: {
    name: 'Turkish',
    languages: ['tr'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ ',
  },
  cp858: {
    name: 'Euro',
    languages: ['en'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ',
  },
  cp860: {
    name: 'Portuguese',
    languages: ['pt'],
    offset: 128,
    chars:
      'ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp861: {
    name: 'Icelandic',
    languages: ['is'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp862: {
    name: 'Hebrew',
    languages: ['he'],
    offset: 128,
    chars:
      'אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp863: {
    name: 'Canadian French',
    languages: ['fr'],
    offset: 128,
    chars:
      'ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp864: {
    name: 'Arabic',
    languages: ['ar'],
    offset: 0,
    chars:
      '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !"#$٪&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�',
  },
  cp865: {
    name: 'Nordic',
    languages: ['sv', 'dk'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp866: {
    name: 'Cyrillic 2',
    languages: ['ru'],
    offset: 128,
    chars:
      'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ ',
  },
  cp869: {
    name: 'Greek',
    languages: ['el'],
    offset: 128,
    chars:
      '������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ ',
  },
  cp874: {
    name: 'Thai',
    languages: ['th'],
    offset: 128,
    chars:
      '€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����',
  },
  cp1098: {
    name: 'Farsi',
    languages: ['fa'],
    offset: 128,
    chars:
      '\u0020\u0020\u060c\u061b\u061f\u064b\u0622\ufe82\uf8fa\u0627\ufe8e\uf8fb\u0621\u0623\ufe84\uf8f9\u0624\ufe8b\u0628\ufe91\ufb56\ufb58\u062a\ufe97\u062b\ufe9b\u062c\ufe9f\ufb7a\ufb7c\u00d7\u062d\ufea3\u062e\ufea7\u062f\u0630\u0631\u0632\ufb8a\u0633\ufeb3\u0634\ufeb7\u0635\ufebb\u00ab\u00bb\u2591\u2592\u2593\u2502\u2524\u0636\ufebf\ufec1\ufec3\u2563\u2551\u2557\u255d\u00a4\ufec5\u2510\u2514\u2534\u252c\u251c\u2500\u253c\ufec7\u0639\u255a\u2554\u2569\u2566\u2560\u2550\u256c\u0020\ufeca\ufecb\ufecc\u063a\ufece\ufecf\ufed0\u0641\ufed3\u2518\u250c\u2588\u2584\u0642\ufed7\u2580\ufb8e\ufedb\ufb92\ufb94\u0644\ufedf\u0645\ufee3\u0646\ufee7\u0648\u0647\ufeeb\ufeec\ufba4\ufbfc\u00ad\ufbfd\ufbfe\u0640\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669\u25a0\u00a0',
  },
  cp1118: {
    name: 'Lithuanian',
    languages: ['lt'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀αβΓπΣσµτΦΘΩδ∞φε⋂≡±≥≤„“÷≈°∙˙√ⁿ²■ ',
  },
  cp1119: {
    name: 'Lithuanian',
    languages: ['lt'],
    offset: 128,
    chars:
      'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁё≥≤„“÷≈°∙·√ⁿ²■ ',
  },
  cp1125: {
    name: 'Ukrainian',
    languages: ['uk'],
    offset: 128,
    chars:
      'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ ',
  },
  cp1162: {
    name: 'Thai',
    languages: ['th'],
    offset: 128,
    chars:
      '€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����',
  },
  cp2001: {
    name: 'Lithuanian KBL or 771',
    languages: ['lt'],
    offset: 128,
    chars:
      'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█ĄąČčрстуфхцчшщъыьэюяĘęĖėĮįŠšŲųŪūŽž■ ',
  },
  cp3001: {
    name: 'Estonian 1 or 1116',
    languages: ['et'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤šŠÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµžŽÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ',
  },
  cp3002: {
    name: 'Estonian 2',
    languages: ['et'],
    offset: 128,
    chars:
      ' ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ',
  },
  cp3011: {
    name: 'Latvian 1',
    languages: ['lv'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤Ā╢ņ╕╣║╗╝╜╛┐└┴┬├─┼ā╟╚╔╩╦╠═╬╧Š╤čČ╘╒ģĪī┘┌█▄ūŪ▀αßΓπΣσµτΦΘΩδ∞φε∩ĒēĢķĶļĻžŽ∙·√Ņš■ ',
  },
  cp3012: {
    name: 'Latvian 2 (modified 866)',
    languages: ['lv'],
    offset: 128,
    chars:
      'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤Ā╢ņ╕╣║╗╝Ō╛┐└┴┬├─┼ā╟╚╔╩╦╠═╬╧Š╤čČ╘╒ģĪī┘┌█▄ūŪ▀рстуфхцчшщъыьэюяĒēĢķĶļĻžŽō·√Ņš■ ',
  },
  cp3021: {
    name: 'Bulgarian (MIK)',
    languages: ['bg'],
    offset: 128,
    chars:
      'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp3041: {
    name: 'Maltese ISO 646',
    languages: ['mt'],
    offset: 0,
    chars:
      '\u0000\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZġżħ^_ċabcdefghijklmnopqrstuvwxyzĠŻĦĊ\u007F',
  },
  cp3840: {
    name: 'Russian (modified 866)',
    languages: ['ru'],
    offset: 128,
    chars:
      'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюя≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp3841: {
    name: 'Ghost',
    languages: ['ru'],
    offset: 128,
    chars:
      'ғәёіїјҝөўүӽӈҹҷє£ҒӘЁІЇЈҜӨЎҮӼӇҸҶЄЪ !"#$%&\'()*+,-./0123456789:;<=>?юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧ∅',
  },
  cp3843: {
    name: 'Polish (Mazovia)',
    languages: ['pl'],
    offset: 128,
    chars:
      'ÇüéâäàąçêëèïîćÄĄĘęłôöĆûùŚÖÜ¢Ł¥śƒŹŻóÓńŃźż¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp3844: {
    name: 'Czech (Kamenický)',
    languages: ['cz'],
    offset: 128,
    chars:
      'ČüéďäĎŤčěĚĹÍľĺÄÁÉžŽôöÓůÚýÖÜŠĽÝŘťáíóúňŇŮÔšřŕŔ¼§«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp3845: {
    name: 'Hungarian (CWI-2)',
    languages: ['hu'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîÍÄÁÉæÆőöÓűÚŰÖÜ¢£¥₧ƒáíóúñÑªŐ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp3846: {
    name: 'Turkish',
    languages: ['tr'],
    offset: 128,
    chars:
      'ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜ¢£¥ŞşáíóúñÑĞğ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ',
  },
  cp3847: {
    name: 'Brazil ABNT',
    languages: ['pt'],
    offset: 256,
    chars: '',
  },
  cp3848: {
    name: 'Brazil ABICOMP',
    languages: ['pt'],
    offset: 160,
    chars: ' ÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖŒÙÚÛÜŸ¨£¦§°¡àáâãäçèéêëìíîïñòóôõöœùúûüÿßªº¿±',
  },
  iso88591: {
    name: 'Latin 1',
    languages: ['en'],
    offset: 128,
    chars:
      ' ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
  },
  iso88592: {
    name: 'Latin 2',
    languages: ['hu', 'pl', 'cz'],
    offset: 128,
    chars:
      ' Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙',
  },
  iso88597: {
    name: 'Greek',
    languages: ['el'],
    offset: 128,
    chars:
      ' ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�',
  },
  iso885915: {
    name: 'Latin 9',
    languages: ['fr'],
    offset: 128,
    chars:
      ' ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
  },
  rk1048: {
    name: 'Kazakh',
    languages: ['kk'],
    offset: 128,
    chars:
      'ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя',
  },
  windows1250: {
    name: 'Latin 2',
    languages: ['hu', 'pl', 'cz'],
    offset: 128,
    chars:
      '€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙',
  },
  windows1251: {
    name: 'Cyrillic',
    languages: ['ru'],
    offset: 128,
    chars:
      'ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя',
  },
  windows1252: {
    name: 'Latin',
    languages: ['fr'],
    offset: 128,
    chars:
      '€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ',
  },
  windows1253: {
    name: 'Greek',
    languages: ['el'],
    offset: 128,
    chars:
      '€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�',
  },
  windows1254: {
    name: 'Turkish',
    languages: ['tr'],
    offset: 128,
    chars:
      '€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ',
  },
  windows1255: {
    name: 'Hebrew',
    languages: ['he'],
    offset: 128,
    chars:
      '€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�',
  },
  windows1256: {
    name: 'Arabic',
    languages: ['ar'],
    offset: 128,
    chars:
      '€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے',
  },
  windows1257: {
    name: 'Baltic Rim',
    languages: ['et', 'lt'],
    offset: 128,
    chars:
      '€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙',
  },
  windows1258: {
    name: 'Vietnamese',
    languages: ['vi'],
    offset: 128,
    chars:
      '€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ',
  },
};

const strings = {
  en: 'The quick brown fox jumps over the lazy dog.',
  jp: 'イロハニホヘト チリヌルヲ ワカヨタレソ ツネナラム',
  pt: 'O próximo vôo à noite sobre o Atlântico, põe freqüentemente o único médico.',
  fr: "Les naïfs ægithales hâtifs pondant à Noël où il gèle sont sûrs d'être déçus en voyant leurs drôles d'œufs abîmés.",
  sv: 'Flygande bäckasiner söka strax hwila på mjuka tuvor.',
  dk: 'Quizdeltagerne spiste jordbær med fløde',
  el: 'ξεσκεπάζω την ψυχοφθόρα βδελυγμία',
  tr: 'Pijamalı hasta, yağız şoföre çabucak güvendi.',
  ru: 'Съешь же ещё этих мягких французских булок да выпей чаю',
  hu: 'Árvíztűrő tükörfúrógép',
  pl: 'Pchnąć w tę łódź jeża lub ośm skrzyń fig',
  cz: 'Mohu jíst sklo, neublíží mi.',
  ar: 'أنا قادر على أكل الزجاج و هذا لا يؤلمني.',
  et: 'Ma võin klaasi süüa, see ei tee mulle midagi.',
  lt: 'Aš galiu valgyti stiklą ir jis manęs nežeidžia.',
  bg: 'Мога да ям стъкло, то не ми вреди.',
  is: 'Ég get etið gler án þess að meiða mig.',
  he: 'אני יכול לאכול זכוכית וזה לא מזיק לי.',
  fa: '.من می توانم بدونِ احساس درد شيشه بخورم',
  uk: 'Я можу їсти скло, і воно мені не зашкодить.',
  vi: 'Tôi có thể ăn thủy tinh mà không hại gì.',
  kk: 'қазақша',
  lv: 'Es varu ēst stiklu, tas man nekaitē.',
  mt: "Nista' niekol il-ħġieġ u ma jagħmilli xejn.",
  th: 'ฉันกินกระจกได้ แต่มันไม่ทำให้ฉันเจ็บ',
};

/**
 * A library for converting Unicode to obscure single byte codepage for use with thermal printers
 */
export default class CodepageEncoder {
  /**
   * Get list of supported codepages
   *
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  static getEncodings() {
    return Object.keys(definitions);
  }

  /**
   * Get test strings for the specified codepage
   *
   * @param  {string}   codepage  The codepage
   * @return {array}              Return an array with one or more objects
   *                              containing a property for the language of
   *                              the string and a property for the string itself
   *
   */
  static getTestStrings(codepage: keyof typeof definitions) {
    if (
      typeof definitions[codepage] !== 'undefined' &&
      typeof definitions[codepage].languages !== 'undefined'
    ) {
      return definitions[codepage].languages.map((i) => ({
        language: i,
        string: strings[i as keyof typeof strings],
      }));
    }

    return [];
  }

  /**
   * Determine if the specified codepage is supported
   *
   * @param  {string}   codepage  The codepage
   * @return {boolean}            Return a boolean, true if the encoding is supported,
   *                              otherwise false
   *
   */
  static supports(codepage: string) {
    if (!Object.keys(definitions).includes(codepage)) {
      return false;
    }

    if (
      typeof definitions[codepage as keyof typeof definitions].chars ===
      'undefined'
    ) {
      return false;
    }

    return true;
  }

  /**
   * Encode a string in the specified codepage
   *
   * @param  {string}   input     Text that needs encoded to the specified codepage
   * @param  {string}   codepage  The codepage
   * @return {Uint8Array}         Return an array of bytes with the encoded string
   *
   */
  static encode(input: string, codepage: string) {
    const output = new Uint8Array(input.length);
    const isCodePageDefined = Object.keys(definitions).includes(codepage);

    const chars = isCodePageDefined
      ? definitions[codepage as keyof typeof definitions].chars
      : '\u0000'.repeat(128);
    const offset = isCodePageDefined
      ? definitions[codepage as keyof typeof definitions].offset
      : 128;

    for (let c = 0; c < input.length; c++) {
      const codepoint = input.codePointAt(c) ?? -1;

      if (codepoint < 128) {
        output[c] = codepoint;
      } else {
        const position = chars.indexOf(input[c]);

        if (position !== -1) {
          output[c] = offset + position;
        } else if (
          codepoint < 256 &&
          (codepoint < offset || codepoint >= offset + chars.length)
        ) {
          output[c] = codepoint;
        } else {
          output[c] = 0x3f;
        }
      }
    }

    return output;
  }

  /**
   * Encode a string in the most optimal set of codepages.
   *
   * @param  {string}   input         Text that needs encoded
   * @param  {array}    candidates    An array of candidate codepages that are allowed to be used, ranked by importance
   * @return {Uint8Array}             Return an array of bytes with the encoded string
   *
   */
  static autoEncode(
    input: string,
    candidates: (keyof typeof definitions)[]
  ): { bytes: Uint8Array; codepage: keyof typeof definitions }[] {
    const fragments: {
      bytes: Uint8Array | number[];
      codepage: keyof typeof definitions;
    }[] = [];
    let fragment = -1;
    let current;

    for (let c = 0; c < input.length; c++) {
      const codepoint = input.codePointAt(c) ?? -1;

      let available;
      let char = 0;

      if (codepoint < 128) {
        available = current || candidates[0];
        char = codepoint;
      }

      if (!available && current) {
        const position = definitions[current].chars.indexOf(input[c]);

        if (position !== -1) {
          available = current;
          char = definitions[current].offset + position;
        }
      }

      if (!available) {
        for (let i = 0; i < candidates.length; i++) {
          const position = definitions[candidates[i]].chars.indexOf(input[c]);

          if (position !== -1) {
            available = candidates[i];
            char = definitions[candidates[i]].offset + position;
            break;
          }
        }
      }

      if (!available) {
        available = current || candidates[0];
        char = 0x3f;
      }

      if (current != available) {
        if (current) {
          fragments[fragment].bytes = new Uint8Array(fragments[fragment].bytes);
        }

        fragment++;
        fragments[fragment] = {
          codepage: available,
          bytes: [],
        };

        current = available;
      }

      (fragments[fragment].bytes as number[]).push(char);
    }

    if (current) {
      fragments[fragment].bytes = new Uint8Array(fragments[fragment].bytes);

      return fragments as {
        bytes: Uint8Array;
        codepage: keyof typeof definitions;
      }[];
    }

    return [];
  }
}

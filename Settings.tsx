import { useState } from "react";
import { Save } from "lucide-react";


export default function Settings(){


const [settings,setSettings] = useState({

storeName:"StorePilot",

ownerName:"Kidus",

phone:"0911000000",

email:"store@gmail.com",

currency:"ETB",

address:"Addis Ababa",

notifications:true

});




const saveSettings = ()=>{

alert("Settings Saved Successfully");

};





return (

<div className="space-y-6">



<div>

<h1 className="text-3xl font-bold text-gray-900">
Settings
</h1>


<p className="text-gray-500 mt-2">
Manage your store preferences.
</p>


</div>







<div className="
bg-white
rounded-2xl
border
shadow-sm
p-6
space-y-5
">





<div>

<label className="text-sm text-gray-600">
Store Name
</label>


<input

value={settings.storeName}

onChange={(e)=>

setSettings({

...settings,

storeName:e.target.value

})

}

className="
mt-2
w-full
border
rounded-lg
p-3
"

/>


</div>







<div>

<label className="text-sm text-gray-600">
Owner Name
</label>


<input

value={settings.ownerName}

onChange={(e)=>

setSettings({

...settings,

ownerName:e.target.value

})

}

className="
mt-2
w-full
border
rounded-lg
p-3
"

/>


</div>








<div>

<label className="text-sm text-gray-600">
Phone Number
</label>


<input

value={settings.phone}

onChange={(e)=>

setSettings({

...settings,

phone:e.target.value

})

}

className="
mt-2
w-full
border
rounded-lg
p-3
"

/>


</div>








<div>

<label className="text-sm text-gray-600">
Email
</label>


<input

value={settings.email}

onChange={(e)=>

setSettings({

...settings,

email:e.target.value

})

}

className="
mt-2
w-full
border
rounded-lg
p-3
"

/>


</div>








<div>

<label className="text-sm text-gray-600">
Currency
</label>


<select

value={settings.currency}

onChange={(e)=>

setSettings({

...settings,

currency:e.target.value

})

}

className="
mt-2
w-full
border
rounded-lg
p-3
"

>

<option>
ETB
</option>

<option>
USD
</option>

</select>


</div>








<div>

<label className="text-sm text-gray-600">
Address
</label>


<input

value={settings.address}

onChange={(e)=>

setSettings({

...settings,

address:e.target.value

})

}

className="
mt-2
w-full
border
rounded-lg
p-3
"

/>


</div>







<div className="flex items-center gap-3">


<input

type="checkbox"

checked={settings.notifications}

onChange={(e)=>

setSettings({

...settings,

notifications:e.target.checked

})

}

/>


<span>
Enable Notifications
</span>


</div>







<button

onClick={saveSettings}

className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
hover:bg-blue-700
"

>


<Save size={18}/>

Save Changes


</button>





</div>





</div>

);


}
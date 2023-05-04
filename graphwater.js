var select = document.getElementById("myregion"); //เลือกภาค
var selectdam = document.getElementById("mydam");
var alldam
var getitem
var alldamregion=[]
var allyear
var myLineChart
var labels

const main=async()=>{
    var datecurrent = new Date();
    var labelyear = []
    var labelallyear = []
    var datadam = []
    var obj = {}
    for(let j = 0;j < 1093;j++){
        if(j === 0){
            datecurrent.setDate(datecurrent.getDate() - j);
        }
        if(j > 0){
            datecurrent.setDate(datecurrent.getDate() - 1);
        }
        if(datecurrent.getMonth()+1 < 10 && datecurrent.getDate() < 10){ 
            labelyear.push(`${datecurrent.getFullYear()}-0${datecurrent.getMonth()+1}-0${datecurrent.getDate()}`);
        }
        if(datecurrent.getMonth()+1 < 10 && datecurrent.getDate()>=10){
            labelyear.push(`${datecurrent.getFullYear()}-0${datecurrent.getMonth()+1}-${datecurrent.getDate()}`);
        }
        if(datecurrent.getMonth()+1 >=10 && datecurrent.getDate()<10){
            labelyear.push(`${datecurrent.getFullYear()}-${datecurrent.getMonth()+1}-0${datecurrent.getDate()}`);
        }
        if(datecurrent.getMonth()+1 >= 10 && datecurrent.getDate() >= 10){
            labelyear.push(`${datecurrent.getFullYear()}-${datecurrent.getMonth()+1}-${datecurrent.getDate()}`);
        }
        if(j === 364 || j === 728|| j === 1092 || j === 1456 || j === 1819){
            labelallyear.push(labelyear)
            allyear = labelyear
            var labelyear = []
        }
     }
     labels = labelallyear
     for(let i = 0;i < 3;i++){
        console.log(labelallyear[i])
        for(let j = 0;j < labelallyear[i].length;j++){
        await fetch(`https://app.rid.go.th/reservoir/api/dam/public/${labelallyear[i][j]}` ,{
        method:'GET',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        }
        }).then((response)=>{
            response.json().then((data) => {
                console.log(labelallyear[i][j],data.data);
                obj = {date:labelallyear[i][j],data:data.data}
                datadam.push(obj)
            }).catch((err) => {
                console.log(err);
            }) 
        })

        }
        
     }
     alldam = datadam
     console.log("alldam",alldam)
    const response = await fetch('https://app.rid.go.th/reservoir/api/dam/public' ,{
    method:'GET',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    }
    })
    const responseStatus = await response.json()
    console.log(responseStatus)
    getitem = responseStatus
    select.options[0] = new Option('กรุณาเลือกภูมิภาค')
    selectdam.options[0] = new Option('กรุณาเลือกเขื่อน')
    for(var i = 0; i< responseStatus.data.length;i++){
      select.options[i+1] = new Option(responseStatus.data[i].region)
    }
    console.log(select.selectedIndex)
    if(select.selectedIndex === 1){
        console.log('gg')
    }
}
main()
const selectregion=()=>{
    console.log(select.options[select.selectedIndex].text)
    console.log(getitem)
    var toSearch = select.options[select.selectedIndex].text;
    console.log(selectdam.options.length)
    console.log(alldam)

    for(var i=0; i<getitem.data.length; i++) {
        for(key in getitem.data[i]) {
            if(getitem.data[i][key].indexOf(toSearch)!=-1) {
                console.log(getitem.data[i].dam.length)
                
                for(var j = 0; j< getitem.data[i].dam.length;j++){
                    if(selectdam.options.length > 1){
                        selectdam.remove(j+1)
                    }
                    selectdam.options[j+1] = new Option(getitem.data[i].dam[j].name)
                    console.log(getitem.data[i].dam[j].name)
                }
            }
        }
    }
    var damregion = [] 
    for(var i = 0;i < alldam.length;i++){
        for(var j = 0 ;j < alldam[i].data.length;j++){
            for(key in alldam[i].data[j]) {
                if(alldam[i].data[j][key].indexOf(toSearch)!=-1) {
                    damregion.push(alldam[i].data[j].dam)
                }
            }
        }
    }
    alldamregion = damregion;

}
const selectdams =()=>{
    console.log(alldamregion)
    var selectonedam = []
    var toSearch = selectdam.options[selectdam.selectedIndex].text;
    if(myLineChart != null){
        myLineChart.destroy()
    } 
    for(var i = 0;i < alldamregion.length;i++){
        for(var j = 0 ;j < alldamregion[i].length;j++){
            console.log(alldamregion[i][j])
            if(alldamregion[i][j].name === toSearch){
                selectonedam.push(alldamregion[i][j].percent_storage)
            }
        }
    }
    console.log("alldamregion",alldamregion)
    console.log("selectonedam",selectonedam.slice(0, 364))
    console.log("selectonedam",selectonedam.slice(365, 729))
    console.log("selectonedam",selectonedam.slice(730, 1093))
      const data = {
        labels: labels[0],
        datasets: [
          {
            label: '1 ปี',
            data: selectonedam.slice(0, 364),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
          {
            label: '2 ปี',
            data: selectonedam.slice(365, 729),
            borderColor: 'green',
            backgroundColor: 'green',
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
          {
            label: '3 ปี',
            data: selectonedam.slice(730, 1093),
            borderColor: 'blue',
            backgroundColor: 'blue',
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
        ]
      
      };

      const config = {
        type: "line",
        data: data,
        options: {
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
              },
            }
          }
        }
      }
     myLineChart = new Chart("myChart",config);

    
}

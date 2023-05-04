
d3.csv('water(2).csv')
    .then( (data)=>{
    //console.log(data)
    var xlable = data.map( (d) =>{
        return d.Date
        //console.log(d.Year)
    })

    var ylable = data.map( (d) =>{
        return d.cwc
        //console.log(d.Volumn)
    })
    var zlable = data.map( (d) =>{
      return d.twc
      //console.log(d.Volumn)
  })
  

    var chart = new Chart('lineChart', {
        type: "line",
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
        },
        data: {
          labels: xlable,
          tension: 0.5,
          datasets: [
            {
              data: ylable,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: false
            }
          ]
        },
      });
});
